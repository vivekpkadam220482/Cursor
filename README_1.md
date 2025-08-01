# 🎯 Playwright + Applitools Visual Testing Boilerplate

A complete, production-ready boilerplate for visual testing using **Playwright** and **Applitools Eyes SDK** in TypeScript. This setup provides comprehensive visual regression testing capabilities with cross-browser support, responsive design validation, and CI/CD integration.

## 📚 Table of Contents

- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Running Tests](#-running-tests)
- [Test Types](#-test-types)
- [Visual Grid Testing](#-visual-grid-testing)
- [CI/CD Integration](#-cicd-integration)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)

## 🚀 Features

- ✅ **Complete TypeScript Setup** - Full type safety and IntelliSense
- ✅ **Playwright Integration** - Modern browser automation
- ✅ **Applitools Eyes SDK** - AI-powered visual testing
- ✅ **Visual Grid Runner** - Cross-browser testing in the cloud
- ✅ **Jest Test Framework** - Comprehensive testing setup
- ✅ **Sample HTML Application** - Ready-to-use test target
- ✅ **Responsive Design Testing** - Multiple viewport configurations
- ✅ **Dark/Light Theme Testing** - UI state change validation
- ✅ **Modal Interaction Testing** - Dynamic content validation
- ✅ **Modular Architecture** - Reusable components and utilities
- ✅ **CI/CD Ready** - Environment-based configuration
- ✅ **Comprehensive Documentation** - Detailed setup and usage guides

## 📋 Prerequisites

Before getting started, ensure you have:

1. **Node.js** (v16 or higher)
2. **npm** or **yarn** package manager
3. **Applitools Account** - [Sign up for free](https://applitools.com/users/register)
4. **Applitools API Key** - [Get your API key](https://applitools.com/docs/topics/overview/obtain-api-key.html)

## 🏃‍♂️ Quick Start

### 1. Install Dependencies

```bash
# Install all dependencies
npm install

# Install Playwright browsers
npm run install:playwright

# Build TypeScript
npm run build
```

### 2. Configure Applitools

Create a `.env` file in the project root:

```bash
# Copy the example file
cp .env.example .env
```

Edit `.env` and add your Applitools API key:

```env
APPLITOOLS_API_KEY=your_applitools_api_key_here
APPLITOOLS_BATCH_NAME=Visual Testing Demo
DEBUG=false
```

### 3. Run Your First Test

```bash
# Run basic visual tests
npm run test:basic

# Or run all tests
npm test
```

### 4. View Results

After running tests, check your [Applitools Dashboard](https://eyes.applitools.com/) to see the results.

## 📁 Project Structure

```
playwright-applitools-visual-testing/
├── src/
│   ├── sample-page/          # Sample HTML application
│   │   ├── index.html        # Main HTML page
│   │   ├── styles.css        # CSS styling
│   │   └── script.js         # Interactive JavaScript
│   └── utils/
│       └── test-helpers.ts   # Reusable test utilities
├── tests/
│   ├── setup.ts              # Jest setup configuration
│   ├── basic-visual.test.ts  # Basic visual testing examples
│   ├── advanced-visual.test.ts # Advanced testing scenarios
│   └── visual-grid.test.ts   # Cross-browser grid testing
├── applitools.config.js      # Applitools configuration
├── jest.config.js            # Jest configuration
├── tsconfig.json             # TypeScript configuration
├── package.json              # Project dependencies and scripts
└── README.md                 # This file
```

## ⚙️ Configuration

### Applitools Configuration

The main configuration is in `applitools.config.js`. You can customize:

- **API Key**: Your Applitools API key
- **Server URL**: For private cloud instances
- **Batch Settings**: Test organization
- **Browser Matrix**: Which browsers/devices to test
- **Match Levels**: How strict visual comparisons should be

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `APPLITOOLS_API_KEY` | Your Applitools API key | **Required** |
| `APPLITOOLS_BATCH_NAME` | Name for test batches | "Visual Testing Demo" |
| `APPLITOOLS_BATCH_ID` | Unique batch identifier | Auto-generated |
| `APPLITOOLS_SERVER_URL` | Custom server URL | Applitools cloud |
| `APPLITOOLS_BRANCH_NAME` | Git branch name | Current branch |
| `DEBUG` | Enable debug logging | false |

### Browser Matrix

The default browser matrix includes:

**Desktop Browsers:**
- Chrome (1200x800, 1920x1080, 1366x768)
- Firefox (1200x800)
- Safari (1200x800)
- Edge (1200x800)

**Mobile Devices:**
- iPhone 11, iPhone 14 Pro, iPhone 5/SE
- Samsung Galaxy S5, Galaxy Note 2
- iPad Pro, iPad Air 2

## 🧪 Running Tests

### Test Scripts

```bash
# Run all tests
npm test

# Run specific test types
npm run test:basic      # Basic visual tests
npm run test:advanced   # Advanced scenarios
npm run test:grid       # Visual Grid cross-browser tests

# Debug mode with verbose output
npm run test:debug

# Build project
npm run build

# Complete setup (install + build)
npm run setup
```

### Individual Test Execution

```bash
# Run a specific test file
npx jest tests/basic-visual.test.ts

# Run tests matching a pattern
npx jest --testNamePattern="theme toggle"

# Run tests in watch mode
npx jest --watch
```

## 🧪 Test Types

### 1. Basic Visual Tests (`basic-visual.test.ts`)

**Purpose:** Demonstrate core Applitools functionality

**Features:**
- Page load validation
- Theme toggle testing
- Modal interaction testing
- Proper Eyes session management

**Example:**
```typescript
test('should capture initial page load', async () => {
  await eyes.open(page, 'Demo App', 'Page Load Test');
  await eyes.check('Initial Load', Target.window().fully());
  const results = await eyes.close();
});
```

### 2. Advanced Visual Tests (`advanced-visual.test.ts`)

**Purpose:** Complex scenarios and best practices

**Features:**
- Multi-step workflows
- Element-specific testing
- Custom match levels
- Ignore regions
- Accessibility testing
- Responsive design validation

**Example:**
```typescript
test('should perform comprehensive UI workflow', async () => {
  await eyes.open(page, 'Demo App', 'Complex Workflow');
  
  // Multiple checkpoints with different configurations
  await eyes.check('Header', Target.region('.header').matchLevel(MatchLevel.Layout));
  await eyes.check('Full Page', Target.window().fully().ignoreRegions('.dynamic-content'));
  
  const results = await eyes.close();
});
```

### 3. Visual Grid Tests (`visual-grid.test.ts`)

**Purpose:** Cross-browser testing at scale

**Features:**
- Visual Grid Runner integration
- Multiple browser/device testing
- Parallel test execution
- Batch result analysis
- Cloud-based rendering

**Example:**
```typescript
const runner = new VisualGridRunner({ testConcurrency: 5 });
const eyes = new Eyes(runner);

// Configure multiple browsers and devices
configuration.addBrowser(1200, 800, BrowserType.CHROME);
configuration.addDeviceEmulation(DeviceName.iPhone_12);

// Tests run across all configured environments
await eyes.check('Cross Browser', Target.window().fully());
```

## 🌐 Visual Grid Testing

The Visual Grid allows you to test across multiple browsers and devices without running multiple browser instances locally.

### Benefits

- **Faster Execution**: Parallel testing in the cloud
- **Resource Efficient**: No local browser overhead
- **Comprehensive Coverage**: Test on browsers you don't have locally
- **Consistent Environment**: Standardized rendering conditions

### Configuration

```typescript
// Configure Visual Grid Runner
const runner = new VisualGridRunner({ testConcurrency: 5 });
const eyes = new Eyes(runner);

// Add multiple browser configurations
configuration.addBrowser(1200, 800, BrowserType.CHROME);
configuration.addBrowser(1200, 800, BrowserType.FIREFOX);
configuration.addBrowser(1200, 800, BrowserType.SAFARI);
configuration.addDeviceEmulation(DeviceName.iPhone_12);

// Get aggregated results
const allResults = await runner.getAllTestResults();
```

## 🚀 CI/CD Integration

### GitHub Actions Example

```yaml
name: Visual Tests
on: [push, pull_request]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: |
          npm ci
          npx playwright install
      
      - name: Run visual tests
        env:
          APPLITOOLS_API_KEY: ${{ secrets.APPLITOOLS_API_KEY }}
          APPLITOOLS_BATCH_NAME: "CI Build ${{ github.run_number }}"
          APPLITOOLS_BRANCH_NAME: ${{ github.ref_name }}
        run: npm test
```

### Environment Setup

Set these secrets in your CI/CD platform:

- `APPLITOOLS_API_KEY`: Your Applitools API key
- `APPLITOOLS_BATCH_NAME`: Descriptive batch name
- `APPLITOOLS_BRANCH_NAME`: Git branch for baseline management

## 📖 Best Practices

### 1. Test Organization

- **Group Related Tests**: Use describe blocks to organize tests
- **Descriptive Names**: Use clear, descriptive test and checkpoint names
- **Consistent Naming**: Follow naming conventions across tests

### 2. Visual Checkpoints

- **Strategic Placement**: Place checkpoints at key UI states
- **Meaningful Names**: Use descriptive checkpoint names
- **Appropriate Scope**: Use full page vs. region captures appropriately

### 3. Error Handling

```typescript
afterEach(async () => {
  try {
    const results = await eyes.close(false);
    console.log(`Test completed: ${results?.getStatus()}`);
  } catch (error) {
    console.error('Test error:', error);
  } finally {
    await eyes.abortIfNotClosed();
    await page?.close();
  }
});
```

### 4. Configuration Management

- **Environment Variables**: Use environment variables for configuration
- **Default Values**: Provide sensible defaults
- **Validation**: Validate configuration before running tests

### 5. Performance Optimization

- **Parallel Execution**: Use Visual Grid for cross-browser testing
- **Selective Testing**: Run appropriate tests for each environment
- **Resource Management**: Properly close browsers and sessions

## 🔧 Troubleshooting

### Common Issues

#### 1. "APPLITOOLS_API_KEY is not set"

**Solution:** Ensure your API key is properly configured:

```bash
# Check if the environment variable is set
echo $APPLITOOLS_API_KEY

# Set it temporarily
export APPLITOOLS_API_KEY="your_api_key_here"

# Or add to .env file
echo "APPLITOOLS_API_KEY=your_api_key_here" >> .env
```

#### 2. "No tests found"

**Solution:** Ensure Jest can find your test files:

```bash
# Check test file patterns
npx jest --listTests

# Run with explicit pattern
npx jest tests/**/*.test.ts
```

#### 3. "Browser download failed"

**Solution:** Install Playwright browsers:

```bash
npx playwright install
# Or install specific browsers
npx playwright install chromium firefox webkit
```

#### 4. "Eyes session timeout"

**Solution:** Increase test timeout in Jest configuration:

```javascript
// jest.config.js
module.exports = {
  testTimeout: 60000, // 60 seconds
  // ... other config
};
```

#### 5. "File not found" errors

**Solution:** Check file paths in tests:

```typescript
// Use absolute paths
const htmlPath = path.resolve(__dirname, '../src/sample-page/index.html');
const fileUrl = `file://${htmlPath}`;
```

### Debug Mode

Enable debug mode for detailed logging:

```bash
DEBUG=true npm test
```

### Verbose Test Output

Run tests with verbose output:

```bash
npm run test:debug
```

## 📈 Advanced Usage

### Custom Match Levels

```typescript
// Strict matching (default)
await eyes.check('Strict', Target.window().matchLevel(MatchLevel.Strict));

// Layout matching (ignores colors and text)
await eyes.check('Layout', Target.window().matchLevel(MatchLevel.Layout));

// Content matching (ignores colors)
await eyes.check('Content', Target.window().matchLevel(MatchLevel.Content));
```

### Ignore Regions

```typescript
// Ignore dynamic content
await eyes.check(
  'With Ignores',
  Target.window()
    .ignoreRegions('.timestamp', '.user-id')
    .ignoreRegions(new Region(0, 0, 100, 50))
);
```

### Responsive Testing

```typescript
const viewports = [
  { width: 320, height: 568 },   // Mobile
  { width: 768, height: 1024 },  // Tablet
  { width: 1200, height: 800 },  // Desktop
];

for (const viewport of viewports) {
  await page.setViewportSize(viewport);
  await eyes.check(`Responsive ${viewport.width}x${viewport.height}`, Target.window().fully());
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/playwright-applitools-visual-testing.git

# Install dependencies
npm install

# Run tests
npm test

# Build project
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Playwright](https://playwright.dev/) - Modern browser automation
- [Applitools](https://applitools.com/) - AI-powered visual testing
- [Jest](https://jestjs.io/) - JavaScript testing framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript

## 📞 Support

- 📖 [Documentation](https://applitools.com/docs)
- 💬 [Community Forum](https://applitools.com/community)
- 🐛 [Issue Tracker](https://github.com/your-repo/issues)
- 📧 [Email Support](mailto:support@applitools.com)

---

**Happy Visual Testing! 🎯👁️**