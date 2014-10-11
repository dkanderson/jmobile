'use strict';

/*global module:false*/
module.exports = function (grunt) {

    // Load all tasks
    require('load-grunt-tasks')(grunt);

    // Show elapsed time
    require('time-grunt')(grunt);

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),

        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
            '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
            '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
            '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
            ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

        requirejs: {
            compile: {
                options: {
                    baseUrl: 'assets/js',
                    mainConfigFile: 'assets/js/config.js',
                    name: '../../node_modules/almond/almond',
                    out: 'build/js/scripts.min.js',
                    include: ['config'],
                    optimize: 'uglify'
                }
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Grunfile.js',
                'assets/js/collections/*.js',
                'assets/js/models/*.js',
                'assets/js/views/*.js',
                'assets/js/routers/*.js',
                'assets/js/*.js',
                '!assets/js/plugins/*.js',
                '!assets/**/*.min.*'
            ]
        },

        sass: {
            options: {
                compass: false,
                style: 'expanded'
            },
            dev: {
                files: {
                    'assets/css/main.css': 'assets/sass/main.scss',
                }
            }
        },

        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'android 2.3', 'android 4', 'ie 9', 'opera 12']
            },
            dev: {
                options: {
                    map: {
                        prev: 'assets/css/'
                    }
                },
                src: 'assets/css/main.css'
            },
            build: {
                src: 'build/css/main.min.css'
            }
        },

        modernizr: {
            build: {
                devFile: 'assets/js/vendor/modernizr/modernizr.js',
                outputFile: 'build/js/modernizr.min.js',
                files: {
                    'src': [
                        ['build/js/scripts.min.js'],
                        ['build/css/main.min.css']
                    ],
                    uglify: true,
                    parseFiles: true
                }
            }
        },

        cssmin: {
            add_banner: {
                options: {
                    banner: '<%= banner %>',
                },
                files: {
                    'build/css/main.min.css': ['assets/css/*.css']
                }
            }
        },

        processhtml: {
            build: {
                files: {
                    'build/index.html': ['index.html']
                }
            }
        },

        watch: {
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint']
            },
            sass: {
                files: [
                    'assets/sass/*.scss',
                    'assets/sass/**/*.scss'
                ],
                tasks: ['sass:dev', 'autoprefixer:dev']
            },
            livereload: {
                //https://github.com/gruntjs/grunt-contrib-watch#live-reloading
                options: {
                    livereload: false
                },
                files: [
                    'assets/css/main.css',
                    'assets/js/*.js',
                    'assets/js/**/*.js',
                    '!assets/js/vendor/*',
                    'index.html'
                ]
            }

        }
    });

    // Register tasks
    grunt.registerTask('default', [
        'dev'
    ]);
    grunt.registerTask('dev', [
        'jshint',
        'sass',
        'autoprefixer:dev'
    ]);
    grunt.registerTask('build', [
        'jshint',
        'requirejs',
        'sass',
        'cssmin',
        'autoprefixer:build',
        'modernizr',
        'processhtml'
    ]);

};