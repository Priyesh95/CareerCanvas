#!/usr/bin/env node

/**
 * Test script for CareerCanvas Cloudflare Worker
 *
 * Usage:
 *   node test-worker.js https://your-worker-url.workers.dev
 *   npm run test:worker
 */

const WORKER_URL = process.argv[2] || 'https://careercanvas-worker.your-subdomain.workers.dev';

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

const { green, red, yellow, blue, cyan, gray, reset } = colors;

// Sample resume data for testing
const SAMPLE_RESUME = `John Doe
Software Engineer
john.doe@email.com
+1-555-123-4567
San Francisco, CA
https://linkedin.com/in/johndoe
https://github.com/johndoe

Professional Summary:
Experienced software engineer with 5+ years in full-stack web development.

Skills:
JavaScript, React, Node.js, Python, AWS, Docker, PostgreSQL, MongoDB

Work Experience:

Senior Software Engineer at Tech Corp
Jan 2020 - Present
San Francisco, CA
- Led team of 5 engineers in building scalable web applications
- Increased system performance by 40% through optimization
- Implemented CI/CD pipeline reducing deployment time by 60%
- Architected microservices handling 1M+ requests daily

Software Engineer at StartupXYZ
Jun 2018 - Dec 2019
Palo Alto, CA
- Developed REST APIs serving millions of users
- Built responsive frontend using React and Redux
- Reduced page load time by 50%

Projects:

E-Commerce Platform
Built a full-stack e-commerce platform with React, Node.js, and MongoDB. Supports payment processing, inventory management, and real-time analytics.
Technologies: React, Node.js, MongoDB, Stripe

Task Manager App
Created a productivity app using React Native for iOS and Android. Features include push notifications, offline sync, and collaborative task lists.
Technologies: React Native, Firebase, Redux

Education:

Bachelor of Science in Computer Science
Stanford University
Stanford, CA
2018
GPA: 3.8`;

// Helper functions
function log(message, color = '') {
  console.log(`${color}${message}${reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, green);
}

function logError(message) {
  log(`✗ ${message}`, red);
}

function logInfo(message) {
  log(`ℹ ${message}`, blue);
}

function logSection(title) {
  console.log('');
  log(`${'='.repeat(60)}`, cyan);
  log(title, cyan);
  log(`${'='.repeat(60)}`, cyan);
}

function logSubSection(title) {
  console.log('');
  log(`--- ${title} ---`, yellow);
}

async function testHealthCheck() {
  logSubSection('Test 1: Health Check');

  try {
    logInfo(`Fetching: ${WORKER_URL}/`);
    const response = await fetch(`${WORKER_URL}/`);
    const data = await response.json();

    if (response.ok && data.status === 'online') {
      logSuccess('Health check passed');
      log(`Status: ${data.status}`, gray);
      log(`Service: ${data.service}`, gray);
      log(`Version: ${data.version}`, gray);
      return true;
    } else {
      logError('Health check failed');
      console.log(data);
      return false;
    }
  } catch (error) {
    logError(`Health check error: ${error.message}`);
    return false;
  }
}

async function testParseResume() {
  logSubSection('Test 2: Parse Resume');

  try {
    logInfo(`Parsing sample resume (${SAMPLE_RESUME.length} characters)...`);

    const startTime = Date.now();
    const response = await fetch(`${WORKER_URL}/api/parse-resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText: SAMPLE_RESUME })
    });
    const duration = Date.now() - startTime;

    const data = await response.json();

    if (response.ok && data.success) {
      logSuccess(`Resume parsed successfully (${duration}ms)`);

      // Validate parsed data
      const { personal, about, skills, experience, projects, education } = data.data;

      log('', gray);
      log('📋 Extracted Data:', blue);
      log(`  Name: ${personal.name || 'N/A'}`, gray);
      log(`  Title: ${personal.title || 'N/A'}`, gray);
      log(`  Email: ${personal.email || 'N/A'}`, gray);
      log(`  Phone: ${personal.phone || 'N/A'}`, gray);
      log(`  Skills: ${skills.length} found`, gray);
      log(`  Experience: ${experience.length} positions`, gray);
      log(`  Projects: ${projects.length} projects`, gray);
      log(`  Education: ${education.length} entries`, gray);

      // Check if key data was extracted
      if (personal.name && personal.email && skills.length > 0 && experience.length > 0) {
        logSuccess('All critical data extracted');
        return true;
      } else {
        logError('Some critical data missing');
        return false;
      }
    } else {
      logError('Resume parsing failed');
      console.log(data);
      return false;
    }
  } catch (error) {
    logError(`Parse resume error: ${error.message}`);
    return false;
  }
}

