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



// const { expect } = require('chai');

// describe('Login Test', () => {
//   it('should login successfully', async () => {
//     await browser.url('/login');
//     await $('#username').setValue('testuser');
//     await $('#password').setValue('testpassword');
//     await $('button[type="submit"]').click();
//     await expect($('.welcome-message')).toHaveText('Welcome, testuser!');
//   });
// });

describe('Automation Exercise Site', () => {
  it('should open the homepage and verify title', async () => {
    await browser.url('/');
    const title = await browser.getTitle();
    console.log(`Page Title: ${title}`);
    // expect(title).toContain('Automation Exercise');
    expect(title).to.contain('Automation Exercise');

  });
});

