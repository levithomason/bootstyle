module.exports = function(grunt) {

    // configure the tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        connect: {
            options: {
                base: '.',
            },
            dev: {
                options: {
                    port: 35729,
                    protocol: 'http',
                    hostname: '*',
                    keepalive: true,
                    debug: true,
                    //livereload: true,
                    open: false,
                    useAvailablePort: false,
                    onCreateServer: function(server, connect, options) {
                    },
                    middleware: function(connect, options, middlewares) {

                        // Must be the first middle-ware in the array, per the docs
                        middlewares.push(function(connect) {
                            require('connect-livereload')({
                                port: 35729
                            });
                        });

                        return middlewares;
                    }
                }
            }
        },
        copy: {
            build: {
                cwd: 'node_modules',
                src: [ '*/{lib,bin}/*.js' ],
                dest: 'build',
                flatten: true,
                expand: true
            },
            fancy: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        cwd: 'bower_components',
                        dest: 'js/fancy',
                        src: [
                            '*/*.js',
                            '*/js/*.js',
                            '*/dist/*.js',
                            '*/dist/js/*.js',
                            '*/lib/*.js',
                            'codemirror/mode/css/css.js',
                            'codemirror/mode/htmlmixed/htmlmixed.js',
                            'codemirror/mode/javascript/javascript.js',
                            'codemirror/mode/xml/xml.js',
                        ]
                    },
                ]
            },
        },
        clean: {
            build: {
                src: [ 'build' ]
            },
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: [ 'node_modules/*/{lib,bin}/*.js' ],
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        watch: {
            files: ['js/*.js', 'js/vendor/*.js'],
            tasks: ['jshint'],
            options: {
                cwd: '.',
                atBegin: false,
                spawn: false,
                event: ['all'],
                reload: true,
                livereload: 35729,
                livereloadOnError: true,
            },
        },
        browserifyBower: {
            options: {
                // Task-specific options go here.
            },
            your_target: {
                // Target-specific file lists and/or options go here.
            },
        },
        browserify: {
            bundleOptions: {
                debug: true
            },
            src: 'main.js',
            dest: 'js/bundle.js'
        },
        "bower-install-simple": {
            options: {
                color: true,
                production: false,
                directory: "bower_components"
            }
        },
        bowercopy: {
            options: {
                srcPrefix: 'bower_components',
                runBower: false,
                report: true,
                clean: false,
                ignore: [],
                copyOptions: {

                }
            },
            js: {
                options: {
                    destPrefix: 'js/bower',
                },
                files: {
                    "angular.js": "angular/angular.js",
                    "angular-bootstrap-colorpicker.js": "angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js",
                    "angular-sanitize.js": "angular-sanitize/angular-sanitize.min.js",
                    "angular-spectrum-colorpicker.js": "angular-spectrum-colorpicker/dist/angular-spectrum-colorpicker.min.js",
                    "bootstrap.js": "bootstrap/dist/js/bootstrap.min.js",
                    "codemirror/codemirror.js": "codemirror/lib/codemirror.js",
                    "codemirror/css.js": "codemirror/mode/css/css.js",
                    "codemirror/htmlmixed.js": "codemirror/mode/htmlmixed/htmlmixed.js",
                    "codemirror/javascript.js": "codemirror/mode/javascript/javascript.js",
                    "codemirror/xml.js": "codemirror/mode/xml/xml.js",
                    "FileSaver.js": "FileSaver/FileSaver.js",
                    "jquery.js": "jquery/dist/jquery.min.js",
                    "less.js": "less.js/dist/less-1.7.3.min.js",
                    "modernizr.js": "modernizr/modernizr.js",
                    "spectrum.js": "spectrum/spectrum.js",
                    "tinycolor.js": "tinycolor/tinycolor.js"
                }
            },
            fonts: {
                options: {
                    destPrefix: 'fonts/bower',
                },
                files: {
                    "fontawesome": "fontawesome/fonts/*",
                }
            },
            css: {
                options: {
                    destPrefix: 'css/bower',
                },
                files: {
                    "angular-bootstrap-colorpicker.css": "angular-bootstrap-colorpicker/css/colorpicker.css",
                    "codemirror/codemirror.css": "codemirror/lib/codemirror.css",
                    "codemirror/ambiance.css": "codemirror/theme/ambiance.css",
                    "font-awesome.css": "fontawesome/css/font-awesome.css",
                    "spectrum.css": "spectrum/spectrum.css",
                }
            }
        },
    });

    // load all grunt tasks
    // https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt, {
        pattern: 'grunt-*',
        config: 'package.json',
        scope: ['devDependencies', 'dependencies']
    });

    // define tasks
    // TODO: copy font awesome fonts to fonts folder
    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.',
        [ 'clean', 'copy' ]
    );

    grunt.registerTask(
        'serve',
        'Runs the dev server.',
        [ 'connect:dev', 'watch' ]
    );

    grunt.registerTask(
        'default',
        [ 'uglify' ]
    );

    // dependencies
    grunt.registerTask(
        'bower_install',
        'Installs bower.json dependencies.',
        [ 'bower-install-simple' ]
    );

    grunt.registerTask(
        'npm_install',
        'Installs package.json dependencies.',
        [ 'npm-install' ]
    );

    grunt.registerTask(
        'install_dependencies',
        'Installs bower and npm dependencies.',
        [ 'npm_install', 'bower_install' ]
    );

    grunt.registerTask(
        'setup',
        'Setup Bootstyle locally.',
        [ 'npm_install', 'bower_install' ]
    );
};
