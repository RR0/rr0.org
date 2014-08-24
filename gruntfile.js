module.exports = function (grunt) {
    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),
            traceur: {
                options: {
                    sourceMap: true
                },
                custom: {
                    files: [
                        {
                            src: ['js/common.js'],
                            dest: 'js/common.es5.js'
                        },
                        {
                            src: ['js/net.js'],
                            dest: 'js/net.es5.js'
                        },
                        {
                            src: ['js/lang.js'],
                            dest: 'js/lang.es5.js'
                        },
                        {
                            src: ['js/nav.js'],
                            dest: 'js/nav.es5.js'
                        },
                        {
                            src: ['people/people.js'],
                            dest: 'people/people.es5.js'
                        },
                        {
                            src: ['time/time.js'],
                            dest: 'time/time.es5.js'
                        },
                        {
                            src: ['time/time-module.js'],
                            dest: 'time/time-module.es5.js'
                        },
                        {
                            src: ['place/place.js'],
                            dest: 'place/place.es5.js'
                        },
                        {
                            src: ['js/foot.js'],
                            dest: 'js/foot.es5.js'
                        },
                        {
                            src: ['js/index.js'],
                            dest: 'js/index.es5.js'
                        },
                        {
                            src: ['js/search/search.js'],
                            dest: 'js/search/search.es5.js'
                        },
                        {
                            src: ['js/units.js'],
                            dest: 'js/units.es5.js'
                        }
                    ]
                }
            },
//            docular: {
//                groups: [],
//                showDocularDocs: true,
//                showAngularDocs: true,
//                docular_webapp_target: 'doc'
//            },
            autoprefixer: {
                options: {
                    browsers: ['> 1%', 'last 2 versions', 'ie 8', 'ie 9']
                },
                multiple_files: {
                    expand: true,
                    flatten: true,
                    src: '*.css'
                }
            },
            ngmin: {
                controllers: {
                    src: ['js/*.js'],
                    dest: 'test/generated/controllers/one.js'
                },
                directives: {
                    expand: true,
                    cwd: 'js',
                    src: ['directives/**/*.js'],
                    dest: 'test/generated'
                }
            },
            jasmine: {
                src: ['js/common.js', 'time/time.js'],
                options: {
                    specs: 'time/*Spec.js'
                }
            },
            uglify: {
                my_target: {
                    files: {
                        'js/all.es5.min.js': [
                            'js/common.es5.js',
                            'js/net.es5.js',
                            'js/lang.es5.js',
                            'js/nav.es5.js',
                            'people/people.es5.js',
                            'time/time.es5.js',
                            'time/time-module.es5.js',
                            'place/place.es5.js',
                            'js/foot.es5.js',
                            'js/index.es5.js',
                            'js/search/search.es5.js',
                            'js/units.es5.js'
                        ]
                    }
                }
            }
        }
    );
    //grunt.loadNpmTasks('grunt-docular');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-ngmin');
    grunt.loadNpmTasks('grunt-traceur');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['traceur', 'uglify']);

};