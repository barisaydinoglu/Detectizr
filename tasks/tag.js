"use strict";

var exec = require("child_process").exec;

module.exports = function(grunt) {
	var rpreversion = /\d\.\d+\.\d+/;
	grunt.registerTask("tag", "Tag the specified version", function(version) {
		if (!rpreversion.test(version)) {
			grunt.fatal("Version must follow semver release format: " + version);
			return;
		}
		exec("git tag " + version, this.async());
	});
};
