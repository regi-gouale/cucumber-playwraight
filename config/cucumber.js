module.exports = {
  default: {
    tags: process.env.npm_config_TAGS || "",
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/test/features/"],
    dryRun: false,
    require: ["src/test/steps/*.ts", "src/hooks/hooks.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "pretty",
      "progress-bar",
      "html:test-results/cucumber-html-report.html",
      "json:test-results/cucumber-json-report.json",
      "rerun:@rerun.txt",
    ],
    parallel: 3,
  },
  rerun: {
    formatOptions: {
      snippetInterface: "async-await",
    },
    paths: ["src/test/features/"],
    dryRun: false,
    require: ["src/test/steps/*.ts", "src/hooks/hooks.ts"],
    requireModule: ["ts-node/register"],
    format: [
      "pretty",
      "progress-bar",
      "html:test-results/cucumber-html-report.html",
      "json:test-results/cucumber-json-report.json",
      "rerun:@rerun.txt",
    ],
    parallel: 2,
  },
};
