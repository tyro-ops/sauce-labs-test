import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
  async login(username: string, password: string) {
    await this.page.fill('#user-name', username);
    await this.page.fill('#password', password);
    await this.page.click('#login-button');
    
    // Assertion to check if the login was successful
    await expect(this.page.locator('.inventory_list')).toBeVisible();
  }
}
