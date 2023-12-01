export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BROWSER: "chrome" | "firefox" | "webkit";
      ENV: "local" | "dev" | "qa" | "prod";
      HEAD: "true" | "false";
      DEVICE:
        | "desktop"
        | "iphone"
        | "android"
        | "ipad"
        | "ipad-landscape"
        | "iphone-landscape"
        | "android-landscape"
        | "tablet"
        | "tablet-landscape";
      BASE_URL: string;
    }
  }
}
