/* globals module:false, require:false */
module.exports = function (grunt) {

    'use strict';

    // Load all grunt tasks matching the 'grunt-*' pattern.
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'config/karma.conf.js',
                singleRun: true
            },
            auto: {
                configFile: 'config/karma.conf.js',
                autoWatch: true
            }
        },
        uglify: {
            options: {
                mangle: true
            },
            target: {
                files: {
                    'angular-base-class.min.js': 'angular-base-class.js'
                }
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                commitFiles: ['-a'],
                push: false
            }
        }
    });

    // Load all modules from package.json matching the pattern 'grunt-*'. Very helpful to avoid having to loadNpmTasks for every grunt module.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('test', ['karma:unit']);
};
