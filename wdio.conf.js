// // const { config } = require('@wdio/cli').default;
// // const allure = require('allure-commandline');

// // export const config = {
// //   runner: 'local',
// //   specs: ['./tests/specs/*.js'],
// //   maxInstances: 1,
// //   capabilities: [{
// //     browserName: 'chrome',
// //     'goog:chromeOptions': {
// //       args: ['--headless', '--disable-gpu', '--window-size=1920,1080'],
// //     },
// //   }],
// //   logLevel: 'info',
// //   bail: 0,
// ///   baseUrl: 'https://automationexercise.com/',
// //   waitforTimeout: 10000,
// //   connectionRetryTimeout: 90000,
// //   connectionRetryCount: 3,
// //   framework: 'mocha',
// //   reporters: ['allure', { outputDir: './reports/allure-results' }],
// //   mochaOpts: {
// //     ui: 'bdd',
// //     timeout: 60000,
// //   },
// //   before: function () {
// //     require('expect-webdriverio');
// //     const chai = require('chai');
// //     global.expect = chai.expect;
// //   },
// //   afterTest: async function (test, context, { error, result, duration, passed }) {
// //     if (!passed) {
// //       const screenshot = `./reports/screenshots/${test.title.replace(/\s+/g, '_')}.png`;
// //       await browser.saveScreenshot(screenshot);
// //     }
// //   },
// // };


// // const allure = require('allure-commandline');
// import allure from 'allure-commandline';

// exports.config = {
//   runner: 'local',
//   specs: ['./tests/specs/*.js'],
//   maxInstances: 1,
//   capabilities: [{
//     browserName: 'chrome', // No explicit chromedriver dependency
//     'goog:chromeOptions': {
//       args: ['--headless', '--disable-gpu', '--window-size=1920,1080'],
//     },
//   }],
//   logLevel: 'info',
//   bail: 0,
//   baseUrl: 'https://automationexercise.com/', // Demo website for testing
//   waitforTimeout: 10000,
//   connectionRetryTimeout: 90000,
//   connectionRetryCount: 3,
//   framework: 'mocha',
//   reporters: [
//     ['allure', { outputDir: './reports/allure-results' }]
//   ],
//   mochaOpts: {
//     ui: 'bdd',
//     timeout: 60000,
//   },
  
//   before: function () {
//     require('expect-webdriverio');
//     const chai = require('chai');
//     global.expect = chai.expect;
//     require('babel-register');
//   },

//   afterTest: async function (test, context, { error, result, duration, passed }) {
//     if (!passed) {
//       const fs = require('fs');
//       const path = require('path');

//       const screenshotPath = path.join(__dirname, 'reports', 'screenshots');
//       if (!fs.existsSync(screenshotPath)) {
//         fs.mkdirSync(screenshotPath, { recursive: true });
//       }

//       const screenshotFile = `${screenshotPath}/${test.title.replace(/\s+/g, '_')}.png`;
//       await browser.saveScreenshot(screenshotFile);
//     }
//   },
// };

import '@babel/register';
import allure from 'allure-commandline';

export const config = {
  runner: 'local',
  specs: ['./tests/specs/*.js'],
  maxInstances: 1,
  capabilities: [{
  browserName: 'chrome',
  'goog:chromeOptions': {
    args: [
      '--headless', 
      '--disable-gpu', 
      '--window-size=1920,1080',
      '--no-sandbox', 
      '--disable-dev-shm-usage',
      '--disable-software-rasterizer',
      '--disable-extensions',
      '--disable-infobars',
      '--disable-blink-features=AutomationControlled',
      `--user-data-dir=/tmp/chrome-user-data-${Date.now()}`  // Use a unique user-data-dir
      ],
    },
  }],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'https://automationexercise.com/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  // reporters: [
  //   ['allure', {
  //     outputDir: './reports/allure-results',
  //     disableWebdriverStepsReporting: true,
  //     disableWebdriverScreenshotsReporting: false,
  //   }]
  // ],
  reporters: [
    ['allure', { outputDir: './reports/allure-results' }]
  ],
  
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
  before: function () {
    import('expect-webdriverio').then((expectWDIO) => {
      global.expect = expectWDIO.default;
    });
    import('chai').then((chai) => {
      global.expect = chai.expect;
    });
  },
  afterTest: async function (test, context, { error, result, duration, passed }) {
    if (!passed) {
      const screenshot = `./reports/screenshots/${test.title.replace(/\s+/g, '_')}.png`;
      await browser.saveScreenshot(screenshot);
    }
  },
};
