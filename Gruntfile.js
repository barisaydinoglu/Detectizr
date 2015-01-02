module.exports = function(grunt) {
	"use strict";

	var gzip = require("gzip-js");

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		bowercopy: {
			options: {
				clean: true
			},
			tests: {
				files: {
					"test/libs/qunit.js": "qunit/qunit/qunit.js",
					"test/libs/qunit.css": "qunit/qunit/qunit.css",
					"test/libs/require.js": "requirejs/require.js",
					"test/libs/modernizr.js": "modernizr/modernizr.js"
				}
			}
		},
		compare_size: {
			files: ["dist/<%= pkg.name %>.js", "dist/<%= pkg.name %>.min.js"],
			options: {
				compress: {
					gz: function(contents) {
						return gzip.zip(contents, {}).length;
					}
				},
				cache: "dist/.sizecache.json"
			}
		},
		compile: {
			all: {
				dest: "dist/<%= pkg.name %>.js",
				src: "src/<%= pkg.name %>.js"
			}
		},
		coveralls: {
			options: {
				force: true
			},
			all: {
				// LCOV coverage file relevant to every target
				src: "_tests/reports/lcov/lcov.info"
			}
		},
		jscs: {
			src: "src/**/*.js",
			gruntfile: "Gruntfile.js",
			tasks: "tasks/*.js",
			options: {
				config: ".jscs.json"
			}
		},
		jshint: {
			source: {
				src: "src/<%= pkg.name %>.js",
				options: {
					jshintrc: "src/.jshintrc"
				}
			},
			grunt: {
				src: ["Gruntfile.js", "tasks/*"],
				options: {
					jshintrc: ".jshintrc"
				}
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
		uglify: {
			all: {
				src: "dist/<%= pkg.name %>.js",
				dest: "dist/<%= pkg.name %>.min.js",
				options: {
					banner: "/*! <%= pkg.title %> v<%= pkg.version %> | (c) 2012 <%= pkg.author.name %> | Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */",
					beautify: {
						ascii_only: true
					},
					compress: {
						hoist_funs: false,
						loops: false
					},
					sourceMap: true,
					sourceMapName: "dist/<%= pkg.name %>.min.map"
				}
			}
		},
		version: {
			files: ["package.json", "bower.json"]
		}
	});

	// Load grunt tasks from NPM packages
	require("load-grunt-tasks")(grunt);

	// Integrate Detectizr specific tasks
	grunt.loadTasks("tasks");

	grunt.registerTask("lint", ["jsonlint", "jshint", "jscs"]);
	grunt.registerTask("build", ["lint", "compile", "uglify", "dist", "compare_size"]);
	grunt.registerTask("test", ["lint", "qunit"]);
	grunt.registerTask("default", ["test", "compare_size"]);

	// Task aliases
	grunt.registerTask("bower", "bowercopy");
};