async function testEnhanceContent() {
  logSubSection('Test 3: Enhance Content');

  try {
    const originalBullet = "Worked on the website and fixed bugs";
    logInfo(`Enhancing bullet point: "${originalBullet}"`);

    const startTime = Date.now();
    const response = await fetch(`${WORKER_URL}/api/enhance-content`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'bullet-point',
        content: originalBullet,
        context: {
          jobTitle: 'Frontend Developer',
          company: 'Tech Corp'
        }
      })
    });
    const duration = Date.now() - startTime;

    const data = await response.json();

    if (response.ok && data.success) {
      logSuccess(`Content enhanced successfully (${duration}ms)`);

      log('', gray);
      log('📝 Enhancement Result:', blue);
      log(`  Original: ${data.data.original}`, gray);
      log(`  Enhanced: ${data.data.enhanced}`, green);

      // Check if enhanced content is different and longer
      if (data.data.enhanced !== data.data.original &&
          data.data.enhanced.length > data.data.original.length) {
        logSuccess('Content successfully improved');
        return true;
      } else {
        logError('Content not improved significantly');
        return false;
      }
    } else {
      logError('Content enhancement failed');
      console.log(data);
      return false;
    }
  } catch (error) {
    logError(`Enhance content error: ${error.message}`);
    return false;
  }
}

async function testInvalidRequest() {
  logSubSection('Test 4: Invalid Request Handling');

  try {
    logInfo('Testing error handling with empty request...');

    const response = await fetch(`${WORKER_URL}/api/parse-resume`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumeText: '' })
    });

    const data = await response.json();

    if (!response.ok && !data.success) {
      logSuccess('Error handling works correctly');
      log(`  Error message: ${data.message}`, gray);
      return true;
    } else {
      logError('Should have rejected empty resume');
      return false;
    }
  } catch (error) {
    logError(`Invalid request test error: ${error.message}`);
    return false;
  }
}

async function runAllTests() {
  logSection('🚀 CareerCanvas Worker Test Suite');

  log(`Worker URL: ${WORKER_URL}`, cyan);

  if (WORKER_URL.includes('your-subdomain')) {
    log('', red);
    logError('Please provide your actual worker URL!');
    log('Usage: node test-worker.js https://your-worker-url.workers.dev', yellow);
    log('Or update WORKER_URL in package.json scripts', yellow);
    process.exit(1);
  }

  const results = {
    healthCheck: false,
    parseResume: false,
    enhanceContent: false,
    errorHandling: false
  };

  // Run tests
  results.healthCheck = await testHealthCheck();

  if (results.healthCheck) {
    results.parseResume = await testParseResume();
    results.enhanceContent = await testEnhanceContent();
    results.errorHandling = await testInvalidRequest();
  } else {
    log('', red);
    logError('Skipping remaining tests - health check failed');
    log('', yellow);
    log('Possible issues:', yellow);
    log('  1. Worker URL is incorrect', gray);
    log('  2. Worker is not deployed', gray);
    log('  3. Network/CORS issues', gray);
    log('  4. API key not configured in worker', gray);
  }

  // Summary
  logSection('📊 Test Summary');

  const total = Object.keys(results).length;
  const passed = Object.values(results).filter(Boolean).length;
  const failed = total - passed;

  log(`Total Tests: ${total}`, blue);
  log(`Passed: ${passed}`, green);
  log(`Failed: ${failed}`, red);
  log('', '');

  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? '✓' : '✗';
    const color = passed ? green : red;
    log(`  ${status} ${test}`, color);
  });

  log('', '');

  if (passed === total) {
    logSuccess('🎉 All tests passed! Worker is ready to use.');
    process.exit(0);
  } else {
    logError('❌ Some tests failed. Please check the errors above.');
    process.exit(1);
  }
}

// Run tests
runAllTests().catch(error => {
  console.error('');
  logError(`Unexpected error: ${error.message}`);
  console.error(error);
  process.exit(1);
});
