import { BasePage } from './base.page';
import { expect } from '@playwright/test';

export class InventoryPage extends BasePage {
  async addRandomItemsToCart(itemCount: number) {
    const items = await this.page.$$('.inventory_item');
    const selectedIndices = new Set<number>();

    for (let i = 0; i < itemCount; i++) {
      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * items.length);
      } while (selectedIndices.has(randomIndex));

      selectedIndices.add(randomIndex);
      const randomItem = items[randomIndex];
      const addButton = await randomItem.$('.btn_inventory');
      if (addButton) {
        await addButton.click();
        console.log(`Added item ${randomIndex + 1} to the cart.`);
      } else {
        console.error(`Could not find add button for item ${randomIndex + 1}`);
      }
    }

    // Assertion to check if items were added to the cart
    const cartBadge = this.page.locator('.shopping_cart_badge');
    await expect(cartBadge).toHaveText(String(itemCount), { timeout: 10000 });
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
    
    // Assertion to check if navigation to the cart was successful
    await expect(this.page.locator('.cart_list')).toBeVisible();
  }
}
