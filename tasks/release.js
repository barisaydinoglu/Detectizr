"use strict";

var exec = require( "child_process" ).exec;

module.exports = function( grunt ) {
	var rpreversion = /\d\.\d+\.\d+/;

	grunt.registerTask( "release",
		"Release a version of detectizr", function( version ) {

		if ( !rpreversion.test( version ) ) {
			grunt.fatal( "Version must follow semver release format: " + version );
			return;
		}

		var done = this.async();
		exec( "git diff HEAD --name-only", function( err ) {
			if ( err ) {
				grunt.fatal( "The working directory should be clean when releasing. Commit or stash changes." + err );
				return;
			}
			// Build to dist directories along with a map and tag the release
			grunt.task.run([
				// Commit new version
				"version:" + version,
				// Tag new version
				"tag:" + version
			]);
			done();
		});
	});
};
