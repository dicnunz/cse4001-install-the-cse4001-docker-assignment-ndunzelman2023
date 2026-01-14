const fs = require('fs');
const path = require('path');

const README_PATH = 'README.md';
const SCREENSHOT_NAME = 'screenshot.jpg';

// --------------------
// Extract screenshot path from README.md
// --------------------
function getScreenshotPathFromReadme() {
  if (!fs.existsSync(README_PATH)) {
    console.error('❌ README.md not found');
    process.exit(1);
  }

  const readmeContent = fs.readFileSync(README_PATH, 'utf8');

  const regex = new RegExp(
    `!\\[[^\\]]*\\]\\(([^\\)]*${SCREENSHOT_NAME})\\)`,
    'i'
  );

  const match = readmeContent.match(regex);

  if (!match) {
    console.error(`❌ README.md does not reference ${SCREENSHOT_NAME}`);
    process.exit(1);
  }

  console.log(`✅ README.md references ${match[1]}`);
  return match[1];
}

// --------------------
// Main
// --------------------
(function main() {
  try {
    const screenshotPathFromReadme = getScreenshotPathFromReadme();

    // Resolve relative paths safely
    const resolvedPath = path.resolve(process.cwd(), screenshotPathFromReadme);

    if (!fs.existsSync(resolvedPath)) {
      console.error(`❌ Referenced screenshot file does not exist: ${screenshotPathFromReadme}`);
      process.exit(1);
    }

    console.log(`✅ Screenshot file exists: ${screenshotPathFromReadme}`);
    process.exit(0);

  } catch (err) {
    console.error('❌ Unexpected error:', err);
    process.exit(1);
  }
})();


