const {capability, maxInstance, timeoutInterval} = require('./wdio.conf.helper')
const wdioAllureReporter = require('wdio-allure-reporter')
// const wdio_allure_ts = require('wdio-allure-ts')
const {Reporter} = require('./lib')

exports.config = {

//* **************** Run locally in selenium-standalone server*************//
   // protocol: 'http',
   // hostname: 'selenium-standalone',
  hostname: '172.17.0.2',
  port: 4444,
   // path: '/wd/hub',

  baseUrl: 'https://sales145.s.namely.com',

  specs: [
    './ui/**/*.js'
  ],
   // define specific suites
  suites: {
    login: [
      './ui/login/*.test.js'
    ],
    benefits: [
      './ui/benefits/*.test.js'
    ]
  },
    // Patterns to exclude.
  exclude: [
        // 'path/to/excluded/files'
  ],

  maxInstances: maxInstance,

  capabilities: capability ? capability : [
        // maxInstances can get overwritten per capability. So if we have an in-house Selenium
        // grid with only 5 firefox instance available we can make sure that not more than
        // 5 instance gets started at a time.

        // {browserName: 'chrome', platform: '', version: '', maxInstances: '5'},
        // {browserName: 'firefox', platform: '', version: '', maxInstances: '5'},

    {
      browserName: 'chrome',
       // acceptUntrustedCertificates: true,
       // webdriver_accept_untrusted_certs: true,
       // webdriver_assume_untrusted_issuer: true,
       // cssSelectorsEnabled: true,
      maxInstances: '5'
            // specs: [
            //     './test/specs/*.js'
            // ],
    },
    {
      browserName: 'firefox',
      maxInstances: '5',
      'moz:firefoxOptions': {
       // flag to activate Firefox headless mode (see https://github.com/mozilla/geckodriver/blob/master/README.md#firefox-capabilities for more details about moz:firefoxOptions)
         // args: ['-headless']
      }
        // build: process.env.TRAVIS_BUILD_NUMBER,
        // specs: [
        //     './test/specs/sampe*.js'
        // ],

    }
  ],

  sync: true,
    // Level of logging verbosity: silent | verbose | command | data | result | error
  logLevel: 'verbose',
    // this will generate a logs file. Will stop the command line log
    // logOutput: './logs',

    // Enables colors for log output.
  coloredLogs: true,
    // Warns when a deprecated command is used
  deprecationWarnings: true,
    // If we only want to run wer tests until a specific amount of tests have failed use
    // bail (default is 0 - don't bail, run all tests).
  bail: 0,
    // Saves a screenshot to a given path if a command fails.
  screenshotPath: '../errorShots/',
   // take screenshot on reject
  screenshotOnReject: true,
   // take screenshot on reject and set some options
  screenshotOnReject: {
    connectionRetryTimeout: 30000,
    connectionRetryCount: 0
  },

  debug: true,
    // execArgv: ['--inspect'],
    // Default timeout for all waitFor* commands.

  waitforTimeout: 20000,
    // Default timeout in milliseconds for request
    // if Selenium Grid doesn't send response

  connectionRetryTimeout: 90000,
    // Default request retries count

  connectionRetryCount: 3,

   // ===================
   // Framework
   // ===================

    // Framework we want to run wer specs with.
    // The following are supported: Mocha, Jasmine, and Cucumber
    // see also: http://webdriver.io/guide/testrunner/frameworks.html
    //
    // Make sure we have the wdio adapter package for the specific framework installed
    // before running any tests.
  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: timeoutInterval,
    expectationResultHandler: function (passed, assertion) {
   /**
    * only take screenshot if assertion failed
    */
      if (passed) {
        return
      }
      // will customize screenshots in after test
       // browser.saveScreenshot('assertionError_' + assertion.error.message + '.png')
    }
  },

   // ===================
   // Reporters
   // ===================

  reporters: ['spec', 'junit', 'json', 'allure', 'mochawesome'],
  reporterOptions: {
    junit: {outputDir: './reports/junit-results/'},
    json: {outputDir: './reports/json-results/'},
    allure: {
      outputDir: './reports/allure-results/',
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
      useCucumberStepReporter: false
    },
    mochawesome: {outputDir: './reports/mocha-results/'},
    mochawesomeOpts: {
      includeScreenshots: true,
      screenshotUseRelativePath: true
    }
  },

  onPrepare: function () {
      // eslint-disable-next-line
      console.log('starting test');
  },

  /**
   * Gets executed once before all workers get launched.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   *
   * Gets executed just before initialising the webdriver session and test framework. It allows you
   * to manipulate configurations depending on the capability or spec.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  beforeSession: function (config, capabilities, specs) {
  },
  /**
   * Gets executed before test execution begins. At this point you can access to all global
   * variables like `browser`. It is the perfect place to define custom commands.
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that are to be run
   */
  // before: function (capabilities, specs) {
  // },

  before: function () {
    require('babel-register')
  },
  /**
   * Hook that gets executed before the suite starts
   * @param {Object} suite suite details
   */
  beforeSuite: function (suite) {
  },
  /**
   * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
   * beforeEach in Mocha)
   */
  beforeHook: function () {
  },
  /**
   * Hook that gets executed _after_ a hook within the suite ends (e.g. runs after calling
   * afterEach in Mocha)
   */
  afterHook: function () {
  },
  /**
   * Function to be executed before a test (in Mocha/Jasmine) or a step (in Cucumber) starts.
   * @param {Object} test test details
   */
  beforeTest: function (test) {
  },
  /**
   * Runs before a WebdriverIO command gets executed.
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   */
  beforeCommand: function (commandName, args) {
  },
  /**
   * Runs after a WebdriverIO command gets executed
   * @param {String} commandName hook command name
   * @param {Array} args arguments that command would receive
   * @param {Number} result 0 - command success, 1 - command error
   * @param {Object} error error object if any
   */
  afterCommand: function (commandName, args, result, error) {
  },
  /**
   * Function to be executed after a test (in Mocha/Jasmine) or a step (in Cucumber) ends.
   * @param {Object} test test details
   */
  afterTest: function (test) {
    /**
     * Attach browser console logs and html source
     * in case of test failure and close current step
     */
    if (test.passed) {
      Reporter.closeStep()
      return
    }
    /**
     * Pass true that indicated failing test
    */

    Reporter.closeStep(true)

    /**
     * attach browser console logs to the report
     */
    wdioAllureReporter.createAttachment(
      'Browser console logs',
      `${JSON.stringify(browser.log('browser'), null, 2)}`
    )

    /**
     * Get html source and attach it to the report
     */
    wdioAllureReporter.createAttachment(
      'Page HTML source',
      `${browser.getSource()}`
    )
  },
  /**
   * Hook that gets executed after the suite has ended
   * @param {Object} suite suite details
   */
  afterSuite: function (suite) {
  },
  /**
   * Gets executed after all tests are done. You still have access to all global variables from
   * the test.
   * @param {Number} result 0 - test pass, 1 - test fail
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  after: function (result, capabilities, specs) {
  },
  /**
   * Gets executed right after terminating the webdriver session.
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   * @param {Array.<String>} specs List of spec file paths that ran
   */
  afterSession: function (config, capabilities, specs) {
  },
  /**
   * Gets executed after all workers got shut down and the process is about to exit.
   * @param {Object} exitCode 0 - success, 1 - fail
   * @param {Object} config wdio configuration object
   * @param {Array.<Object>} capabilities list of capabilities details
   */
  onComplete: function (exitCode, config, capabilities) {
    // eslint-disable-next-line
    console.log('Test execution completed')
  },
  /**
  * Gets executed when an error happens, good place to take a screenshot
  * @ {String} error message
  */

  onError: function (message) {
  }
}
