import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class CartPage extends BasePage {
  async checkout() {
    await this.page.click('#checkout');
    
    // Assertion to check if navigation to the checkout page was successful
    await expect(this.page.locator('.checkout_info')).toBeVisible();
  }
}
