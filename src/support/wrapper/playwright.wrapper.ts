import { Page, expect } from "@playwright/test";

export default class PlaywrightWrapper {
  constructor(private page: Page) {}

  async goto(url: string) {
    const baseUrl = process.env.BASE_URL || "https://www.google.com";
    await this.page.goto(`${baseUrl}${url}`, { waitUntil: "domcontentloaded" });
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async waitAndClick(selector: string) {
    await this.page.waitForSelector(selector);
    await this.page.click(selector);
  }
}
