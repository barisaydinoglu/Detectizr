var userAgentsToTest = [{
	ua: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36",
	b: "chrome",
	bv: "31",
	os: "mac os",
	osv: "10",
	dt: "desktop",
	dm: "mac"
}, {
	ua: "Mozilla/5.0 (Linux; U; Android 4.0.3; de-de; Build/20120717) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Safari/534.30",
	b: "safari",
	bv: "4",
	os: "android",
	osv: "4",
	dt: "tablet",
	dm: "android"
}, {
	ua: "Mozilla/5.0 (iPhone; CPU iPhone OS 7_0_4 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) CriOS/31.0.1650.18 Mobile/11B554a Safari/8536.25 (3AE36537-DD6D-42A2-ACA6-7F76E297E70F)",
	b: "chrome",
	bv: "31",
	os: "ios",
	osv: "7",
	dt: "mobile",
	dm: "iphone"
}, {
	ua: "Mozilla/5.0 (SMART-TV; X11; Linux i686) AppleWebKit/534.7 (KHTML, like Gecko) Version/5.0 Safari/534.7",
	b: "safari",
	bv: "5",
	os: "linux",
	dt: "tv",
	dm: "smartTv"
}, {
	ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.10240",
	b: "edge",
	bv: "12",
	os: "windows",
	osv: "10",
	dt: "desktop",
	dm: ""
}];

function assertEqual(val1, val2, name) {
	if (val2 !== undefined) {
		equal(val1, val2, "expected " + name + " is '" + val2 + "'");
	}
}

test("is Detectizr ready", function() {
	notEqual(Detectizr.device, undefined);
});

var useragent2test, index4test = userAgentsToTest.length - 1;
module("useragent", {
	setup: function() {
		// prepare something for all following tests
		useragent2test = userAgentsToTest[index4test];
		Detectizr.browser = {
			userAgent: useragent2test.ua.toLowerCase()
		};
		Detectizr.detect();
	},
	teardown: function() {
		// clean up after each test
		index4test--;
	}
});
for (var i = userAgentsToTest.length - 1; i >= 0; i--) {
	test(userAgentsToTest[i].ua, function() {
		assertEqual(Detectizr.device.type, useragent2test.dt, "device type");
		assertEqual(Detectizr.device.model, useragent2test.dm, "device model");
		assertEqual(Detectizr.os.name, useragent2test.os, "operating system name");
		assertEqual(Detectizr.os.major, useragent2test.osv, "operating system version");
		assertEqual(Detectizr.browser.name, useragent2test.b, "browser name");
		assertEqual(Detectizr.browser.major, useragent2test.bv, "browser version");
	});
}
