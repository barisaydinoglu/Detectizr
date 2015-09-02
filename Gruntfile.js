module.exports = function(grunt) {
	"use strict";

	function readOptionalJSON(filepath) {
		var data = {};
		try {
			data = JSON.parse(stripJSONComments(fs.readFileSync(filepath, {
				encoding: "utf8"
			})));
		} catch (e) {
		}
		return data;
	}

	var fs = require("fs"),
		stripJSONComments = require("strip-json-comments"),
		gzip = require("gzip-js"),
		srcHintOptions = readOptionalJSON("src/.jshintrc");

	grunt.initConfig({
		dst: readOptionalJSON("dist/.destination.json"),
		pkg: grunt.file.readJSON("package.json"),
		"compare_size": {
			files: ["dist/detectizr.js", "dist/detectizr.min.js"],
			options: {
				compress: {
					gz: function(contents) {
						return gzip.zip(contents, {}).length;
					}
				},
				cache: "dist/.sizecache.json"
			}
		},
		build: {
			all: {
				dest: "dist/detectizr.js",
				src: "src/detectizr.js"
			}
		},
		npmcopy: {
			all: {
				options: {
					destPrefix: "external"
				},
				files: {
					"qunit/qunit.js": "qunitjs/qunit/qunit.js",
					"qunit/qunit.css": "qunitjs/qunit/qunit.css",
					"qunit/LICENSE.txt": "qunitjs/LICENSE.txt",

					"requirejs/require.js": "requirejs/require.js"
				}
			}
		},
		jscs: {
			src: "src/**/*.js",
			gruntfile: "Gruntfile.js",
			tasks: "build/tasks/*.js",
			tests: "test/tests.js",
			options: {
				config: ".jscs.json"
			}
		},
		jshint: {
			all: {
				src: [
					"src/**/*.js", "Gruntfile.js", "test/**/*.js", "build/**/*.js"
				],
				options: {
					jshintrc: true
				}
			},
			dist: {
				src: "dist/detectizr.js",
				options: srcHintOptions
			}
		},
		jsonlint: {
			pkg: {
				src: ["package.json"]
			},
			jscs: {
				src: [".jscs.json"]
			},
			bower: {
				src: ["bower.json"]
			}
		},
		qunit: {
			files: ["test/index.html"]
		},
		watch: {
			files: ["<%= jshint.all.src %>"],
			tasks: ["dev"]
		},
		uglify: {
			all: {
				files: {
					"dist/detectizr.min.js": ["dist/detectizr.js"]
				},
				options: {
					preserveComments: false,
					sourceMap: true,
					sourceMapName: "dist/detectizr.min.map",
					report: "min",
					beautify: {
						"ascii_only": true
					},
					banner: "/*! <%= pkg.title %> v<%= pkg.version %> | (c) 2012 <%= pkg.author.name %> | Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */",
					compress: {
						"hoist_funs": false,
						loops: false,
						unused: false
					}
				}
			}
		},
		"release-it": {
			options: {
				pkgFiles: ["package.json"],
				commitMessage: "Release %s",
				tagName: "%s",
				tagAnnotation: "Release %s",
				buildCommand: false
			}
		}
	});

	// Load grunt tasks from NPM packages
	require("load-grunt-tasks")(grunt);

	// Integrate Detectizr specific tasks
	grunt.loadTasks("build/tasks");

	grunt.registerTask("lint", ["jsonlint", "jshint", "jscs"]);

	grunt.registerTask("test", ["lint", "qunit"]);

	// Short list as a high frequency watch task
	grunt.registerTask("dev", ["build:*:*", "lint", "uglify", "dist:*"]);

	grunt.registerTask("default", ["dev", "test", "compare_size"]);
};
