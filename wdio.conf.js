exports.config = {
  // ====================
  // Runner Configuration
  // ====================
  runner: 'local',

  // ==================
  // Specify Test Files
  // ==================
  specs: ['./test/specs/**/*.js'],

  // ============
  // Capabilities
  // ============
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--headless', // Run in headless mode
          '--disable-gpu', // Disable GPU for headless mode
          '--no-sandbox', // Disable sandbox for CI environments
          '--disable-dev-shm-usage', // Avoid /dev/shm usage issues
          '--window-size=1920,1080', // Set window size
        ],
      },
    },
  ],

  // ===================
  // Test Configurations
  // ===================
  logLevel: 'info', // Set log level (options: trace, debug, info, warn, error, silent)
  bail: 0, // Stop test execution after X failures
  baseUrl: 'http://localhost', // Base URL for your application
  waitforTimeout: 10000, // Default timeout for all waitFor* commands
  connectionRetryTimeout: 90000, // Timeout for retrying connection to browser
  connectionRetryCount: 3, // Number of retries for connection
  services: ['chromedriver'], // Use Chromedriver service
  framework: 'mocha', // Use Mocha as the test framework
  reporters: ['spec'], // Use Spec reporter for test output
  mochaOpts: {
    ui: 'bdd', // Behavior-Driven Development interface
    timeout: 60000, // Timeout for test execution
  },

  // =====
  // Hooks
  // =====
  onPrepare: function (config, capabilities) {
    console.log('Starting Chromedriver...');
  },
  onComplete: function (exitCode, config, capabilities, results) {
    console.log('Tests completed!');
  },
};
