# Automated Visual Testing with Applitools Eyes

This guide explains how to use the automated visual testing solution that leverages **Applitools Eyes** for AI-powered visual comparison, integrated with Playwright and TypeScript.

## Overview

The automated test performs comprehensive visual testing using Applitools Eyes by:

1. ✅ Validating environment and Applitools API key
2. ✅ Checking CSV input files for URLs to test
3. ✅ Establishing visual baselines using Applitools Eyes
4. ✅ Performing AI-powered visual comparisons against baselines
5. ✅ Generating comprehensive reports with Applitools dashboard links
6. ✅ Providing detailed statistics and error handling

## Prerequisites

### 1. Install Dependencies
```bash
npm install
```

### 2. Get Applitools API Key
1. Create a free account at [Applitools](https://applitools.com/)
2. Get your API key from the account settings
3. Set the environment variable:

**Windows:**
```bash
set APPLITOOLS_API_KEY=your_api_key_here
```

**Linux/Mac:**
```bash
export APPLITOOLS_API_KEY=your_api_key_here
```

**Or create a .env file:**
```
APPLITOOLS_API_KEY=your_api_key_here
```

## Directory Structure

The test will automatically create:

```
/Results/
  applitools-eyes-report.md  # Comprehensive test report with Applitools links
```

**Note:** With Applitools Eyes, screenshots and comparisons are managed in the cloud, so local storage directories are not needed!

## Input Files

### Required CSV Files

Create these files in the project root:

**source.csv** - URLs for baseline screenshots:
```csv
url,name
https://example.com,Example_Homepage
https://www.google.com,Google_Search
https://github.com,GitHub_Homepage
```

**target.csv** - URLs for checkpoint screenshots:
```csv
url,name
https://example.com,Example_Homepage
https://www.google.com,Google_Search
https://github.com,GitHub_Homepage
```

## Running the Test

### Option 1: Run the specific automated test
```bash
npm run test:automated
```

### Option 2: Run all tests
```bash
npm test
```

### Option 3: Run with debug output
```bash
npm run test:debug -- tests/automated-screenshot-comparison.test.ts
```

## Test Configuration

The test uses the following default configuration:

- **Timeout**: 60 seconds per webpage (increased for reliability)
- **Resolution**: 1920x1080 
- **Visual Testing**: Applitools Eyes AI-powered comparison
- **Full Page**: True
- **App Name**: "Automated Screenshot Comparison"
- **Batch Name**: "Automated Visual Testing Batch"
- **Test Timeout**: 3 minutes per test step

## Output Files

### Applitools Eyes Report
The test generates a comprehensive report at `./Results/applitools-eyes-report.md` containing:

- Test execution statistics
- Visual comparison results from Applitools Eyes
- Direct links to Applitools dashboard for each test
- Detailed match/mismatch/missing statistics
- Error logs and troubleshooting information

### Applitools Dashboard
- All visual comparisons are stored in your Applitools account
- Interactive visual diff tools available online
- Baseline management through the web interface
- Team collaboration features
- Historical test result tracking

## Visual Comparison Process

### Step 1: Baseline Establishment
- Reads URLs from `source.csv`
- Uses Applitools Eyes to capture and store baselines in the cloud
- Each baseline is associated with a specific test name

### Step 2: Visual Comparison
- Reads URLs from `target.csv`  
- Captures current state using Applitools Eyes
- AI-powered comparison against stored baselines
- Intelligent diff detection (layout, content, styling)

### Applitools Eyes Advantages:
- **AI-Powered**: Ignores irrelevant differences (anti-aliasing, minor rendering)
- **Smart Baselines**: Automatic baseline management and versioning
- **Cross-Browser**: Test across different browsers and devices
- **Dynamic Content**: Handle dates, ads, and dynamic content intelligently
- **Collaboration**: Share results with team members
- **Integration**: Works with CI/CD pipelines

## Error Handling

The test includes comprehensive error handling for:

- Missing directories (auto-created)
- Missing or empty CSV files
- Network timeouts during screenshot capture
- Image dimension mismatches
- File system errors
- Invalid URLs

All errors are logged to the console and included in the summary report.

## Test Results Interpretation

### Applitools Eyes Results
- **Passed**: Visual comparison matches the baseline
- **Failed**: Visual differences detected that require review
- **New**: First time running this test (creates baseline)
- **Missing**: Expected baseline not found

### Result Statistics
- **Matches**: Number of visual checkpoints that passed
- **Mismatches**: Number of visual differences detected  
- **Missing**: Number of missing baselines
- **Steps**: Total number of visual checkpoints performed

### Common Issues
1. **No API Key**: Set `APPLITOOLS_API_KEY` environment variable
2. **Timeout errors**: The timeout is now set to 60 seconds per page (increased from 25s for better reliability)
3. **Network errors**: Check URL accessibility and Applitools connectivity
4. **New baselines**: First run will create baselines (all tests show as "New")
5. **Slow sites**: For very slow-loading sites, you may need to increase the timeout further in the config

## Customization

### Modifying Configuration
Edit the `config` object in `tests/automated-screenshot-comparison.test.ts`:

```typescript
const config: TestConfig = {
  timeout: 60000,  // 60 seconds (increased for reliability)
  viewport: { width: 1920, height: 1080 }
};
```

### Adding More URLs
Simply add more rows to your `source.csv` and `target.csv` files:

```csv
url,name
https://example.com,Example_Homepage
https://newsite.com,New_Site
https://anothersite.com,Another_Site
```

### Applitools Configuration
Modify the Eyes configuration in the test file:

```typescript
const configuration = new Configuration();
configuration.setAppName('Your App Name');
configuration.setBatch({
  name: 'Your Batch Name',
  id: `batch-${Date.now()}`
});
configuration.setTestName('Your Test Name');
```

## Integration with CI/CD

The test can be integrated into CI/CD pipelines:

```yaml
# GitHub Actions example
- name: Run automated screenshot tests
  run: npm run test:automated
```

## Troubleshooting

### Common Commands
```bash
# Build the project
npm run build

# Install Playwright browsers
npm run install:playwright

# Run with verbose output
npm run test:debug

# Clean and rebuild
rm -rf dist/ && npm run build
```

### Log Levels
- Use `DEBUG=true npm run test:automated` for detailed logging
- Check `./Results/test-summary-report.md` for comprehensive results
- Review individual CSV files for screenshot status

## Support

For issues or questions:
1. Check the `applitools-eyes-report.md` for detailed results
2. Review console output for real-time feedback
3. Verify `APPLITOOLS_API_KEY` is properly set
4. Check your Applitools dashboard at https://applitools.com/
5. Verify input CSV file format and URL accessibility
6. Ensure all dependencies are properly installed

## Applitools Resources
- [Applitools Documentation](https://applitools.com/docs/)
- [Getting Started Guide](https://applitools.com/docs/getting-started/)
- [API Key Setup](https://applitools.com/docs/topics/overview/obtain-api-key.html)
- [Dashboard Guide](https://applitools.com/docs/topics/test-manager/)