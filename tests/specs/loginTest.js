// import { expect } from 'chai';

// describe('Login Page Tests', () => {
//     it('should log in successfully', async () => {
//         await browser.url('/');
//         await $('#user-name').setValue('standard_user');
//         await $('#password').setValue('secret_sauce');
//         await $('#login-button').click();
        
//         const inventoryTitle = await $('.title');
//         expect(await inventoryTitle.getText()).to.equal('Products');

//         await browser.saveScreenshot('./screenshots/login_success.png');
//     });
// });
const { expect } = require('chai');

describe('Login Test', () => {
  it('should login successfully', async () => {
    await browser.url('/login'); // Navigate to the login page
    await $('#username').setValue('testuser'); // Enter username
    await $('#password').setValue('testpassword'); // Enter password
    await $('button[type="submit"]').click(); // Click the submit button
    await expect($('.welcome-message')).toHaveText('Welcome, testuser!'); // Assert welcome message
  });
});
