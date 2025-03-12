import { expect } from 'chai';

describe('Login Page Tests', () => {
    it('should log in successfully', async () => {
        await browser.url('/');
        await $('#user-name').setValue('standard_user');
        await $('#password').setValue('secret_sauce');
        await $('#login-button').click();
        
        const inventoryTitle = await $('.title');
        expect(await inventoryTitle.getText()).to.equal('Products');

        await browser.saveScreenshot('./screenshots/login_success.png');
    });
});

