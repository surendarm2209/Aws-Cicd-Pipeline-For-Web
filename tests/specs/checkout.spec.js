// import { expect } from 'chai';

// describe('Checkout Process', () => {
//     it('should add an item to cart and proceed to checkout', async () => {
//         await browser.url('/');
//         await $('#user-name').setValue('standard_user');
//         await $('#password').setValue('secret_sauce');
//         await $('#login-button').click();

//         await $('.inventory_item:nth-child(1) .btn_inventory').click();
//         await $('.shopping_cart_link').click();
//         await $('#checkout').click();

//         await $('#first-name').setValue('John');
//         await $('#last-name').setValue('Doe');
//         await $('#postal-code').setValue('12345');
//         await $('#continue').click();
        
//         const totalPrice = await $('.summary_total_label');
//         expect(await totalPrice.isDisplayed()).to.be.true;

//         await browser.saveScreenshot('./screenshots/checkout_success.png');
//     });
// });




const { expect } = require('chai');

describe('Search Test', () => {
  it('should display search results', async () => {
    await browser.url('/');
    await $('#search-box').setValue('WebdriverIO');
    await $('button[type="submit"]').click();
    await expect($('.search-results')).toBeDisplayed();
  });
});
