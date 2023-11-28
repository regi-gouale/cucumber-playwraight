import { After, AfterAll, Before, BeforeAll } from "@cucumber/cucumber";
import { Browser, BrowserContext } from "@playwright/test";
import { getEnv } from "../support/env/env";
import { invokeBrowser } from "../support/browser/browser.manager";
import { fixture } from "./page.fixture";
import { createLogger } from "winston";
import { options } from "../support/utils/logger";

const fs = require("fs-extra");

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function () {
  getEnv();
  browser = await invokeBrowser();
});

Before({ tags: "not @auth" }, async function ({ pickle }) {
  const scenarioName = `${pickle.name}-${pickle.id}`;
  context = await browser.newContext({
    recordVideo: { dir: `test-results/videos` },
  });

  await initFixture(context, scenarioName, pickle);

  //   await context.tracing.start({
  //     screenshots: true,
  //     snapshots: true,
  //     sources: true,
  //     name: scenarioName,
  //     title: pickle.name,
  //   });

  //   const page = await context.newPage();
  //   fixture.page = page;
  //   fixture.logger = createLogger(options(scenarioName));
});

Before({ tags: "@auth" }, async function ({ pickle }) {
  const scenarioName = `${pickle.name}-${pickle.id}`;
  context = await browser.newContext({
    recordVideo: { dir: `test-results/videos` },
    storageState: getStorageState(),
  });

  await initFixture(context, scenarioName, pickle);
  // await context.tracing.start({
  //   screenshots: true,
  //   snapshots: true,
  //   sources: true,
  //   name: scenarioName,
  //   title: pickle.name,
  // });

  //   const page = await context.newPage();
  //   fixture.page = page;
  //   fixture.logger = createLogger(options(scenarioName));
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
    const traceFileLink = `<a href="https://trace.playwright.dev" target="${path}">Open ${path}</a>`;
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
  // console.log("page", page);
  fixture.page = page;
  // console.log("fixture.page", fixture.page);
  fixture.logger = createLogger(options(scenarioName));
}
