import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser, BrowserContext, devices } from "@playwright/test";
import { getEnv } from "../support/env/env";
import { invokeBrowser } from "../support/browser/browser.manager";
import { fixture } from "./page.fixture";
import { createLogger } from "winston";
import { options } from "../support/utils/logger";

const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;
let device;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
  const scenarioName = `${pickle.name}-${pickle.id}`;
  const isAuth = isAuthTag([...pickle.tags].map((tag) => tag.name));
  device = await getDevice(process.env.DEVICE, process.env.BROWSER);
  context = await getContextBrowser(pickle, device, browser, isAuth);

  await initFixture(context, scenarioName, pickle);
});

After(async function ({ pickle, result }) {
  let videoPath: string;
  let img: Buffer;

  const path = `./test-results/trace/${pickle.id}.zip`;

  if (result?.status === "PASSED") {
    img = await fixture.page.screenshot({
      path: `./test-results/screenshots/${pickle.name}.png`,
      type: "png",
    });
    videoPath = await fixture.page.video().path();
  }

  await context.tracing.stop({ path: path });
  await fixture.page.close();
  await context.close();

  if (result?.status === "PASSED") {
    await this.attach(img, "image/png");
    await this.attach(fs.readFileSync(videoPath), "video/webm");
    const traceFileLink = `<a href="https://trace.playwright.dev" target="">Open ${path}</a>`;
    await this.attach(traceFileLink, "text/html");
  }
});

AfterAll(async function () {
  await browser.close();
});

function getStorageState(user: string = "") {
  return user
    ? `src/support/auth/${user}/cookies.json`
    : "src/support/auth/cookies.json";
}

async function initFixture(
  context: BrowserContext,
  scenarioName: string,
  pickle: any
) {
  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
    name: scenarioName,
    title: pickle.name,
  });

  const page = await context.newPage();
  fixture.page = page;
  fixture.logger = createLogger(options(scenarioName));
  fixture.device = device;
}

async function getDevice(device: string, browser: string) {
  switch (device) {
    case "desktop":
      switch (browser) {
        case "chrome":
          return devices["Desktop Chrome"];
        case "firefox":
          return devices["Desktop Firefox"];
        case "webkit":
          return devices["Desktop Safari"];
        default:
          throw new Error("Browser not found");
      }
    case "iphone":
      return devices["iPhone 14"];
    case "android":
      return devices["Pixel 7"];
    case "ipad":
      return devices["iPad Pro 11"];
    case "ipad-landscape":
      return devices["iPad Pro 11 landscape"];
    case "iphone-landscape":
      return devices["iPhone 14 landscape"];
    case "android-landscape":
      return devices["Pixel 7 landscape"];
    case "tablet":
      return devices["Galaxy Tab S4"];
    case "tablet-landscape":
      return devices["Galaxy Tab S4 landscape"];
    default:
      throw new Error("Device not found");
  }
}

function isAuthTag(tags: string[]) {
  return tags.includes("@auth");
}

async function getContextBrowser(
  pickle,
  device,
  browser: Browser,
  isAuth: boolean
) {
  return await browser.newContext({
    ...device,
    storageState: isAuth ? getStorageState(pickle.name) : undefined,
    recordVideo: { dir: `test-results/videos` },
    ignoreHTTPSErrors: browser.version() === "webkit",
  });
}
