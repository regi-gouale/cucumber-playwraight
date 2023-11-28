import { Page, expect } from "@playwright/test";

export default class Assert {
  constructor(private page: Page) {}

  async checkTitle(title: string) {
    await expect( await this.page.title()).toContain(title);
  }

  async checkUrl(url: string) {
    await expect(await this.page.url()).toBe(url);
  }

  async checkText(selector: string, text: string) {
    await expect(await this.page.innerText(selector)).toBe(text);
  }

  async checkTextContains(selector: string, text: string) {
    await expect(await this.page.innerText(selector)).toContain(text);
  }

  async checkUrlContains(url: string) {
    await expect(await this.page.url()).toContain(url);
  }
}
