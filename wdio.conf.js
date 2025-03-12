import { join } from 'path';
import { remote } from 'webdriverio';

export const config = {
    runner: 'local',
    specs: [join(process.cwd(), 'tests', 'specs', '*.js')],

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

// describe('WebdriverIO Test', () => {
//     before(async () => {
//         await browser.url('https://your-ecommerce-site.com');
//     });

//     it('should log in successfully', async () => {
//         const username = await $('#username');
//         const password = await $('#password');
//         const loginButton = await $('#login');

//         await username.setValue('testuser');
//         await password.setValue('password123');
//         await loginButton.click();

//         await browser.pause(2000); // Adjust as needed

//         // CAPTCHA Handling (if applicable)
//         const captchaElement = await $('#captcha');
//         if (await captchaElement.isDisplayed()) {
//             console.warn('CAPTCHA detected! Manual intervention required.');
//             await browser.debug();
//         }

//         const dashboard = await $('#dashboard');
//         await expect(dashboard).toBeExisting();
//     });

//     it('should take a screenshot on failure', async () => {
//         try {
//             await browser.url('https://your-ecommerce-site.com/product/123');
//             const addToCart = await $('#add-to-cart');
//             await addToCart.click();
//             const cart = await $('#cart');
//             await expect(cart).toBeExisting();
//         } catch (error) {
//             await browser.saveScreenshot('./error-screenshot.png');
//             throw error;
//         }
//     });
// });

