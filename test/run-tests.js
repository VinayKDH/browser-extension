#!/usr/bin/env node

/**
 * Node.js Test Runner for AIML Gyan Browser Extension
 * This script runs basic validation tests without requiring a browser
 */

const fs = require('fs');
const path = require('path');

class NodeTestRunner {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      total: 0,
      details: []
    };
  }

  async runTests() {
    console.log('🧪 Running Node.js validation tests for AIML Gyan Extension');
    console.log('='.repeat(60));

    await this.testFileStructure();
    await this.testManifestValidation();
    await this.testJavaScriptSyntax();
    await this.testHTMLValidation();
    await this.testDependencies();

    this.printResults();
  }

  async testFileStructure() {
    await this.runTest('File Structure', async () => {
      const requiredFiles = [
        'manifest.json',
        'background.js',
        'content.js',
        'popup.html',
        'popup.js',
        'options.html',
        'options.js'
      ];

      const missingFiles = [];
      for (const file of requiredFiles) {
        if (!fs.existsSync(path.join(__dirname, '..', file))) {
          missingFiles.push(file);
        }
      }

      if (missingFiles.length > 0) {
        throw new Error(`Missing required files: ${missingFiles.join(', ')}`);
      }

      return true;
    });
  }

  async testManifestValidation() {
    await this.runTest('Manifest Validation', async () => {
      const manifestPath = path.join(__dirname, '..', 'manifest.json');
      const manifestContent = fs.readFileSync(manifestPath, 'utf8');
      
      let manifest;
      try {
        manifest = JSON.parse(manifestContent);
      } catch (error) {
        throw new Error(`Invalid JSON in manifest.json: ${error.message}`);
      }

      // Check required fields
      const requiredFields = ['manifest_version', 'name', 'version', 'action'];
      for (const field of requiredFields) {
        if (!manifest[field]) {
          throw new Error(`Missing required field: ${field}`);
        }
      }

      // Check manifest version
      if (manifest.manifest_version !== 3) {
        throw new Error('Manifest version must be 3');
      }

      // Check permissions
      if (!manifest.permissions || !Array.isArray(manifest.permissions)) {
        throw new Error('Permissions must be an array');
      }

      // Check host permissions
      if (!manifest.host_permissions || !Array.isArray(manifest.host_permissions)) {
        throw new Error('Host permissions must be an array');
      }

      // Verify AIML Gyan is in host permissions
      const aimlGyanPermission = manifest.host_permissions.find(p => 
        p.includes('aimlgyan.com') || p === '<all_urls>'
      );
      if (!aimlGyanPermission) {
        throw new Error('Host permissions must include aimlgyan.com or <all_urls>');
      }

      return true;
    });
  }

  async testJavaScriptSyntax() {
    await this.runTest('JavaScript Syntax', async () => {
      const jsFiles = [
        'background.js',
        'content.js',
        'popup.js',
        'options.js'
      ];

      for (const file of jsFiles) {
        const filePath = path.join(__dirname, '..', file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Basic syntax check - try to parse as JavaScript
        try {
          // This is a very basic check - in production you might want to use a proper JS parser
          if (content.includes('function') || content.includes('const') || content.includes('let') || content.includes('var')) {
            // Basic validation that it looks like JavaScript
            continue;
          } else {
            throw new Error(`File ${file} doesn't appear to contain valid JavaScript`);
          }
        } catch (error) {
          throw new Error(`Error parsing ${file}: ${error.message}`);
        }
      }

      return true;
    });
  }

  async testHTMLValidation() {
    await this.runTest('HTML Validation', async () => {
      const htmlFiles = [
        'popup.html',
        'options.html'
      ];

      for (const file of htmlFiles) {
        const filePath = path.join(__dirname, '..', file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Basic HTML validation
        if (!content.includes('<!DOCTYPE html>') && !content.includes('<html')) {
          throw new Error(`File ${file} doesn't appear to be valid HTML`);
        }

        if (!content.includes('</html>')) {
          throw new Error(`File ${file} appears to be missing closing html tag`);
        }
      }

      return true;
    });
  }

  async testDependencies() {
    await this.runTest('Dependencies', async () => {
      const packagePath = path.join(__dirname, '..', 'package.json');
      
      if (fs.existsSync(packagePath)) {
        const packageContent = fs.readFileSync(packagePath, 'utf8');
        let packageJson;
        
        try {
          packageJson = JSON.parse(packageContent);
        } catch (error) {
          throw new Error(`Invalid JSON in package.json: ${error.message}`);
        }

        // Check for required fields
        if (!packageJson.name || !packageJson.version) {
          throw new Error('package.json missing required fields (name, version)');
        }
      }

      return true;
    });
  }

  async runTest(testName, testFunction) {
    try {
      const result = await testFunction();
      this.results.passed++;
      this.results.total++;
      this.results.details.push({ name: testName, status: 'PASS', error: null });
      console.log(`✅ ${testName}: PASSED`);
      return true;
    } catch (error) {
      this.results.failed++;
      this.results.total++;
      this.results.details.push({ name: testName, status: 'FAIL', error: error.message });
      console.log(`❌ ${testName}: FAILED - ${error.message}`);
      return false;
    }
  }

  printResults() {
    console.log('\n' + '=' .repeat(60));
    console.log('📊 NODE.JS TEST RESULTS SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total Tests: ${this.results.total}`);
    console.log(`Passed: ${this.results.passed}`);
    console.log(`Failed: ${this.results.failed}`);
    console.log(`Success Rate: ${((this.results.passed / this.results.total) * 100).toFixed(1)}%`);
    
    if (this.results.failed > 0) {
      console.log('\n❌ FAILED TESTS:');
      this.results.details
        .filter(test => test.status === 'FAIL')
        .forEach(test => {
          console.log(`  - ${test.name}: ${test.error}`);
        });
    }
    
    console.log('\n' + '=' .repeat(60));
    console.log('💡 Next Steps:');
    console.log('1. Fix any failed tests above');
    console.log('2. Load the extension in your browser');
    console.log('3. Open test/test.html to run browser-specific tests');
    console.log('4. Follow the testing guide in TESTING_GUIDE.md');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  const runner = new NodeTestRunner();
  runner.runTests().catch(console.error);
}

module.exports = NodeTestRunner;
