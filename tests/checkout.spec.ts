import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CartPage } from '../pages/cart.page';
import { CheckoutPage } from '../pages/checkout.page';

test('User can complete a checkout process', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutPage = new CheckoutPage(page);

  await loginPage.navigate('/');
  await loginPage.login('standard_user', 'secret_sauce');
  
  await inventoryPage.addRandomItemsToCart(3);
  await inventoryPage.goToCart();

  await cartPage.checkout();
  
  await checkoutPage.fillCheckoutForm('John', 'Doe', '12345');
  await checkoutPage.finishCheckout();

  await expect(page.locator('.complete-header')).toHaveText('Thank you for your order!');
});
