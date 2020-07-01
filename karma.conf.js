// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const path = require('path');
module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular', 'pact'],
    plugins: [
      require('karma-jasmine'),
      require('@pact-foundation/karma-pact'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/spring-boot-angular'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: true,
    restartOnFileChange: true,

    // load pact web module
    files: [
      'node_modules/@pact-foundation/pact-web/pact-web.js'
    ],
    pact: [
      {
        cors: true,
        spec: 3,
        port: 9191,
        consumer: 'ui_consumer',
        provider: 'api_provider',
        logLevel: 'DEBUG',
        log: path.resolve(process.cwd(), 'target/logs', 'pact.log'),
        dir: path.resolve(process.cwd(), 'target/pacts')
      }
    ],
    proxies: {
      '/api/': 'http://localhost:9191/api/'
    }
  });
};
