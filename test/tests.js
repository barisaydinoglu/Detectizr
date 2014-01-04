var userAgentsToTest = [
	{
		ua: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36',
		b: 'chrome',
		bv: '31',
		os: 'mac',
		osv: 'os x'
	},
	{
		ua: 'Mozilla/5.0 (Linux; U; Android 4.0.3; de-de; Build/20120717) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30',
		b: 'safari',
		bv: '4',
		os: 'android',
		osv: '4'
	}
];

function changeUserAgent(newUserAgent) {
	window.navigator = {
		userAgent: newUserAgent
	}
}

function isUserAgentTestOk(userAgentToTest) {
	if (userAgentToTest.os == Modernizr.Detectizr.device.os && Modernizr.Detectizr.device.osVersion == userAgentToTest.osv && Modernizr.Detectizr.device.browser == userAgentToTest.b && Modernizr.Detectizr.device.browserVersion == userAgentToTest.bv) {
		return true;
	}
	return false;
}

test('is Detectizr ready', function() {
	Modernizr.Detectizr.detect();
	notEqual(Modernizr.Detectizr.device, undefined);
});

test('useragent tests', function() {
	for (var i = userAgentsToTest.length - 1; i >= 0; i--) {
		changeUserAgent(userAgentsToTest[i].ua);
        Modernizr.Detectizr.device = {
            type: '',
            model: '',
            orientation: '',
            browser: '',
            browserEngine: '',
            browserPlugins: [],
            browserVersion: '',
            os: '',
            osVersion: '',
            osVersionFull: '',
            userAgent: (navigator.userAgent || navigator.vendor || window.opera).toLowerCase()
        };
		Modernizr.Detectizr.detect();
		ok(isUserAgentTestOk(userAgentsToTest[i]), userAgentsToTest[i].ua);
	}
});
