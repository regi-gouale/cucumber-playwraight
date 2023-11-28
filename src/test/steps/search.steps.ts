import { Given, Then, When, setDefaultTimeout } from "@cucumber/cucumber";
import {} from "@playwright/test";
import Assert from "../../support/wrapper/assert";
import { fixture } from "../../hooks/page.fixture";

setDefaultTimeout(30 * 1000);

let assert: Assert;

Given("I am on the Google search page", async () => {
  assert = new Assert(fixture.page);
  await fixture.page.goto(process.env.BASEURL);
  await fixture.page.getByRole("button", { name: "Tout accepter" }).click();
  await assert.checkTitle("Google");
});

When("I search for {string}", async (searchTerm: string) => {
  await fixture.page.getByLabel("Rech.").fill(searchTerm);
    await fixture.page.getByLabel("Recherche Google").first().click();
});

Then(
  "the page title should start with {string}",
  async (searchTerm: string) => {
    await assert.checkTitle(searchTerm);
  }
);
