module.exports = function (grunt) {
    "use strict";

    function readOptionalJSON(filepath) {
        var data = {};
        try {
            data = grunt.file.readJSON(filepath);
        } catch (e) {}
        return data;
    }

    var gzip = require( "gzip-js" ),
        srcHintOptions = readOptionalJSON("src/.jshintrc");

    // The concatenated file won"t pass onevar
    // But our modules can
    delete srcHintOptions.onevar;

    function createBanner() {
        return "/*! <%= pkg.title %> - v<%= pkg.version %> - " +
            "<%= grunt.template.today('isoDate') %>\n" +
            "<%= pkg.homepage ? '* ' + pkg.homepage + '\\n' : '' %>" +
            "* Copyright <%= grunt.template.today('yyyy') %> <%= pkg.author.name %>;" +
            " Licensed <%= _.pluck(pkg.licenses, 'type').join(', ') %> */\n";
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        dst: readOptionalJSON("dist/.destination.json"),
        compare_size: {
            files: [ "dist/<%= pkg.name %>.js", "dist/<%= pkg.name %>.min.js" ],
            options: {
                compress: {
                    gz: function( contents ) {
                        return gzip.zip( contents, {} ).length;
                    }
                },
                cache: "build/.sizecache.json"
            }
        },
        jsonlint: {
            pkg: {
                src: [ "package.json" ]
            },
            bower: {
                src: [ "bower.json" ]
            }
        },
        jshint: {
            all: {
                src: [
                    "src/**/*.js", "Gruntfile.js"
                ],
                options: {
                    jshintrc: true
                }
            },
            dist: {
                src: "dist/<%= pkg.name %>.js",
                options: srcHintOptions
            }
        },
        watch: {
            files: [ "<%= jshint.all.src %>" ],
            tasks: "dev"
        },
        uglify: {
            all: {
                files: {
                    "dist/<%= pkg.name %>.min.js": ["dist/<%= pkg.name %>.js"]
                },
                options: {
                    preserveComments: false,
                    sourceMap: "dist/<%= pkg.name %>.min.map",
                    sourceMappingURL: "<%= pkg.name %>.min.map",
                    report: "min",
                    beautify: {
                        ascii_only: true
                    },
                    banner: createBanner(),
                    compress: {
                        hoist_funs: false,
                        loops: false,
                        unused: false
                    }
                }
            }
        }
    });

    // Load grunt tasks from NPM packages
    require("load-grunt-tasks")(grunt);

    // Short list as a high frequency watch task
    grunt.registerTask("dev", ["jshint"]);

    // Default grunt
    grunt.registerTask("default", [ "jsonlint", "dev", "uglify", "compare_size"]);
};
