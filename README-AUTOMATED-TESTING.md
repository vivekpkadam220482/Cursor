# Automated Screenshot Comparison Testing

This guide explains how to use the automated screenshot comparison test that was created using Playwright, Applitools, and TypeScript.

## Overview

The automated test performs comprehensive visual comparison testing by:

1. ✅ Checking required folder structure
2. ✅ Validating CSV input files
3. ✅ Creating output CSV tracking files
4. ✅ Capturing baseline screenshots from URLs
5. ✅ Capturing checkpoint screenshots from URLs
6. ✅ Performing pixel-by-pixel image comparison
7. ✅ Generating diff images with pink highlighting
8. ✅ Creating detailed summary reports

## Prerequisites

Make sure you have all dependencies installed:

```bash
npm install
```

## Required File Structure

The test will automatically create the following directory structure:

```
/Baseline/
  /Screenshots/    # Baseline screenshot storage
  baseline.csv     # Baseline screenshot log
/Checkpoint/
  /Screenshots/    # Checkpoint screenshot storage  
  checkpoint.csv   # Checkpoint screenshot log
/Results/
  /diffs/          # Diff image storage
  test-summary-report.md  # Final summary report
```

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

- **Timeout**: 25 seconds per webpage
- **Resolution**: 1920x1080 
- **Screenshot Quality**: 100%
- **Diff Color**: Pink (#FFC0CB)
- **Full Page**: True

## Output Files

### Screenshots
- **Baseline**: `./Baseline/Screenshots/baseline_<webpagename>.png`
- **Checkpoint**: `./Checkpoint/Screenshots/checkpoint_<webpagename>.png`
- **Diff Images**: `./Results/diffs/diff_<webpagename>.png`

### CSV Logs
- **Baseline Log**: `./Baseline/baseline.csv`
- **Checkpoint Log**: `./Checkpoint/checkpoint.csv`

Format:
```csv
filename,url,timestamp,status
baseline_Example_Homepage.png,https://example.com,2023-10-20T10:30:00.000Z,success
```

### Summary Report
The test generates a comprehensive markdown report at `./Results/test-summary-report.md` containing:

- Test execution statistics
- Screenshot capture results  
- Image comparison results
- Error logs
- File locations

## Image Comparison

The test performs row-by-row comparison:
- Row 1 of baseline.csv ↔ Row 1 of checkpoint.csv
- Row 2 of baseline.csv ↔ Row 2 of checkpoint.csv
- And so on...

Differences are highlighted in **pink** (#FFC0CB) and saved as diff images.

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

### Success Metrics
- **Screenshots**: Number of successfully captured images
- **Comparisons**: Number of successful pixel comparisons
- **Differences**: Total pixel differences found

### Common Issues
1. **Timeout errors**: Increase timeout in test configuration
2. **Dimension mismatches**: Ensure consistent viewport settings
3. **Network errors**: Check URL accessibility
4. **File permission errors**: Ensure write permissions to output directories

## Customization

### Modifying Configuration
Edit the `config` object in `tests/automated-screenshot-comparison.test.ts`:

```typescript
const config: TestConfig = {
  timeout: 25000,  // 25 seconds
  viewport: { width: 1920, height: 1080 },
  screenshotQuality: 100
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

### Custom Diff Colors
Modify the `pixelmatch` options in the `compareImages` function:

```typescript
diffColor: [255, 192, 203], // Pink
diffColorAlt: [255, 0, 0]   // Red alternative
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
1. Check the summary report for detailed error information
2. Review console output for real-time feedback
3. Verify input CSV file format and URL accessibility
4. Ensure all dependencies are properly installed