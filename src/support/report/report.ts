import { CucumberConverter } from "cucumber-to-junit";
const report = require("multiple-cucumber-html-reporter");

const converter = new CucumberConverter({
  markUndefinedAsFailed: true,
});

report.generate({
  jsonDir: "test-results",
  reportPath: "test-results/reports/",
  reportName: "Cucumber Test Automation Report",
  displayDuration: true,
  durationInMS: true,
  metadata: {
    browser: {
      name: "chrome",
      version: "120",
    },
    device: "Local test machine",
    platform: {
      name: "windows",
      version: "10",
    },
    customData: {
      title: "Run info",
      data: [
        { label: "Project", value: "Cucumber Typescript" },
        { label: "Release", value: "1.0.0" },
        { label: "Cycle", value: "B11221.34321" },
      ],
    },
  },
});

converter.convertToJunit(
  "test-results/cucumber-json-report.json",
  "test-results/cucumber-junit-report.xml"
);