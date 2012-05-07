/*!
 * Detectizr v1.0
 * http://barisaydinoglu.github.com/Detectizr/
 * https://github.com/barisaydinoglu/Detectizr
 * Written by Baris Aydinoglu (http://baris.aydinoglu.info) - Copyright © 2012
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Inspirations:
 *  - Browser selectors in CSS - http://37signals.com/svn/archives2/browser_selectors_in_css.php
 *  - Categorizr - http://www.brettjankord.com/2012/01/16/categorizr-a-modern-device-detection-script/
*/

/*
 * Detecizr, which requires Modernizr, adds some tests to Modernizr.
 * It detects device, device model, screen size, operating system,
 * and browser details.
 * Detection of these sets are optional and can be disabled.
 * 
 * Detectable device types are: tv (includes smart tv and game console), 
 * mobile, tablet, and desktop. Device models of tv, mobile and tablet
 * are being detected.
 *
 * Author         Baris Aydinoglu
 */
 ;(function (window, navigator) {
    var Modernizr = window.Modernizr,
        options = {
            // option for enabling HTML classes of all features (not only the true features) to be added
            addAllFeaturesAsClass: false,
            // option for enabling detection of device
            detectDevice: true,
            // option for enabling detection of device model
            detectDeviceModel: true,
            // option for enabling detection of screen size
            detectScreen: true,
            // option for enabling detection of operating system type and version
            detectOS: true,
            // option for enabling detection of browser type and version
            detectBrowser: true
        };
    function Detectizr(opt) {
        // Create Global 'extend' method, so Detectizr does not need jQuery.extend
        var extend = function (obj, extObj) {
                if (arguments.length > 2) {
                    for (var a = 1; a < arguments.length; a++) {
                        extend(obj, arguments[a]);
                    }
                } else {
                    for (var i in extObj) {
                        obj[i] = extObj[i];
                    }
                }
                return obj;
            };
        var that = this,
            device = Modernizr.Detectizr.device,
            deviceTypes = ['tv', 'tablet', 'mobile', 'desktop'],
            i;
        options = extend({}, options, opt || {});
        // simplified and localized indexOf method as one parameter fixed as useragent
        that.is = function (key) {
            return device.userAgent.indexOf(key) > -1;
        };
        // simplified and localized regex test method as one parameter fixed as useragent
        that.test = function (regex) {
            return regex.test(device.userAgent);
        };
        // simplified and localized regex exec method as one parameter fixed as useragent
        that.exec = function (regex) {
            return regex.exec(device.userAgent);
        };
        // convert string to camelcase
        that.toCamel = function (string) {
            if (string === null || string === undefined) {
                return '';
            }
            string = string + '';
            return string.replace(/((\s|\-|\.)+[a-z0-9])/g, function ($1) {
                return $1.toUpperCase().replace(/(\s|\-|\.)/g, '');
            });
        };
        // add version test to Modernizr
        that.addVersionTest = function (mainTest, version, maxLength) {
            if (version !== null && version !== undefined && version !== '') {
                version = that.toCamel(version);
                if (version !== '') {
                    if (maxLength !== undefined && maxLength > 0) {
                        version = version.substr(0, maxLength);
                    }
                    that.addConditionalTest(mainTest + version, true);
                }
            }
        };
        // add test to Modernizr based on a conditi
        that.addConditionalTest = function (feature, test) {
            if (feature === null || feature === undefined || feature === '') {
                return;
            }
            if (options.addAllFeaturesAsClass) {
                Modernizr.addTest(feature, test);
            } else {
                test = typeof test === 'function' ? test() : test;
                if (test) {
                    Modernizr.addTest(feature, true);
                }
            }
        };

        /** Device detection **/
        if (options.detectDevice) {
            if (that.test(/GoogleTV|SmartTV|Internet.TV|NetCast|NETTV|AppleTV|boxee|Kylo|Roku|DLNADOC|CE\-HTML/i)) {
                // Check if user agent is a smart tv
                device.type = deviceTypes[0];
                device.model = "smartTv";
            } else if (that.test(/Xbox|PLAYSTATION.3|Wii/i)) {
                // Check if user agent is a game console
                device.type = deviceTypes[0];
                device.model = "gameConsole";
            } else if (that.test(/iP(a|ro)d/i)) {
                // Check if user agent is a iPad
                device.type = deviceTypes[1];
                device.model = 'ipad';
            } else if ((that.test(/tablet/i) && !that.test(/RX-34/i)) || that.test(/FOLIO/i)) {
                // Check if user agent is a Tablet
                device.type = deviceTypes[1];
            } else if (that.test(/Linux/i) && that.test(/Android/i) && !that.test(/Fennec|mobi|HTC.Magic|HTCX06HT|Nexus.One|SC-02B|fone.945/i)) {
                // Check if user agent is an Android Tablet
                device.type = deviceTypes[1];
                device.model = 'android';
            } else if (that.test(/Kindle/i) || (that.test(/Mac.OS/i) && that.test(/Silk/i))) {
                // Check if user agent is a Kindle or Kindle Fire
                device.type = deviceTypes[1];
                device.model = 'kindle';
            } else if (that.test(/GT-P10|SC-01C|SHW-M180S|SGH-T849|SCH-I800|SHW-M180L|SPH-P100|SGH-I987|zt180|HTC(.Flyer|\_Flyer)|Sprint.ATP51|ViewPad7|pandigital(sprnova|nova)|Ideos.S7|Dell.Streak.7|Advent.Vega|A101IT|A70BHT|MID7015|Next2|nook/i) || (that.test(/MB511/i) && that.test(/RUTEM/i))) {
                // Check if user agent is a pre Android 3.0 Tablet
                device.type = deviceTypes[1];
                device.model = 'android';
            } else {
                // Check if user agent is one of common mobile types
                device.model = that.exec(/iphone|ipod|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec|j2me/i);
                if (device.model !== null) {
                    device.type = deviceTypes[2];
                    device.model = device.model + "";
                } else {
                    device.model = "";
                    if (that.test(/BOLT|Fennec|Iris|Maemo|Minimo|Mobi|mowser|NetFront|Novarra|Prism|RX-34|Skyfire|Tear|XV6875|XV6975|Google.Wireless.Transcoder/i)) {
                        // Check if user agent is unique Mobile User Agent
                        device.type = deviceTypes[2];
                    } else if (that.test(/Opera/i) && that.test(/Windows.NT.5/i) && that.test(/HTC|Xda|Mini|Vario|SAMSUNG\-GT\-i8000|SAMSUNG\-SGH\-i9/i)) {
                        // Check if user agent is an odd Opera User Agent - http://goo.gl/nK90K
                        device.type = deviceTypes[2];
                    } else if ((that.test(/Windows.(NT|XP|ME|9)/i) && !that.test(/Phone/i)) || that.test(/Win(9|.9|NT)/i)) {
                        // Check if user agent is Windows Desktop
                        device.type = deviceTypes[3];
                    } else if (that.test(/Macintosh|PowerPC/i) && !that.test(/Silk/i)) {
                        // Check if agent is Mac Desktop
                        device.type = deviceTypes[3];
                    } else if (that.test(/Linux/i) && that.test(/X11/i)) {
                        // Check if user agent is a Linux Desktop
                        device.type = deviceTypes[3];
                    } else if (that.test(/Solaris|SunOS|BSD/i)) {
                        // Check if user agent is a Solaris, SunOS, BSD Desktop
                        device.type = deviceTypes[3];
                    } else if (that.test(/Bot|Crawler|Spider|Yahoo|ia_archiver|Covario-IDS|findlinks|DataparkSearch|larbin|Mediapartners-Google|NG-Search|Snappy|Teoma|Jeeves|TinEye/i) && !that.test(/Mobile/i)) {
                        // Check if user agent is a Desktop BOT/Crawler/Spider
                        device.type = deviceTypes[3];
                        device.model = 'crawler';
                    } else {
                        // Otherwise assume it is a Mobile Device
                        device.type = deviceTypes[2];
                    }
                }
            }
            i = deviceTypes.length;
            while (i--) {
                that.addConditionalTest(deviceTypes[i], (device.type === deviceTypes[i]));
            }
            if (options.detectDeviceModel) {
                that.addConditionalTest(that.toCamel(device.model), true);
            }
        }

        /** Screen detection **/
        if (options.detectScreen) {
            that.addConditionalTest('smallScreen', Modernizr.mq('only screen and (max-width: 480px)'));
            that.addConditionalTest('verySmallScreen', Modernizr.mq('only screen and (max-width: 320px)'));
            that.addConditionalTest('veryVerySmallScreen', Modernizr.mq('only screen and (max-width: 240px)'));
        }

        /** OS detection **/
        if (options.detectOS) {
            if (device.model !== '') {
                if (device.model === 'ipad' || device.model === 'iphone' || device.model === 'ipod') {
                    device.osVersion = (that.test(/os\s(\d+)_/) ? RegExp.$1 : '');
                    device.os = 'ios';
                } else if (device.model === 'android') {
                    device.osVersion = (that.test(/os\s(\d+)_/) ? RegExp.$1 : '').substr(0, 2);
                    device.os = 'android';
                }
            }
            if (device.os === '') {
                if (that.is('win') || that.is('16bit')) {
                    device.os = 'windows';
                    if (that.is('windows nt 6.1')) {
                        device.osVersion = '7';
                    } else if (that.is('windows nt 6.0')) {
                        device.osVersion = 'vista';
                    } else if (that.is('windows nt 5.2') || that.is('windows nt 5.1') || that.is('windows xp')) {
                        device.osVersion = 'xp';
                    } else if (that.is('windows nt 5.0') || that.is('windows 2000')) {
                        device.osVersion = '2k';
                    } else if (that.is('winnt') || that.is('windows nt')) {
                        device.osVersion = 'nt';
                    } else if (that.is('win98') || that.is('windows 98')) {
                        device.osVersion = '98';
                    } else if (that.is('win95') || that.is('windows 95')) {
                        device.osVersion = '95';
                    }
                } else if (that.is('mac') || that.is('darwin')) {
                    device.os = 'mac';
                    if (that.is('68k') || that.is('68000')) {
                        device.osVersion = '68k';
                    } else if (that.is('ppc') || that.is('powerpc')) {
                        device.osVersion = 'ppc';
                    } else if (that.is('os x')) {
                        device.osVersion = 'os x';
                    }
                } else if (that.is('webtv')) {
                    device.os = 'webtv';
                } else if (that.is('x11') || that.is('inux')) {
                    device.os = 'linux';
                } else if (that.is('sunos')) {
                    device.os = 'sun';
                } else if (that.is('irix')) {
                    device.os = 'irix';
                } else if (that.is('freebsd')) {
                    device.os = 'freebsd';
                } else if (that.is('bsd')) {
                    device.os = 'bsd';
                }
            }
            if (device.os !== '') {
                that.addConditionalTest(device.os, true);
                that.addVersionTest(device.os, device.osVersion);
            }
        }

        /** Browser detection **/
        if (options.detectBrowser) {
            if (!that.test(/opera|webtv/i) && that.test(/msie\s(\d)/)) {
                device.browser = 'ie';
                device.browserVersion = (that.test(/trident\/4\.0/) ? '8' : RegExp.$1);
            } else if (that.is('firefox')) {
                device.browserEngine = 'gecko';
                device.browser = 'firefox';
                device.browserVersion = (that.test(/firefox\/(\d+(\.?\d+)*)/) ? RegExp.$1 : '').substr(0, 2);
            } else if (that.is('gecko/')) {
                device.browserEngine = 'gecko';
            } else if (that.is('opera')) {
                device.browser = 'opera';
                device.browserVersion = (that.test(/version\/(\d+)/) ? RegExp.$1 : (that.test(/opera(\s|\/)(\d+)/) ? RegExp.$2 : ''));
            } else if (that.is('konqueror')) {
                device.browser = 'konqueror';
            } else if (that.is('chrome')) {
                device.browserEngine = 'webkit';
                device.browser = 'chrome';
                device.browserVersion = (that.test(/chrome\/(\d+)/) ? RegExp.$1 : '');
            } else if (that.is('iron')) {
                device.browserEngine = 'webkit';
                device.browser = 'iron';
            } else if (that.is('applewebkit/')) {
                device.browser = 'safari';
                device.browserEngine = 'webkit';
                device.browserVersion = (that.test(/version\/(\d+)/) ? RegExp.$1 : '');
            } else if (that.is('mozilla/')) {
                device.browserEngine = 'gecko';
            }
            if (device.browser !== '') {
                that.addConditionalTest(device.browser, true);
                if (device.browserVersion !== '') {
                    that.addVersionTest(device.browser, device.browserVersion);
                }
            }
            that.addConditionalTest(device.browserEngine, true);
        }
    }
    function init() {
        if (Modernizr !== undefined) {
            Modernizr.Detectizr = Modernizr.Detectizr || {};
            Modernizr.Detectizr.device = {
                type: '',
                model: '',
                browser: '',
                browserEngine: '',
                browserVersion: '',
                os: '',
                osVersion: '',
                userAgent: (navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
            };
            Modernizr.Detectizr.detect = function (settings) {
                Detectizr(settings);
            };
        }
    }
    init();
}(this, navigator));

/** Sample usages **/
// Modernizr.Detectizr.detect();
// Modernizr.Detectizr.detect({detectScreen:false});