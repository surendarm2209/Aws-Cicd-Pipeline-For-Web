export const config = {
  runner: 'local',
  specs: ['./test/specs/*.js'],
  maxInstances: 1,
  capabilities: [{
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: ['--headless', '--disable-gpu', '--window-size=1920,1080'],
    },
  }],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://automationexercise.com/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  services: ['chromedriver'],
  framework: 'mocha',
  reporters: ['spec', ['allure', { outputDir: './reports/allure-results' }]],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  before: function () {
    require('expect-webdriverio');
    const chai = require('chai');
    global.expect = chai.expect;
  },
  afterTest: async function (test, context, { error, result, duration, passed }) {
    if (!passed) {
      const screenshot = `./reports/screenshots/${test.title.replace(/\s+/g, '_')}.png`;
      await browser.saveScreenshot(screenshot);
    }
  },
};

