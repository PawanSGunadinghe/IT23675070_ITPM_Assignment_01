# ITPM - Swift Translator Test Suite

## Project Description

**ITPM** is an automated end-to-end test suite for the **Swift Translator** application, a web-based tool that converts Singlish (Latin-scripted Sinhala) text to Sinhala Unicode script. This project uses **Playwright** for browser automation testing to validate the translator's functionality across various linguistic scenarios.

### What is Singlish?
Singlish is a romanized representation of the Sinhala language, commonly used in informal digital communication in Sri Lanka. The Swift Translator converts this Latin-scripted form into proper Sinhala Unicode characters.

### Application Under Test
- **Name:** Swift Translator
- **URL:** https://www.swifttranslator.com/
- **Purpose:** Real-time Singlish to Sinhala translation

## Test Coverage

The test suite includes **34 test cases** (24 positive + 10 negative scenarios):

### Positive Test Cases (Pos_Fun_0001 - Pos_Fun_0024)
- Short daily phrases and greetings
- Compound sentences
- Interrogative forms
- Imperative forms
- Day-to-day expressions
- Repeated word expressions
- Currency and time formats
- Missing spaces / joined words
- Request forms with politeness variations
- English technical/brand terms embedded in Singlish
- English abbreviations and short forms
- Places and common English words preservation
- Line breaks handling
- Slang and colloquial phrasing
- Complex sentences
- Long text (paragraph input)
- Mixed Sinhala + English sentences
- Formal sentences
- Greetings and repeated emphasis words

### Negative Test Cases (Neg_Fun_0001 - Neg_Fun_0010)
- Multiple consecutive spaces
- Punctuation mark handling
- Chat abbreviations mixed with Singlish
- Extremely long concatenated words
- Loss of accuracy in long conversational paragraphs
- Numbers-only input handling
- Complex joined words producing incorrect output
- Emoji input handling
- Multiple consecutive spaces
- Missing spaces with long compound words

## Project Structure

```
ITPM/
├── tests/
│   └── test.spec.js           # Main test file with all test cases
├── playwright.config.js        # Playwright configuration
├── package.json               # Project dependencies and scripts
├── playwright-report/         # Generated HTML test reports
├── test-results/             # Detailed test result logs
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

## Prerequisites

- **Node.js** (v16 or higher)
- **npm** (comes with Node.js)
- **Playwright** (automatically installed via npm)

## Installation & Setup

### 1. Clone or Download the Project
```bash
cd c:\Users\User\Downloads\ITPM
```

### 2. Install Dependencies
```bash
npm install
```

This command will:
- Install Playwright test framework
- Install necessary Node.js type definitions
- Set up all required dependencies

### 3. Verify Installation
```bash
npx playwright --version
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode (with browser UI)
```bash
npm run test:headed
```

### Run Tests with UI Mode (Interactive mode with trace viewer)
```bash
npm run test:ui
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```
This allows you to step through tests with the Playwright Inspector.

### Run Specific Test
```bash
npx playwright test test.spec.js -g "Pos_Fun_0001"
```

## Test Reports

### View HTML Report
After running tests, an interactive HTML report is generated:
```bash
npx playwright show-report
```

This will open the test report in your default browser showing:
- Test execution timeline
- Pass/fail status
- Test traces and screenshots
- Detailed error logs

### Test Results Location
- **HTML Report:** `playwright-report/index.html`
- **Test Details:** `test-results/` directory

## Configuration Details

### Playwright Configuration (`playwright.config.js`)

- **Test Directory:** `./tests`
- **Parallel Execution:** Enabled (runs tests concurrently)
- **Browsers:** Chromium (Firefox and Safari commented out for faster execution)
- **Reporter:** HTML reporter (generates interactive test report)
- **Trace:** Recorded on first retry for failed tests

### Environment-Specific Settings

**Local Development:**
- No retries
- Full parallel execution
- Immediate results

**CI/CD Environment:**
- 2 retries on failure
- Single worker execution
- Optimized for consistent results

## Test Helper Functions

### `translateAndGetOutput(page, input)`
Helper function that:
1. Navigates to the Swift Translator website
2. Waits for page load
3. Inputs Singlish text
4. Waits for real-time translation (2.5 seconds)
5. Extracts Sinhala output from the output panel
6. Returns the translated text

## Troubleshooting

### Tests Fail with Timeout Errors
- The translator may be slow or unavailable
- Solution: Increase timeout values in `translateAndGetOutput()` function
- Check network connectivity

### Elements Not Found
- The website structure may have changed
- Solution: Update selectors in the test helper function
- Use `npm run test:headed` to visually inspect elements

### Browser Compatibility Issues
- Different browsers may have different rendering
- Solution: Test in specific browser by enabling in `playwright.config.js`

### Installation Issues
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules`: `rm -r node_modules` (or `rmdir /s /q node_modules` on Windows)
- Reinstall: `npm install`

## Available npm Scripts

| Command | Purpose |
|---------|---------|
| `npm test` | Run all tests in headless mode |
| `npm run test:headed` | Run tests with visible browser window |
| `npm run test:ui` | Interactive UI mode with trace viewer |
| `npm run test:debug` | Debug mode with Playwright Inspector |

## Technology Stack

- **Playwright:** ^1.58.0 - Modern browser automation framework
- **Node.js:** Runtime environment
- **JavaScript:** Test scripting language

## Key Features

✅ Real-time translation testing  
✅ Comprehensive positive and negative test scenarios  
✅ HTML test reporting with detailed traces  
✅ Parallel test execution for faster results  
✅ Screenshot and trace capture on failures  
✅ Cross-browser support (Chromium by default)  
✅ Helper functions for cleaner test code  

## Test Execution Flow

1. **Navigate** → Go to Swift Translator website
2. **Wait** → Ensure page is fully loaded (networkidle)
3. **Input** → Enter Singlish text in the input field
4. **Translate** → Wait for real-time translation to complete
5. **Extract** → Get the Sinhala output from the results panel
6. **Assert** → Compare actual output with expected translation

## Contributing

When adding new tests:
1. Follow the existing test naming convention: `test('{Category}_Fun_{ID}: {Description}', ...)`
2. Use the `translateAndGetOutput()` helper function
3. Log input, expected, and actual output for debugging
4. Use meaningful test case categories (Pos_ for positive, Neg_ for negative)

## Support & Resources

- **Playwright Documentation:** https://playwright.dev/
- **Swift Translator:** https://www.swifttranslator.com/
- **Sinhala Language Resources:** Consult linguistic guides for Singlish romanization

## License

ISC

## Author

Created for ITPM (Interactive Test Project Management)

---

**Last Updated:** January 2026  
**Total Test Cases:** 34  
**Project Status:** Active
