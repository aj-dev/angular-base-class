/* globals module:false, require:false */
module.exports = function (grunt) {

	'use strict';

	// load all grunt tasks matching the 'grunt-*' pattern
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		karma: {
			unit: {
				configFile: 'karma.conf.js',
				singleRun: true
			},
			auto: {
				configFile: 'karma.conf.js',
				autoWatch: true
			}
		},
		uglify: {
			options: {
				mangle: true
			},
			target: {
				files: {
					'dist/angular-base-class.min.js': 'src/angular-base-class.js'
				}
			}
		}
	});

	// Load all modules from package.json which name starts with 'grunt-'. Very helpful to avoid having to loadNpmTasks for every grunt module
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	grunt.registerTask('test', ['karma:unit']);
};
