# Applitools API Key Configuration Methods

This project supports multiple methods to provide your Applitools API key without using `.env` files. Here are all the available options:

## 🚀 Quick Start

Choose any of the methods below based on your preference and use case.

## 📋 Method 1: Command Line Arguments

### Using the helper script:
```bash
# Basic test with API key
node scripts/run-with-api-key.js --apiKey=YOUR_API_KEY npm run test:basic

# Advanced test with API key
node scripts/run-with-api-key.js --apiKey=YOUR_API_KEY npm run test:advanced

# All tests with API key
node scripts/run-with-api-key.js --apiKey=YOUR_API_KEY npm test
```

### Using npm scripts:
```bash
# Run basic tests (replace YOUR_API_KEY with your actual key)
npm run test:basic-with-key --apikey=YOUR_API_KEY

# Run advanced tests
npm run test:advanced-with-key --apikey=YOUR_API_KEY

# Run visual grid tests
npm run test:grid-with-key --apikey=YOUR_API_KEY

# Run all tests
npm run test:all-with-key --apikey=YOUR_API_KEY
```

### Direct command line:
```bash
# Pass API key directly to jest
npx jest tests/basic-visual.test.ts -- --apiKey=YOUR_API_KEY
```

## 🌍 Method 2: Environment Variables

### Windows PowerShell:
```powershell
$env:APPLITOOLS_API_KEY="YOUR_API_KEY"
npm test
```

### Windows Command Prompt:
```cmd
set APPLITOOLS_API_KEY=YOUR_API_KEY
npm test
```

### macOS/Linux:
```bash
export APPLITOOLS_API_KEY="YOUR_API_KEY"
npm test
```

### One-time execution:
```bash
# Windows PowerShell
$env:APPLITOOLS_API_KEY="YOUR_API_KEY"; npm test

# macOS/Linux
APPLITOOLS_API_KEY="YOUR_API_KEY" npm test
```

## ⚡ Method 3: Runtime Configuration (TypeScript)

Use this method when you want to configure the API key programmatically in your test files:

```typescript
import { setApplitoolsConfig, createConfiguredEyes } from '../src/utils/applitools-runtime-config';

// Set configuration at runtime
setApplitoolsConfig({
  apiKey: 'YOUR_API_KEY',
  appName: 'My Custom App',
  batchName: 'Custom Batch Name',
  branchName: 'feature-branch'
});

// Use the configured Eyes instance
const eyes = createConfiguredEyes();
```

### Example test file with runtime configuration:
```typescript
import { test, expect } from '@playwright/test';
import { setApplitoolsConfig, createConfiguredEyes } from '../src/utils/applitools-runtime-config';

test.beforeAll(async () => {
  setApplitoolsConfig({
    apiKey: 'YOUR_API_KEY', // Get this from your secure source
    appName: 'My Test App',
    batchName: 'Runtime Configuration Test'
  });
});

test('visual test with runtime config', async ({ page }) => {
  const eyes = createConfiguredEyes();
  
  await page.goto('your-url');
  await eyes.open(page, 'App Name', 'Test Name');
  await eyes.check('Checkpoint', Target.window().fully());
  await eyes.close();
});
```

## 🔒 Method 4: GitHub Actions Secrets (CI/CD)

The project is already configured to use GitHub secrets. To set up:

1. Go to your GitHub repository
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Click **New repository secret**
4. Name: `APPLITOOLS_API_KEY`
5. Value: Your Applitools API key
6. Click **Add secret**

The GitHub Actions workflow will automatically use this secret.

## 🛠️ Method 5: Direct Configuration (Not Recommended for Production)

For development or testing purposes only, you can modify the `applitools.config.js` file directly:

```javascript
module.exports = {
  // ONLY for development - never commit real API keys!
  apiKey: 'YOUR_API_KEY', // Remove this line before committing
  
  // Rest of configuration...
};
```

**⚠️ Warning:** Never commit actual API keys to version control!

## 🔍 Verification Methods

### Check if API key is available:
```typescript
import { validateApiKeyAvailability, getApiKeyFromAnywhere } from '../src/utils/applitools-runtime-config';

if (validateApiKeyAvailability()) {
  console.log('✅ API key is available');
  console.log('API key source:', getApiKeyFromAnywhere());
} else {
  console.log('❌ No API key found');
}
```

### Get comprehensive configuration:
```typescript
import { getComprehensiveConfig } from '../src/utils/applitools-runtime-config';

const config = getComprehensiveConfig();
if (config) {
  console.log('Current configuration:', config);
} else {
  console.log('No configuration available');
}
```

## 📦 Priority Order

The system checks for API keys in this order:

1. **Runtime configuration** (set via `setApplitoolsConfig()`)
2. **Command line arguments** (`--apiKey=value`)
3. **Environment variables** (`APPLITOOLS_API_KEY`)

## 🔧 Troubleshooting

### Common Issues:

1. **"API key not found" error:**
   - Verify your API key is correct
   - Check that you're using the right method for your environment
   - Ensure no typos in environment variable names

2. **Tests skip visual validation:**
   - This happens when no API key is detected
   - Tests will run functional assertions only
   - Check the console output for guidance

3. **Command line parsing issues:**
   - Ensure proper format: `--apiKey=value` (no spaces around =)
   - Use quotes if your API key contains special characters

### Getting Your API Key:

1. Sign up/log in to [Applitools](https://applitools.com/)
2. Go to your account settings
3. Find the "API Key" section
4. Copy your API key

For more information, visit: https://applitools.com/docs/topics/overview/obtain-api-key.html

## 🎯 Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for local development
3. **Use GitHub secrets** for CI/CD pipelines
4. **Use runtime configuration** for programmatic control
5. **Keep API keys secure** and don't share them publicly

## 📞 Support

If you encounter any issues with API key configuration, please check:

1. Your API key is valid and active
2. You have sufficient Applitools plan quota
3. Your network allows connections to `https://eyesapi.applitools.com`

For additional help, refer to the [Applitools documentation](https://applitools.com/docs/).