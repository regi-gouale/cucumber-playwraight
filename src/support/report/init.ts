const fs = require("fs-extra");

try {
  fs.ensureDir("test-results");
  fs.emptyDir("test-results");
} catch (e) {
  console.error(`Folder creation failed: ${e}`);
}
