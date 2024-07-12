import { FullResult, Reporter, TestCase, TestResult } from '@playwright/test/reporter';
import fs from 'fs';

class CustomReporter implements Reporter {
  private results: { test: string, status: string, error?: string }[] = [];

  onTestEnd(test: TestCase, result: TestResult) {
    const status = result.status;
    const title = test.title;
    const error = result.error?.message;

    this.results.push({
      test: title,
      status: status,
      error: error,
    });
  }

  async onEnd(result: FullResult) {
    const reportFile = 'test-results.json';
    fs.writeFileSync(reportFile, JSON.stringify(this.results, null, 2), 'utf-8');
    console.log(`Report saved to ${reportFile}`);
  }
}

export default CustomReporter;
