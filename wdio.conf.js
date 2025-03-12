import { join } from 'path';
import { remote } from 'webdriverio';

export const config = {
    runner: 'local',
    specs: [join(process.cwd(), 'tests', 'specs', '*.js')],

    // maxInstances: 1,

    // capabilities: [{
    //     browserName: 'chrome',
    //     'goog:chromeOptions': {
    //         args: [
    //             '--headless',
    //             '--disable-gpu',
    //             '--no-sandbox',
    //             '--disable-dev-shm-usage',
    //             '--window-size=1920,1080'
    //         ]
    //     }
    // }],
    capabilities: [
    {
    maxInstances: 1,
    browserName: 'chrome',
    'goog:chromeOptions': {
      args: [
        '--headless',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--window-size=1920,1080'
          ]
        }
      }
    ],

    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://www.saucedemo.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: [['chromedriver', {
        chromedriverCustomPath: join(process.cwd(), 'drivers', 'chromedriver')
    }]],

    reporters: ['spec',
        ['allure', {
            outputDir: join(process.cwd(), 'reports', 'allure-results'),
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
        }]
    ],

    outputDir: join(process.cwd(), 'reports', 'logs'),

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

       /** ✅ Ensure Allure report directory exists before session starts */
    beforeSession: function () {
        const allureDir = join(process.cwd(), 'reports', 'allure-results');
        if (!fs.existsSync(allureDir)) {
            fs.mkdirSync(allureDir, { recursive: true });
        }
    },
    
    /** ✅ FIX: Ensure `browser` is fully initialized before running tests */
    before: function () {
        global.browser = browser;
    },

    onPrepare: function () {
        console.log('🚀 Starting WebdriverIO Tests...');
    },

    onComplete: function () {
        console.log('✅ WebdriverIO Tests Completed!');
    }
};

