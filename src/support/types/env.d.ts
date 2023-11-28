export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BROWSER: "chrome" | "firefox" | "webkit";
      ENV: "local" | "dev" | "qa" | "prod";
      HEADLESS: "true" | "false";
      PLATFORM: "windows" | "mac" | "linux";
      BASE_URL: string;
    }
  }
}
