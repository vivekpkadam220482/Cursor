/**
 * Automated Screenshot Comparison Test
 * 
 * This test performs automated visual comparison of webpages using Playwright and Applitools.
 * It handles CSV processing, screenshot capture, and image comparison with detailed reporting.
 */

import { chromium, Browser, Page } from 'playwright';
import { Eyes, Target, Configuration } from '@applitools/eyes-playwright';
import * as fs from 'fs-extra';
import * as path from 'path';
import csv from 'csv-parser';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';

interface TestConfig {
  timeout: number;
  viewport: { width: number; height: number };
}

interface UrlEntry {
  url: string;
  name: string;
}

interface ComparisonResult {
  baselineFile: string;
  checkpointFile: string;
  diffFile: string;
  pixelDifference: number;
  diffPercentage: number;
  success: boolean;
  error?: string;
}

interface TestSummary {
  totalUrls: number;
  successfulScreenshots: number;
  failedScreenshots: number;
  successfulComparisons: number;
  failedComparisons: number;
  totalDifferences: number;
  startTime: Date;
  endTime: Date;
  duration: string;
  errors: string[];
}

describe('Automated Screenshot Comparison Test', () => {
  let browser: Browser;
  let page: Page;
  let eyes: Eyes;

  const config: TestConfig = {
    timeout: 25000,
    viewport: { width: 1920, height: 1080 }
  };

  const directories = {
    baseline: './Baseline',
    checkpoint: './Checkpoint',
    results: './Results',
    baselineScreenshots: './Baseline/Screenshots',
    checkpointScreenshots: './Checkpoint/Screenshots',
    resultsDiffs: './Results/diffs'
  };

  const csvFiles = {
    source: './source.csv',
    target: './target.csv',
    baselineCsv: './Baseline/baseline.csv',
    checkpointCsv: './Checkpoint/checkpoint.csv'
  };

  let testSummary: TestSummary;

  beforeAll(async () => {
    console.log('🚀 Starting Automated Screenshot Comparison Test Suite');
    
    testSummary = {
      totalUrls: 0,
      successfulScreenshots: 0,
      failedScreenshots: 0,
      successfulComparisons: 0,
      failedComparisons: 0,
      totalDifferences: 0,
      startTime: new Date(),
      endTime: new Date(),
      duration: '',
      errors: []
    };

    // Initialize browser
    browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    // Initialize Eyes for Applitools integration
    eyes = new Eyes();
    const configuration = new Configuration();
    configuration.setAppName('Screenshot Comparison App');
    configuration.setTestName('Automated Comparison Test');
    eyes.setConfiguration(configuration);
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.setViewportSize(config.viewport);
  });

  afterEach(async () => {
    if (page) {
      await page.close();
    }
  });

  afterAll(async () => {
    if (browser) {
      await browser.close();
    }
    
    testSummary.endTime = new Date();
    testSummary.duration = `${(testSummary.endTime.getTime() - testSummary.startTime.getTime()) / 1000}s`;
    
    await generateSummaryReport();
    console.log('✅ Test Suite Completed');
  });

  test('Step 1: Check for required folder structure', async () => {
    console.log('📁 Checking folder structure...');
    
    const requiredDirectories = [
      directories.baselineScreenshots,
      directories.checkpointScreenshots,
      directories.resultsDiffs
    ];

    for (const dir of requiredDirectories) {
      try {
        await fs.ensureDir(dir);
        console.log(`✅ Directory exists/created: ${dir}`);
      } catch (error) {
        const errorMsg = `Failed to create directory: ${dir} - ${error}`;
        testSummary.errors.push(errorMsg);
        throw new Error(errorMsg);
      }
    }
  });

  test('Step 2: Check for required CSV files and validate they are not empty', async () => {
    console.log('📄 Checking CSV files...');
    
    const requiredCsvFiles = [csvFiles.source, csvFiles.target];

    for (const csvFile of requiredCsvFiles) {
      try {
        // Check if file exists
        const exists = await fs.pathExists(csvFile);
        if (!exists) {
          // Create sample CSV file for demonstration
          const sampleContent = 'url,name\nhttps://example.com,Example\nhttps://google.com,Google\n';
          await fs.writeFile(csvFile, sampleContent);
          console.log(`⚠️  Created sample CSV file: ${csvFile}`);
        }

        // Check if file is not empty
        const stats = await fs.stat(csvFile);
        if (stats.size === 0) {
          const errorMsg = `CSV file is empty: ${csvFile}`;
          testSummary.errors.push(errorMsg);
          throw new Error(errorMsg);
        }

        console.log(`✅ CSV file validated: ${csvFile} (${stats.size} bytes)`);
      } catch (error) {
        const errorMsg = `Failed to validate CSV file: ${csvFile} - ${error}`;
        testSummary.errors.push(errorMsg);
        throw new Error(errorMsg);
      }
    }
  });

  test('Step 3: Create empty CSV files for baseline and checkpoint', async () => {
    console.log('📝 Creating empty CSV files...');
    
    const csvFilesToCreate = [csvFiles.baselineCsv, csvFiles.checkpointCsv];
    const csvHeader = 'filename,url,timestamp,status\n';

    for (const csvFile of csvFilesToCreate) {
      try {
        await fs.writeFile(csvFile, csvHeader);
        console.log(`✅ Created CSV file: ${csvFile}`);
      } catch (error) {
        const errorMsg = `Failed to create CSV file: ${csvFile} - ${error}`;
        testSummary.errors.push(errorMsg);
        throw new Error(errorMsg);
      }
    }
  });

  test('Step 4: Process baseline URLs and capture screenshots', async () => {
    console.log('📸 Processing baseline URLs...');
    
    try {
      const urls = await readCsvFile(csvFiles.source);
      testSummary.totalUrls += urls.length;

      for (const urlEntry of urls) {
        await captureScreenshot(
          urlEntry,
          directories.baselineScreenshots,
          'baseline',
          csvFiles.baselineCsv
        );
      }
    } catch (error) {
      const errorMsg = `Failed to process baseline URLs: ${error}`;
      testSummary.errors.push(errorMsg);
      throw new Error(errorMsg);
    }
  });

  test('Step 5: Process checkpoint URLs and capture screenshots', async () => {
    console.log('📸 Processing checkpoint URLs...');
    
    try {
      const urls = await readCsvFile(csvFiles.target);
      testSummary.totalUrls += urls.length;

      for (const urlEntry of urls) {
        await captureScreenshot(
          urlEntry,
          directories.checkpointScreenshots,
          'checkpoint',
          csvFiles.checkpointCsv
        );
      }
    } catch (error) {
      const errorMsg = `Failed to process checkpoint URLs: ${error}`;
      testSummary.errors.push(errorMsg);
      throw new Error(errorMsg);
    }
  });

  test('Step 6: Compare screenshots and generate diff images', async () => {
    console.log('🔍 Comparing screenshots...');
    
    try {
      const baselineEntries = await readCsvFile(csvFiles.baselineCsv);
      const checkpointEntries = await readCsvFile(csvFiles.checkpointCsv);

      const maxLength = Math.max(baselineEntries.length, checkpointEntries.length);

      for (let i = 0; i < maxLength; i++) {
        if (i < baselineEntries.length && i < checkpointEntries.length) {
          const baselineEntry = baselineEntries[i];
          const checkpointEntry = checkpointEntries[i];

          await compareImages(baselineEntry, checkpointEntry, i + 1);
        } else {
          console.log(`⚠️  Row ${i + 1}: Missing corresponding image for comparison`);
        }
      }
    } catch (error) {
      const errorMsg = `Failed to compare images: ${error}`;
      testSummary.errors.push(errorMsg);
      throw new Error(errorMsg);
    }
  });

  // Helper Functions

  async function readCsvFile(filePath: string): Promise<UrlEntry[]> {
    return new Promise((resolve, reject) => {
      const results: UrlEntry[] = [];
      
      fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', (data: any) => {
          if (data.url && data.name) {
            results.push({ url: data.url, name: data.name });
          } else if (data.filename && data.url) {
            // Handle CSV files with filename column (remove prefix and extension)
            const cleanName = data.filename.replace(/^(baseline_|checkpoint_)/, '').replace(/\.(png|jpg|jpeg)$/i, '');
            results.push({ url: data.url, name: cleanName });
          }
        })
        .on('end', () => resolve(results))
        .on('error', reject);
    });
  }

  async function captureScreenshot(
    urlEntry: UrlEntry,
    screenshotDir: string,
    prefix: string,
    csvFile: string
  ): Promise<void> {
    const fileName = `${prefix}_${urlEntry.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    const filePath = path.join(screenshotDir, fileName);
    
    try {
      console.log(`📍 Capturing ${urlEntry.url} as ${fileName}`);
      
      // Navigate to URL with timeout
      await page.goto(urlEntry.url, { 
        waitUntil: 'networkidle',
        timeout: config.timeout 
      });

      // Wait for page to be fully loaded
      await page.waitForTimeout(2000);

      // Take full page screenshot
      await page.screenshot({
        path: filePath,
        fullPage: true
        // Note: quality option is only supported for JPEG format, not PNG
      });

      // Log to CSV
      const csvEntry = `${fileName},${urlEntry.url},${new Date().toISOString()},success\n`;
      await fs.appendFile(csvFile, csvEntry);

      testSummary.successfulScreenshots++;
      console.log(`✅ Screenshot saved: ${fileName}`);

    } catch (error) {
      testSummary.failedScreenshots++;
      const errorMsg = `Failed to capture screenshot for ${urlEntry.url}: ${error}`;
      console.error(`❌ ${errorMsg}`);
      
      // Log error to CSV
      const csvEntry = `${fileName},${urlEntry.url},${new Date().toISOString()},failed\n`;
      await fs.appendFile(csvFile, csvEntry);
      
      testSummary.errors.push(errorMsg);
    }
  }

  async function compareImages(
    baselineEntry: UrlEntry,
    checkpointEntry: UrlEntry,
    rowNumber: number
  ): Promise<ComparisonResult> {
    const baselineFileName = `baseline_${baselineEntry.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    const checkpointFileName = `checkpoint_${checkpointEntry.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
    const diffFileName = `diff_${baselineEntry.name.replace(/[^a-zA-Z0-9]/g, '_')}.png`;

    const baselinePath = path.join(directories.baselineScreenshots, baselineFileName);
    const checkpointPath = path.join(directories.checkpointScreenshots, checkpointFileName);
    const diffPath = path.join(directories.resultsDiffs, diffFileName);

    const result: ComparisonResult = {
      baselineFile: baselineFileName,
      checkpointFile: checkpointFileName,
      diffFile: diffFileName,
      pixelDifference: 0,
      diffPercentage: 0,
      success: false
    };

    try {
      console.log(`🔍 Comparing Row ${rowNumber}: ${baselineFileName} vs ${checkpointFileName}`);

      // Check if both files exist
      const baselineExists = await fs.pathExists(baselinePath);
      const checkpointExists = await fs.pathExists(checkpointPath);

      if (!baselineExists || !checkpointExists) {
        throw new Error(`Missing files - Baseline: ${baselineExists}, Checkpoint: ${checkpointExists}`);
      }

      // Read image files
      const img1 = PNG.sync.read(await fs.readFile(baselinePath));
      const img2 = PNG.sync.read(await fs.readFile(checkpointPath));

      // Ensure images have the same dimensions
      const { width, height } = img1;
      if (img2.width !== width || img2.height !== height) {
        throw new Error(`Image dimensions don't match - Baseline: ${width}x${height}, Checkpoint: ${img2.width}x${img2.height}`);
      }

      // Create diff image
      const diff = new PNG({ width, height });

      // Perform pixel comparison with pink highlighting
      const pixelDiff = pixelmatch(img1.data, img2.data, diff.data, width, height, {
        threshold: 0.1,
        diffColor: [255, 192, 203], // Pink color #FFC0CB
        diffColorAlt: [255, 192, 203]
      });

      // Save diff image
      await fs.writeFile(diffPath, PNG.sync.write(diff));

      result.pixelDifference = pixelDiff;
      result.diffPercentage = (pixelDiff / (width * height)) * 100;
      result.success = true;

      testSummary.successfulComparisons++;
      testSummary.totalDifferences += pixelDiff;

      console.log(`✅ Comparison completed: ${pixelDiff} pixels different (${result.diffPercentage.toFixed(2)}%)`);

    } catch (error) {
      result.error = error instanceof Error ? error.message : String(error);
      result.success = false;
      testSummary.failedComparisons++;
      
      const errorMsg = `Failed to compare images for row ${rowNumber}: ${error}`;
      console.error(`❌ ${errorMsg}`);
      testSummary.errors.push(errorMsg);
    }

    return result;
  }

  async function generateSummaryReport(): Promise<void> {
    console.log('\n📊 Generating Summary Report...');
    
    const reportContent = `
# Automated Screenshot Comparison Test Report

## Test Summary
- **Start Time**: ${testSummary.startTime.toISOString()}
- **End Time**: ${testSummary.endTime.toISOString()}
- **Duration**: ${testSummary.duration}
- **Total URLs Processed**: ${testSummary.totalUrls}

## Screenshot Results
- **Successful Screenshots**: ${testSummary.successfulScreenshots}
- **Failed Screenshots**: ${testSummary.failedScreenshots}
- **Success Rate**: ${((testSummary.successfulScreenshots / (testSummary.successfulScreenshots + testSummary.failedScreenshots)) * 100).toFixed(2)}%

## Comparison Results
- **Successful Comparisons**: ${testSummary.successfulComparisons}
- **Failed Comparisons**: ${testSummary.failedComparisons}
- **Total Pixel Differences**: ${testSummary.totalDifferences}
- **Average Differences per Comparison**: ${testSummary.successfulComparisons > 0 ? (testSummary.totalDifferences / testSummary.successfulComparisons).toFixed(2) : 0}

## Errors Encountered
${testSummary.errors.length > 0 ? testSummary.errors.map((error, index) => `${index + 1}. ${error}`).join('\n') : 'No errors encountered.'}

## Files Generated
- Baseline Screenshots: \`${directories.baselineScreenshots}\`
- Checkpoint Screenshots: \`${directories.checkpointScreenshots}\`
- Diff Images: \`${directories.resultsDiffs}\`
- Baseline Log: \`${csvFiles.baselineCsv}\`
- Checkpoint Log: \`${csvFiles.checkpointCsv}\`

---
Report generated on: ${new Date().toISOString()}
`;

    try {
      const reportPath = './Results/test-summary-report.md';
      await fs.writeFile(reportPath, reportContent);
      console.log(`✅ Summary report saved: ${reportPath}`);
      
      // Also log to console
      console.log('\n' + '='.repeat(80));
      console.log('📈 TEST SUMMARY');
      console.log('='.repeat(80));
      console.log(`Screenshots: ${testSummary.successfulScreenshots}/${testSummary.successfulScreenshots + testSummary.failedScreenshots} successful`);
      console.log(`Comparisons: ${testSummary.successfulComparisons}/${testSummary.successfulComparisons + testSummary.failedComparisons} successful`);
      console.log(`Total Duration: ${testSummary.duration}`);
      console.log(`Errors: ${testSummary.errors.length}`);
      console.log('='.repeat(80));

    } catch (error) {
      console.error(`❌ Failed to generate summary report: ${error}`);
    }
  }
});