const { config } = require('@wdio/cli').default;
const allure = require('allure-commandline');

exports.config = {
  runner: 'local',
  specs: ['./test/specs/*.js'],
  exclude: [],
  maxInstances: 10,
  capabilities: [{
    maxInstances: 5,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--headless', '--disable-gpu', '--no-sandbox', '--disable-dev-shm-usage', '--window-size=1920,1080'],
    },
  }],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://example.com',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'mocha',
  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'reports/allure-results',
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  afterTest: function (test, context, { error, result, duration, passed, retries }) {
    if (error) {
      const screenshotPath = `reports/screenshots/${test.title.replace(/\s+/g, '_')}.png`;
      browser.saveScreenshot(screenshotPath);
      console.log(`Screenshot saved: ${screenshotPath}`);
    }
  },
  onComplete: function () {
    const reportError = new Error('Could not generate Allure report');
    const generation = allure(['generate', 'reports/allure-results', '--clean', '-o', 'reports/allure-report']);
    return new Promise((resolve, reject) => {
      const generationTimeout = setTimeout(() => reject(reportError), 5000);
      generation.on('exit', (exitCode) => {
        clearTimeout(generationTimeout);
        if (exitCode !== 0) {
          return reject(reportError);
        }
        console.log('Allure report successfully generated at reports/allure-report');
        resolve();
      });
    });
  },
};
