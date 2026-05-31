import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('SauceDemo Login Validation Suites', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('TC01 - Should log in successfully with standard_user', async () => {
    await loginPage.login('standard_user', 'secret_sauce');
    
    // Assertions
    await expect(inventoryPage.productHeader).toBeVisible();
    await expect(inventoryPage.productHeader).toHaveText('Products');
    
    const itemsCount = await inventoryPage.getItemsCount();
    expect(itemsCount).toBeGreaterThan(0);
  });

  test('TC02 - Should display error message with locked_out_user', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    
    // Assertions
    const errorText = await loginPage.getErrorMessageText();
    expect(errorText).toContain('Epic sadface: Sorry, this user has been locked out.');
  });
});