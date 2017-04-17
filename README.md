# Detectizr
[![Build Status](https://secure.travis-ci.org/barisaydinoglu/Detectizr.png?branch=master)](https://travis-ci.org/barisaydinoglu/Detectizr)
[![Stories in Ready](https://badge.waffle.io/barisaydinoglu/detectizr.png?label=ready)](https://waffle.io/barisaydinoglu/detectizr)
[![devDependency Status](https://david-dm.org/barisaydinoglu/detectizr/dev-status.png?theme=shields.io)](https://david-dm.org/barisaydinoglu/detectizr#info=devDependencies)


Detectizr is a Modernizr extension to detect
* device
* device model
* device orientation
* screen size
* operating system
* operating system version
* operating system version full
* browser
* browser version
* browser engine
* browser plugins

Detection of these sets are optional and can be disabled.

Detectable device types are: tv (includes smart tv and game console), mobile, tablet, and desktop.
Device models of tv, mobile and tablet are being detected.

Code quality of Detectizr is validated via [JSLint](http://www.jslint.com "JSLint") & [JSHint](http://www.jshint.com "JSHint").

## Sample Usage

This is a library that uses your trusty little Modernizr to give you the possibility of specifying required features for a certain stylesheet.
Using it is a simple matter, illustrated in the following excerpt:

```html
<html>
  <head>
    <script src="modernizr.js"></script>
    <script src="detectizr.js"></script>
  </head>
  <body>
    <script>
      Detectizr.detect({detectScreen:false});
    </script>
  </body>
</html>
```
Just remember to include Modernizr before Detectizr, and you're good to go!

Licensed under MIT license.

## Note for Modernizr 3.x

You will need to have a build of Modernizr with the addTest (Modernizr.addTest()) option.
If done from the website, you can find it 

## Other interesting projects

* [Modernizr](https://github.com/Modernizr/Modernizr "Modernizr") is required for Detectizer. Remember to put Modernizr before Detectizr.
* [Categorizr](https://github.com/bjankord/Categorizr "Categorizr") is a server side device and OS detection script wirtten in PHP. Detectizr inspired by its device detection.
* [CSS Browser Selector] (http://rafael.adm.br/css_browser_selector/ "CSS Browser Selector") is a client side browser detection script. Detectizr inspired by its browser detection.
