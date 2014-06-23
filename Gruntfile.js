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
                        livereload: true,
                        open: false,
                        useAvailablePort: false,
                        onCreateServer: function(server, connect, options) {
                            console.log('Connect server created:');
                            console.log(server);
                        },
                        middleware: function(connect, options, middlewares) {

                            middlewares.push(function(req, res, next) {
                                if (req.url !== '/') return next();

                                res.end('Middleware working on "/"' + options.port);
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
                scripts: {
                    files: ['**/*.js'],
                    tasks: ['jshint'],
                    options: {
                        cwd: '.',
                        atBegin: false,
                        spawn: false,
                        event: ['all'],
                        reload: true,
                        livereload: true,
                        livereloadOnError: true,
                    },
                },
            },
        });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // define tasks
    // TODO: copy font awesome fonts to fonts folder
    grunt.registerTask(
        'build',
        'Compiles all of the assets and copies the files to the build directory.',
        [ 'clean', 'copy' ]
    );

    grunt.registerTask(
        'default',
        ['uglify']
    );
};