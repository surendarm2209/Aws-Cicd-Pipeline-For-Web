exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*.js'],
  exclude: [],
  maxInstances: 10,
  capabilities: [{
    maxInstances: 5,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--headless', '--disable-gpu', '--window-size=1920,1080'],
    },
  }],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://example.com',
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
        outputDir: 'allure-results',
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
      browser.takeScreenshot();
    }
  },
};
