module.exports = function (config) {
    config.set({

        // base path, that will be used to resolve files and exclude
        basePath: '../',

        // frameworks to use
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'test/*.js',
            'angular-base-class.js'
        ],

        // test results reporter to use
        // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: ['progress', 'coverage'],

        preprocessors: {
            'angular-base-class.js': ['coverage']
        },

        coverageReporter: {
            reporters: [
                {
                    type: 'lcov',
                    dir: 'coverage'
                },
                {
                    type: 'text-summary'
                }
            ]
        },

        // web server port
        port: 9876,

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_WARN,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera (has to be installed with `npm install karma-opera-launcher`)
        // - Safari (only Mac; has to be installed with `npm install karma-safari-launcher`)
        // - PhantomJS
        // - IE (only Windows; has to be installed with `npm install karma-ie-launcher`)
        browsers: ['PhantomJS'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000
    });
};
