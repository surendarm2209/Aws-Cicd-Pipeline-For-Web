const { config } = require('@wdio/cli').default;
const allure = require('allure-commandline');

exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.js'], // Path to your test files
  exclude: [],
  maxInstances: 10,
  capabilities: [{
    maxInstances: 5,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--headless', // Run in headless mode
        '--disable-gpu',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--window-size=1920,1080',
      ],
    },
  }],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://example.com', // Replace with your base URL
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['chromedriver'], // Automatically manage ChromeDriver
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results', // Directory for Allure results
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000, // Test timeout
  },
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    // Take a screenshot if the test fails
    if (error) {
      browser.takeScreenshot();
    }
  },
  onComplete: function () {
    // Generate Allure report after test execution
    const reportError = new Error('Could not generate Allure report');
    const generation = allure(['generate', 'allure-results', '--clean']);
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 5000);
      generation.on('exit', (exitCode) => {
        clearTimeout(generationTimeout);
        if (exitCode !== 0) {
          return reject(reportError);
        }
        console.log('Allure report successfully generated');
        resolve();
      });
    });
  },
};
