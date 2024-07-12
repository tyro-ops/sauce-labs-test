import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class CheckoutPage extends BasePage {
  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.page.fill('#first-name', firstName);
    await this.page.fill('#last-name', lastName);
    await this.page.fill('#postal-code', postalCode);
    await this.page.click('#continue');
    
    // Assertion to check if navigation to the overview page was successful
    await expect(this.page.locator('.cart_list')).toBeVisible();
  }

  async finishCheckout() {
    await this.page.click('#finish');
    
    // Assertion to check if the checkout process was completed successfully
    await expect(this.page.locator('.complete-header')).toHaveText('Thank you for your order!');
  }
}
