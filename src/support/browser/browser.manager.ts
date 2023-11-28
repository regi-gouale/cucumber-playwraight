import { LaunchOptions, chromium, firefox, webkit } from "@playwright/test";

const options: LaunchOptions = {
  headless: process.env.HEADLESS !== "false",
};

export const invokeBrowser = () => {
  const browser = process.env.BROWSER || "chrome";
  switch (browser) {
    case "chrome":
      return chromium.launch(options);
    case "firefox":
      return firefox.launch(options);
    case "webkit":
      return webkit.launch(options);
    default:
      return chromium.launch(options);
  }
};
