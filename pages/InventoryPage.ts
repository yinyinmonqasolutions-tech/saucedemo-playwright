import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class InventoryPage extends BasePage {
  readonly productHeader: Locator;
  private readonly inventoryItems: Locator;

  constructor(page: Page) {
    super(page);
    this.productHeader = page.locator('.title');
    this.inventoryItems = page.locator('.inventory_item');
  }

  async getProductHeaderTexts(): Promise<string> {
    return await this.productHeader.innerText();
  }

  async getItemsCount(): Promise<number> {
    return await this.inventoryItems.count();
  }
}