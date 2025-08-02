<<<<<<< HEAD
# 🎯 Playwright + Applitools Visual Testing Project

A complete, production-ready boilerplate for visual regression testing that combines **Playwright** browser automation with **Applitools Eyes SDK** for AI-powered visual testing. This project provides comprehensive visual testing capabilities with cross-browser support, responsive design validation, and CI/CD integration.

## 📋 Table of Contents

- [Project Purpose](#-project-purpose)
- [Features](#-features) 
- [Framework and Technical Details](#-framework-and-technical-details)
- [Applitools Configuration](#-applitools-configuration)
- [Prerequisites](#-prerequisites)
- [Quick Start](#-quick-start)
- [Project Structure](#-project-structure)
- [Configuration](#-configuration)
- [Setup Scripts Details](#-setup-scripts-details)
- [Testing Capabilities](#-testing-capabilities)
- [Running Tests](#-running-tests)
- [Script Files Summary](#-script-files-summary)
- [Test Types](#-test-types)
- [CI/CD Integration](#-cicd-integration)
- [Best Practices](#-best-practices)
- [Troubleshooting](#-troubleshooting)

## 🎯 Project Purpose

This is a **complete boilerplate for visual regression testing** that combines modern browser automation with AI-powered visual testing. The project serves as a production-ready foundation for implementing automated UI testing across multiple browsers and devices, ensuring visual consistency and catching regressions before they reach production.

### Key Objectives:
- Provide a ready-to-use visual testing framework
- Demonstrate best practices for visual regression testing
- Enable cross-browser and cross-device testing at scale
- Integrate seamlessly with CI/CD pipelines
- Offer comprehensive documentation and examples

## 🚀 Features

### ✅ Core Features
- **Complete TypeScript Setup** - Full type safety and IntelliSense support
- **Playwright Integration** - Modern browser automation with cross-browser support
- **Applitools Eyes SDK** - AI-powered visual testing with intelligent diff detection
- **Visual Grid Runner** - Cross-browser testing in the cloud with parallel execution
- **Jest Test Framework** - Comprehensive testing setup with TypeScript integration
- **Sample HTML Application** - Feature-rich demo page for testing scenarios

### ✅ Testing Capabilities
- **Responsive Design Testing** - Multiple viewport configurations and device emulation
- **Dark/Light Theme Testing** - UI state change validation and theme switching
- **Modal Interaction Testing** - Dynamic content and overlay validation
- **Automated Screenshot Comparison** - CSV-driven batch testing workflows
- **Cross-Browser Validation** - Chrome, Firefox, Safari, and Edge testing
- **Mobile Device Testing** - iPhone, iPad, and Android device emulation

### ✅ Advanced Features
- **Modular Architecture** - Reusable components and utilities
- **Environment-Based Configuration** - Multi-environment support
- **API Key Management** - Secure credential handling and runtime injection
- **Comprehensive Documentation** - Detailed setup guides and examples
- **CI/CD Ready** - GitHub Actions integration and pipeline templates

## 🔧 Framework and Technical Details

### Primary Technology Stack
- **Browser Automation**: Playwright (v1.37.1) - Modern, fast, and reliable
- **Visual Testing**: Applitools Eyes SDK (@applitools/eyes-playwright v1.20.2)
- **Programming Language**: TypeScript with JavaScript support
- **Testing Framework**: Jest (v29.6.4) with TypeScript integration
- **Build System**: TypeScript compiler with Babel preprocessing

### Key Dependencies
```json
{
  "dependencies": {
    "@applitools/eyes-playwright": "^1.20.2",
    "@playwright/test": "^1.37.1",
    "playwright": "^1.37.1",
    "expect-playwright": "^0.8.0"
  },
  "devDependencies": {
    "jest": "^29.6.4",
    "typescript": "^5.2.2",
    "ts-jest": "^29.1.1",
    "@types/jest": "^29.5.5",
    "@types/node": "^20.6.0",
    "dotenv": "^17.2.1",
    "csv-parser": "^3.2.0",
    "pixelmatch": "^7.1.0",
    "pngjs": "^7.0.0"
  }
}
```

### Development Tools
- **TypeScript Configuration**: ES2022 target with strict mode
- **Babel Integration**: JavaScript preprocessing and transformation
- **Jest Setup**: Custom test environment with TypeScript support
- **Path Mapping**: Convenient imports with `@/` and `@tests/` aliases
- **Source Maps**: Full debugging support for TypeScript

## ⚙️ Applitools Configuration

### Default Browser Matrix
The project includes comprehensive browser and device coverage:

**Desktop Browsers:**
- Chrome: 1200x800, 1920x1080, 1366x768, 1024x768
- Firefox: 1200x800
- Safari: 1200x800
- Edge: 1200x800

**Mobile Devices:**
- iPhone 11, iPhone 14 Pro, iPhone 5/SE
- Samsung Galaxy S5, Galaxy Note 2
- iPad Pro, iPad Air 2

### Visual Grid Settings
- **Test Concurrency**: 5 parallel tests (configurable)
- **Match Level**: Strict (configurable to Layout/Content)
- **Screenshot Mode**: Full page with CSS stitching
- **Wait Time**: 1000ms before captures for stability

### Environment Variables
| Variable | Description | Default |
|----------|-------------|---------|
| `APPLITOOLS_API_KEY` | Your Applitools API key | **Required** |
| `APPLITOOLS_BATCH_NAME` | Name for test batches | "Visual Testing Demo" |
| `APPLITOOLS_BATCH_ID` | Unique batch identifier | Auto-generated |
| `APPLITOOLS_SERVER_URL` | Custom server URL | Applitools cloud |
| `APPLITOOLS_BRANCH_NAME` | Git branch name | Current branch |
| `APPLITOOLS_CONCURRENCY` | Parallel test count | 5 |
| `APPLITOOLS_MATCH_LEVEL` | Comparison strictness | Strict |
| `DEBUG` | Enable debug logging | false |

## 📋 Prerequisites

Before getting started, ensure you have:

### System Requirements
1. **Node.js** (v16 or higher) - [Download Node.js](https://nodejs.org/)
2. **npm** or **yarn** package manager
3. **Git** for version control

### Applitools Account Setup
1. **Applitools Account** - [Sign up for free](https://applitools.com/users/register)
2. **Applitools API Key** - [Get your API key](https://applitools.com/docs/topics/overview/obtain-api-key.html)

### Optional Tools
- **Visual Studio Code** with TypeScript and Jest extensions
- **Chrome DevTools** for debugging
- **Git client** for version control

## 🏃‍♂️ Quick Start

### 1. Clone and Install
```bash
# Clone the repository
git clone <repository-url>
cd playwright-applitools-visual-testing

# Install dependencies and setup project
npm run setup
```

### 2. Configure Applitools
```bash
# Create environment file
cp .env.example .env

# Edit .env file and add your API key
APPLITOOLS_API_KEY=your_applitools_api_key_here
APPLITOOLS_BATCH_NAME=Visual Testing Demo
DEBUG=false
```

### 3. Run Your First Test
```bash
# Run basic visual tests
npm run test:basic

# Or run example tests to get started
npm run test:example

# Run all tests
npm test
```

### 4. View Results
Check your [Applitools Dashboard](https://eyes.applitools.com/) to see the visual test results and comparisons.

## 📁 Project Structure

```
playwright-applitools-visual-testing/
├── src/
│   ├── sample-page/              # Sample HTML application
│   │   ├── index.html           # Feature-rich demo page
│   │   ├── styles.css           # Responsive CSS with themes
│   │   └── script.js            # Interactive JavaScript
│   └── utils/
│       ├── test-helpers.ts      # Reusable test utilities
│       └── applitools-runtime-config.ts # Runtime configuration
├── tests/
│   ├── setup.ts                 # Jest setup configuration
│   ├── basic-visual.test.ts     # Basic visual testing examples
│   ├── advanced-visual.test.ts  # Advanced testing scenarios
│   ├── visual-grid.test.ts      # Cross-browser grid testing
│   ├── automated-screenshot-comparison.test.ts # CSV-driven testing
│   ├── example.test.ts          # Getting started examples
│   └── runtime-config-example.test.ts # Dynamic configuration
├── scripts/
│   ├── setup.js                 # Project setup and management
│   └── run-with-api-key.js      # API key management utility
├── configuration files
│   ├── applitools.config.js     # Applitools configuration
│   ├── jest.config.js           # Jest testing framework
│   ├── babel.config.js          # Babel preprocessing
│   └── tsconfig.json            # TypeScript configuration
├── package.json                 # Dependencies and scripts
├── .env.example                 # Environment template
└── README.md                    # This documentation
```

## ⚙️ Configuration

### Applitools Configuration (`applitools.config.js`)
The main configuration file provides:
- API key management with multiple sources
- Browser matrix definitions
- Visual Grid Runner settings
- Match level configurations
- Accessibility testing settings

### Jest Configuration (`jest.config.js`)
Test framework setup includes:
- TypeScript and JavaScript transformation
- Test timeout settings (60 seconds)
- Coverage reporting configuration
- Module path mapping
- Setup files integration

### TypeScript Configuration (`tsconfig.json`)
Compiler settings feature:
- ES2022 target with modern features
- Strict type checking enabled
- Source map generation
- Path aliases for convenient imports
- Declaration file generation

### Environment Configuration (`.env`)
Environment variables for:
- Applitools API credentials
- Batch and branch management
- Debug and logging settings
- Custom server configurations

## 🛠️ Setup Scripts Details

### Main Setup Script (`scripts/setup.js`)
**Purpose**: Comprehensive project initialization and management

**Key Features**:
- **Environment Validation**: Node.js version (v16+), npm availability, API key checks
- **Project Setup**: Dependency installation, Playwright browser downloads, TypeScript compilation
- **Configuration Management**: .env file creation, template processing
- **Test Execution**: Multiple test type support with colored output
- **Error Handling**: Comprehensive error reporting and cleanup

**Usage Commands**:
```bash
node scripts/setup.js setup          # Full project initialization
node scripts/setup.js validate       # Environment validation only
node scripts/setup.js test:basic     # Run basic visual tests
node scripts/setup.js test:advanced  # Run advanced scenarios
node scripts/setup.js test:grid      # Run cross-browser tests
```

### API Key Management Script (`scripts/run-with-api-key.js`)
**Purpose**: Secure API key management for test execution

**Features**:
- **Command Line Integration**: Accepts `--apiKey=value` or `--apiKey value` format
- **Environment Setup**: Automatic environment variable configuration
- **Process Management**: Cross-platform child process spawning
- **Batch Management**: Auto-generated batch names and IDs
- **Signal Handling**: Proper cleanup on interruption

**Usage Examples**:
```bash
node scripts/run-with-api-key.js --apiKey=abc123 npm test
node scripts/run-with-api-key.js --apiKey=abc123 npm run test:basic
node scripts/run-with-api-key.js --apiKey=abc123 npx jest specific-test.ts
```

## 🧪 Testing Capabilities

### Visual Validation Types
1. **Page Load Testing** - Initial UI state capture and baseline establishment
2. **Theme Change Testing** - Dark/light mode transitions and style validation  
3. **Modal State Testing** - Before/after interaction states and overlay handling
4. **Responsive Testing** - Multiple viewport validations and device emulation
5. **Cross-Browser Testing** - Multi-browser rendering comparison and compatibility
6. **Accessibility Testing** - WCAG 2.1 AA compliance validation

### Advanced Testing Features
- **Ignore Regions** - Skip dynamic content areas (timestamps, user IDs, ads)
- **Custom Match Levels** - Flexible comparison strictness (Strict, Layout, Content)
- **Element-Specific Testing** - Target specific UI components or regions
- **Batch Management** - Organized test result grouping and tracking
- **Baseline Management** - Automatic baseline creation and version control

### Sample Application Features
The included sample page provides testing scenarios for:
- **Header Navigation** - Multi-link navigation bar with hover states
- **Feature Cards** - Grid layout with hover effects and responsive behavior
- **Interactive Buttons** - Theme toggle and modal triggers with animations
- **Modal Dialog** - Overlay with backdrop, focus handling, and close functionality
- **Responsive Design** - Mobile-first responsive layout with breakpoints

## 🧪 Running Tests

### NPM Scripts
```bash
# Project Setup
npm run setup                    # Complete project setup
npm run build                    # Compile TypeScript
npm run install:playwright       # Install browser binaries

# Test Execution
npm test                         # Run all tests
npm run test:basic              # Basic visual validation
npm run test:advanced           # Complex scenarios
npm run test:grid               # Cross-browser Visual Grid testing
npm run test:example            # Getting started examples
npm run test:automated          # CSV-driven screenshot comparison
npm run test:debug              # Verbose output mode

# API Key Integration
npm run test:with-key           # Run with inline API key
npm run test:basic-with-key     # Basic tests with API key
npm run test:all-with-key       # Full suite with API key
```

### Individual Test Execution
```bash
# Run specific test file
npx jest tests/basic-visual.test.ts

# Run tests matching pattern
npx jest --testNamePattern="theme toggle"

# Run tests in watch mode
npx jest --watch

# Run with custom timeout
npx jest --testTimeout=90000
```

### Debug Mode
```bash
# Enable detailed logging
DEBUG=true npm test

# Run specific test with debug output
npm run test:debug -- tests/advanced-visual.test.ts

# Verbose Jest output
npx jest --verbose --detectOpenHandles
```

## 📄 Script Files Summary

### JavaScript Files (.js)
1. **`applitools.config.js`** (4.3KB, 133 lines) - Comprehensive Applitools configuration
2. **`babel.config.js`** (130B, 9 lines) - Babel preprocessing configuration
3. **`jest.config.js`** (675B, 25 lines) - Jest test framework setup
4. **`scripts/setup.js`** (8.6KB, 321 lines) - Project setup and management
5. **`scripts/run-with-api-key.js`** (3.5KB, 124 lines) - API key runtime management
6. **`src/sample-page/script.js`** (2.7KB, 82 lines) - Interactive demo functionality

### TypeScript Files (.ts)
1. **`src/utils/applitools-runtime-config.ts`** (5.5KB, 190 lines) - Runtime configuration utilities
2. **`src/utils/test-helpers.ts`** (10KB, 353 lines) - Reusable test helper functions
3. **`tests/setup.ts`** (1.2KB, 34 lines) - Jest test environment setup
4. **`tests/basic-visual.test.ts`** (11KB, 302 lines) - Basic visual testing examples
5. **`tests/advanced-visual.test.ts`** (14KB, 369 lines) - Advanced testing scenarios
6. **`tests/visual-grid.test.ts`** (15KB, 386 lines) - Cross-browser grid testing
7. **`tests/automated-screenshot-comparison.test.ts`** (15KB, 474 lines) - CSV-driven testing
8. **`tests/example.test.ts`** (4.9KB, 159 lines) - Getting started examples
9. **`tests/runtime-config-example.test.ts`** (7.4KB, 213 lines) - Dynamic configuration examples

**Total**: 15 script files (6 JavaScript, 9 TypeScript) providing comprehensive testing coverage and utilities.

## 🧪 Test Types

### 1. Basic Visual Tests (`basic-visual.test.ts`)
**Purpose**: Demonstrate core Applitools functionality and basic visual validation

**Features**:
- Page load validation and baseline establishment
- Theme toggle testing with state change detection
- Modal interaction testing with overlay validation
- Proper Eyes session management and cleanup

**Example**:
```typescript
test('should capture initial page load', async () => {
  await eyes.open(page, 'Demo App', 'Page Load Test');
  await eyes.check('Initial Load', Target.window().fully());
  const results = await eyes.close();
});
```

### 2. Advanced Visual Tests (`advanced-visual.test.ts`)
**Purpose**: Complex scenarios and best practices implementation

**Features**:
- Multi-step workflows with checkpoint validation
- Element-specific testing with custom selectors
- Custom match levels for different content types
- Ignore regions for dynamic content handling
- Accessibility testing with WCAG compliance
- Responsive design validation across viewports

**Example**:
```typescript
test('should perform comprehensive UI workflow', async () => {
  await eyes.open(page, 'Demo App', 'Complex Workflow');
  
  // Multiple checkpoints with different configurations
  await eyes.check('Header', Target.region('.header').matchLevel(MatchLevel.Layout));
  await eyes.check('Full Page', Target.window().fully().ignoreRegions('.timestamp'));
  
  const results = await eyes.close();
});
```

### 3. Visual Grid Tests (`visual-grid.test.ts`)
**Purpose**: Cross-browser testing at scale using Applitools Visual Grid

**Features**:
- Visual Grid Runner integration for cloud-based rendering
- Multiple browser and device testing configurations
- Parallel test execution with configurable concurrency
- Batch result analysis and reporting
- Cloud-based rendering for consistent environments

**Example**:
```typescript
const runner = new VisualGridRunner({ testConcurrency: 5 });
const eyes = new Eyes(runner);

// Configure multiple browsers and devices
configuration.addBrowser(1200, 800, BrowserType.CHROME);
configuration.addDeviceEmulation(DeviceName.iPhone_12);

// Tests run across all configured environments
await eyes.check('Cross Browser', Target.window().fully());
```

### 4. Automated Screenshot Comparison (`automated-screenshot-comparison.test.ts`)
**Purpose**: CSV-driven batch testing for large-scale URL validation

**Features**:
- CSV file input processing for source and target URLs
- Automated baseline establishment and comparison
- Comprehensive reporting with Applitools dashboard links
- Error handling and timeout management
- Batch processing with progress tracking

### 5. Example Tests (`example.test.ts`)
**Purpose**: Getting started guide and simple examples

**Features**:
- Simple page load validation
- Basic screenshot capture
- Minimal configuration examples
- Step-by-step learning progression

### 6. Runtime Configuration Tests (`runtime-config-example.test.ts`)
**Purpose**: Dynamic configuration and environment-specific testing

**Features**:
- Runtime configuration modification
- Environment-based test execution
- Dynamic browser matrix configuration
- Conditional test execution based on environment

## 🚀 CI/CD Integration

### GitHub Actions Configuration
```yaml
name: Visual Tests
on: [push, pull_request]

jobs:
  visual-tests:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        test-type: [basic, advanced, grid]
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: |
          npm ci
          npx playwright install
      
      - name: Run visual tests
        env:
          APPLITOOLS_API_KEY: ${{ secrets.APPLITOOLS_API_KEY }}
          APPLITOOLS_BATCH_NAME: "CI Build ${{ github.run_number }}"
          APPLITOOLS_BRANCH_NAME: ${{ github.ref_name }}
          APPLITOOLS_BATCH_ID: "${{ github.sha }}-${{ matrix.test-type }}"
        run: npm run test:${{ matrix.test-type }}
```

### Environment Setup for CI/CD
Set these secrets in your CI/CD platform:
- `APPLITOOLS_API_KEY`: Your Applitools API key
- `APPLITOOLS_BATCH_NAME`: Descriptive batch name with build info
- `APPLITOOLS_BRANCH_NAME`: Git branch for baseline management

### Branch-Based Testing Strategy
- **Main Branch**: Stable baselines for production comparisons
- **Feature Branches**: Compare against main branch baselines
- **Pull Requests**: Isolated testing with temporary baselines

## 📖 Best Practices

### 1. Test Organization and Structure
- **Group Related Tests**: Use `describe` blocks to organize test suites logically
- **Descriptive Names**: Use clear, descriptive test and checkpoint names
- **Consistent Naming**: Follow naming conventions across all test files
- **Modular Design**: Extract common functionality into reusable utilities

### 2. Visual Checkpoint Strategy
- **Strategic Placement**: Place checkpoints at key UI states and transitions
- **Meaningful Names**: Use descriptive checkpoint names that explain what's being tested
- **Appropriate Scope**: Choose between full page and region captures based on needs
- **State Validation**: Capture before and after states for interactive elements

### 3. Error Handling and Cleanup
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
- **Environment Variables**: Use environment variables for all configuration
- **Default Values**: Provide sensible defaults for optional settings
- **Validation**: Validate configuration before running tests
- **Documentation**: Document all configuration options clearly

### 5. Performance Optimization
- **Parallel Execution**: Use Visual Grid for cross-browser testing
- **Selective Testing**: Run appropriate tests for each environment
- **Resource Management**: Properly close browsers and sessions
- **Timeout Settings**: Configure appropriate timeouts for different test types

### 6. Baseline Management
- **Consistent Environments**: Use consistent test environments for baselines
- **Branch Strategy**: Maintain separate baselines for different branches
- **Review Process**: Implement baseline review process for changes
- **Backup Strategy**: Consider baseline backup and versioning

## 🔧 Troubleshooting

### Common Issues and Solutions

#### 1. "APPLITOOLS_API_KEY is not set"
**Problem**: Missing or incorrect API key configuration

**Solutions**:
```bash
# Check if environment variable is set
echo $APPLITOOLS_API_KEY

# Set temporarily (Unix/Mac)
export APPLITOOLS_API_KEY="your_api_key_here"

# Set temporarily (Windows)
set APPLITOOLS_API_KEY=your_api_key_here

# Add to .env file
echo "APPLITOOLS_API_KEY=your_api_key_here" >> .env

# Use API key script
node scripts/run-with-api-key.js --apiKey=your_key npm test
```

#### 2. "No tests found" or Test Discovery Issues
**Problem**: Jest cannot find test files

**Solutions**:
```bash
# List discoverable tests
npx jest --listTests

# Run with explicit pattern
npx jest tests/**/*.test.ts

# Check Jest configuration
npx jest --showConfig

# Verify test file naming convention
ls tests/*.test.ts
```

#### 3. "Browser download failed" or Playwright Issues
**Problem**: Playwright browsers not properly installed

**Solutions**:
```bash
# Install all Playwright browsers
npx playwright install

# Install specific browsers
npx playwright install chromium firefox webkit

# Check browser installation
npx playwright install --help

# Clear and reinstall
rm -rf ~/.cache/ms-playwright && npx playwright install
```

#### 4. "Eyes session timeout" or Connection Issues
**Problem**: Network timeouts or slow responses

**Solutions**:
```javascript
// Increase test timeout in Jest configuration
module.exports = {
  testTimeout: 120000, // 2 minutes
  // ... other config
};

// Increase page timeout in tests
await page.setDefaultTimeout(60000);

// Configure Applitools timeout
eyes.setWaitBeforeScreenshots(2000);
```

#### 5. "File not found" or Path Issues
**Problem**: Incorrect file paths in tests

**Solutions**:
```typescript
// Use absolute paths
const htmlPath = path.resolve(__dirname, '../src/sample-page/index.html');
const fileUrl = `file://${htmlPath}`;

// Check current working directory
console.log('CWD:', process.cwd());

// Use path aliases (configured in tsconfig.json)
import { helper } from '@/utils/test-helpers';
```

#### 6. Visual Differences in Tests
**Problem**: Unexpected visual differences detected

**Solutions**:
- **Review Applitools Dashboard**: Check highlighted differences
- **Update Baselines**: Accept legitimate changes through dashboard
- **Adjust Match Levels**: Use appropriate match levels for content type
- **Configure Ignore Regions**: Exclude dynamic content areas
- **Check Browser Versions**: Ensure consistent browser versions
- **Validate Test Environment**: Confirm consistent testing conditions

### Debug Mode and Logging

#### Enable Debug Output
```bash
# Enable detailed logging
DEBUG=true npm test

# Applitools debug mode
APPLITOOLS_SHOW_LOGS=true npm test

# Jest verbose output
npm run test:debug

# Specific test with debug
DEBUG=true npx jest tests/basic-visual.test.ts --verbose
```

#### Log Analysis
- Check console output for detailed error messages
- Review generated reports in `./Results/` directory
- Examine Applitools dashboard for visual comparison details
- Verify network connectivity to Applitools services

### Performance Optimization

#### Slow Test Execution
```bash
# Reduce test concurrency
APPLITOOLS_CONCURRENCY=2 npm test

# Run specific test types
npm run test:basic  # Instead of npm test

# Disable unnecessary features
APPLITOOLS_SAVE_DEBUG_SCREENSHOTS=false npm test
```

#### Memory Issues
```bash
# Increase Node.js memory limit
node --max-old-space-size=4096 node_modules/.bin/jest

# Run tests in sequence
npx jest --runInBand

# Clean up resources
npm run build  # Rebuild TypeScript
rm -rf dist/ node_modules/.cache/
```

### Getting Help
- 📖 [Applitools Documentation](https://applitools.com/docs)
- 💬 [Community Forum](https://applitools.com/community)
- 🐛 [GitHub Issues](https://github.com/your-repo/issues)
- 📧 [Support Email](mailto:support@applitools.com)
- 🎯 [Playwright Documentation](https://playwright.dev/)

---

**Happy Visual Testing! 🎯👁️**

This comprehensive README provides everything needed to understand, set up, and use this visual testing framework effectively. For additional help or specific use cases, refer to the detailed documentation in individual test files and configuration comments.
=======
# 🎯 Playwright + Applitools Visual Testing Project Summary

## **Project Purpose**
This is a **complete boilerplate for visual regression testing** that combines **Playwright** browser automation with **Applitools Eyes SDK** for AI-powered visual testing. The project provides a production-ready setup for automated UI testing across multiple browsers and devices.

## **Core Framework & Technologies**

### **Primary Stack**
- **Framework**: Playwright (v1.37.1) - Modern browser automation
- **Visual Testing**: Applitools Eyes SDK (@applitools/eyes-playwright v1.20.2)
- **Language**: TypeScript with JavaScript support
- **Testing Framework**: Jest (v29.6.4) with TypeScript integration
- **Build Tool**: TypeScript compiler with Babel preprocessing

### **Key Dependencies**
- **Testing**: Jest, @playwright/test, expect-playwright
- **Development**: TypeScript, ts-jest, babel-jest
- **Utilities**: dotenv (environment management), fs-extra (file operations)
- **Image Processing**: pixelmatch, pngjs (for screenshot comparison)

## **Project Structure**

### **Configuration Files**
- `applitools.config.js` - Comprehensive Applitools configuration with browser matrix
- `jest.config.js` - Jest testing framework configuration  
- `babel.config.js` - Babel preprocessing for TypeScript
- `tsconfig.json` - TypeScript compiler configuration

### **Application Code**
- `src/sample-page/` - Sample HTML application for testing
  - `index.html` - Feature-rich demo page with navigation, cards, modals
  - `styles.css` - Responsive CSS with dark/light theme support
  - `script.js` - Interactive features (theme toggle, modal functionality)

### **Test Suite**
- `tests/basic-visual.test.ts` - Core visual testing examples
- `tests/advanced-visual.test.ts` - Complex scenarios & best practices  
- `tests/visual-grid.test.ts` - Cross-browser cloud testing
- `tests/automated-screenshot-comparison.test.ts` - Screenshot comparison workflows
- `tests/example.test.ts` - Getting started examples
- `tests/runtime-config-example.test.ts` - Dynamic configuration examples

### **Utility Files**
- `src/utils/test-helpers.ts` - Reusable test utilities and helpers
- `src/utils/applitools-runtime-config.ts` - Runtime configuration management

## **Setup Scripts Details**

### **Main Setup Script** (`scripts/setup.js`)
**Purpose**: Comprehensive project initialization and management

**Key Features**:
```javascript
// Environment validation
- Checks Node.js version (v16+ required)
- Validates npm availability
- Verifies Applitools API key configuration

// Project setup
- Installs npm dependencies
- Downloads Playwright browsers
- Builds TypeScript code
- Creates .env configuration file

// Test execution
- Supports multiple test types (basic, advanced, grid)
- Provides colored console output
- Handles error reporting and cleanup
```

**Usage Commands**:
- `node scripts/setup.js setup` - Full project initialization
- `node scripts/setup.js validate` - Environment validation
- `node scripts/setup.js test:basic` - Run basic visual tests
- `node scripts/setup.js test:grid` - Run cross-browser tests

### **API Key Management Script** (`scripts/run-with-api-key.js`)
**Purpose**: Secure API key management for test execution

**Features**:
```javascript
// Command line API key injection
- Accepts --apiKey=value or --apiKey value format
- Sets environment variables automatically
- Auto-generates batch names and IDs

// Process management
- Spawns child processes for test execution
- Handles cross-platform compatibility (Windows/Unix)
- Provides proper signal handling and cleanup
```

## **Applitools Configuration**

### **Browser Matrix** (Default Testing Environments)
```javascript
Desktop Browsers:
- Chrome: 1200x800, 1920x1080, 1366x768, 1024x768
- Firefox: 1200x800
- Safari: 1200x800  
- Edge: 1200x800

Mobile Devices:
- iPhone 11, Galaxy S5, iPad Pro
```

### **Visual Grid Settings**
- **Test Concurrency**: 5 parallel tests
- **Match Level**: Strict (configurable to Layout/Content)
- **Screenshot Mode**: Full page with CSS stitching
- **Wait Time**: 1000ms before captures

### **Environment Variables**
```bash
APPLITOOLS_API_KEY=required          # Your API key
APPLITOOLS_BATCH_NAME=optional       # Test batch name
APPLITOOLS_BRANCH_NAME=optional      # Git branch
APPLITOOLS_CONCURRENCY=5             # Parallel test count
APPLITOOLS_MATCH_LEVEL=Strict        # Comparison strictness
```

## **NPM Scripts Overview**

### **Build & Setup**
- `npm run build` - Compile TypeScript
- `npm run setup` - Complete project setup
- `npm run install:playwright` - Install browser binaries

### **Test Execution**
- `npm test` - Run all tests
- `npm run test:basic` - Basic visual validation
- `npm run test:advanced` - Complex scenarios
- `npm run test:grid` - Cross-browser testing
- `npm run test:debug` - Verbose output mode

### **API Key Integration**
- `npm run test:with-key` - Run with inline API key
- `npm run test:basic-with-key` - Basic tests with API key
- `npm run test:all-with-key` - Full suite with API key

## **Sample Application Features**

### **UI Components Tested**
- **Header Navigation** - Multi-link navigation bar
- **Feature Cards** - Grid layout with hover effects  
- **Interactive Buttons** - Theme toggle and modal triggers
- **Modal Dialog** - Overlay with backdrop and close functionality
- **Responsive Design** - Mobile-first responsive layout

### **Interactive Features**
- **Dark/Light Theme Toggle** - CSS class-based theme switching
- **Modal Management** - Show/hide with proper focus handling
- **Animation Effects** - Button feedback and transitions

## **Testing Capabilities**

### **Visual Validation Types**
1. **Page Load Testing** - Initial UI state capture
2. **Theme Change Testing** - Dark/light mode comparison  
3. **Modal State Testing** - Before/after interaction states
4. **Responsive Testing** - Multiple viewport validations
5. **Cross-Browser Testing** - Multi-browser rendering comparison

### **Advanced Features**
- **Ignore Regions** - Skip dynamic content areas
- **Custom Match Levels** - Flexible comparison strictness
- **Accessibility Testing** - WCAG 2.1 AA compliance checks
- **Batch Management** - Organized test result grouping

## **CI/CD Integration**

The project is designed for seamless CI/CD integration with:
- **GitHub Actions** support with example workflows
- **Environment-based configuration** for different deployment stages
- **Branch-based baseline management** for feature development
- **Automated batch naming** with timestamps and build numbers

## **Script Files Summary**

### **JavaScript Files (.js)**
1. `applitools.config.js` - Applitools configuration (4.3KB, 133 lines)
2. `babel.config.js` - Babel configuration (130B, 9 lines)
3. `jest.config.js` - Jest test configuration (675B, 25 lines)
4. `scripts/run-with-api-key.js` - API key runtime script (3.5KB, 124 lines)
5. `scripts/setup.js` - Setup script (8.6KB, 321 lines)
6. `src/sample-page/script.js` - Sample page script (2.7KB, 82 lines)

### **TypeScript Files (.ts)**
1. `src/utils/applitools-runtime-config.ts` - Runtime configuration utilities (5.5KB, 190 lines)
2. `src/utils/test-helpers.ts` - Test helper functions (10KB, 353 lines)
3. `tests/setup.ts` - Test setup configuration (1.2KB, 34 lines)
4. `tests/visual-grid.test.ts` - Visual grid tests (15KB, 386 lines)
5. `tests/advanced-visual.test.ts` - Advanced visual tests (14KB, 369 lines)
6. `tests/automated-screenshot-comparison.test.ts` - Screenshot comparison tests (15KB, 474 lines)
7. `tests/basic-visual.test.ts` - Basic visual tests (11KB, 302 lines)
8. `tests/example.test.ts` - Example tests (4.9KB, 159 lines)
9. `tests/runtime-config-example.test.ts` - Runtime configuration example tests (7.4KB, 213 lines)

**Total**: 15 script files (6 JavaScript, 9 TypeScript)

This project serves as a comprehensive template for implementing visual regression testing in any web application development workflow.
>>>>>>> a653cda9775a0ae1f0cd9e971495e79868f139fc
