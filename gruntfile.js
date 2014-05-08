module.exports = function (grunt) {
    grunt.initConfig(
        {
            pkg: grunt.file.readJSON('package.json'),
            docular: {
                groups: [],
                showDocularDocs: true,
                showAngularDocs: true,
                docular_webapp_target: 'doc'
            },
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
                src: ['js/common.js','time/time.js'],
                options: {
                    specs: 'time/*Spec.js'
                }
            }
        }
    );
    grunt.loadNpmTasks('grunt-docular');
//    grunt.registerTask('default', ['docular']);
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-ngmin');
};