module.exports = function(grunt) {

	"use strict";

	var requirejs = require("requirejs"),
		config = {
			baseUrl: "src",
			name: "detectizr",
			out: "dist/detectizr.js",
			// We have multiple minify steps
			optimize: "none",
			// Include dependencies loaded with require
			findNestedDependencies: true,
			// Avoid inserting define() placeholder
			skipModuleInsertion: true,
			// Avoid breaking semicolons inserted by r.js
			skipSemiColonInsertion: true,
			rawText: {}
		};

	grunt.registerMultiTask("build", "Compile detectizr.js to the dist directory, embed date/version", function() {
		var done = this.async(),
			name = this.data.dest,
			version = grunt.config("pkg.version");

		// append commit id to version
		if (process.env.COMMIT) {
			version += " " + process.env.COMMIT;
		}

		/**
		 * Handle Final output from the optimizer
		 * @param {String} compiled
		 */
		config.out = function(compiled) {
			compiled = compiled
				// Embed Version
				.replace(/@VERSION/g, version)
				// Embed Date
				// yyyy-mm-ddThh:mmZ
				.replace(/@DATE/g, (new Date()).toISOString().replace(/:\d+\.\d+Z$/, "Z"));

			// Write concatenated source to file
			grunt.file.write(name, compiled);
		};

		// Trace dependencies and concatenate files
		requirejs.optimize(config, function(response) {
			grunt.verbose.writeln(response);
			grunt.log.ok("File '" + name + "' created.");
			done();
		}, function(err) {
			done(err);
		});
	});
};
