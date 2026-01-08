#!/usr/bin/env node

/**
 * This script runs the tests and sends the results to OpenAI
 * to get a simple, easy-to-understand explanation.
 *
 * Usage: npm run test:explain
 *
 * Requires: OPENAI_API_KEY environment variable
 */

const { execSync } = require('child_process');
const https = require('https');

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = '') {
  console.log(color + message + colors.reset);
}

function logSection(title) {
  console.log('\n' + '='.repeat(60));
  log(title, colors.bright + colors.cyan);
  console.log('='.repeat(60) + '\n');
}

async function callOpenAI(testOutput) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    log('\n❌ ERROR: OPENAI_API_KEY not found!', colors.red);
    log('\nTo fix this, run:', colors.yellow);
    log('  export OPENAI_API_KEY=your-api-key-here', colors.bright);
    log('\nOr add it to your .env.local file:', colors.yellow);
    log('  OPENAI_API_KEY=your-api-key-here', colors.bright);
    process.exit(1);
  }

  const prompt = `You are helping a student understand their test results. They don't know how to code, so explain everything in simple terms.

Here are the test results from their project:

${testOutput}

Please explain:
1. **Summary**: How many tests passed vs failed? (use simple numbers like "15 out of 20 tests passed")

2. **What's Working**: List the features that are working correctly (in simple terms, not code terms). For example: "The game cards show up correctly" or "Clicking buttons works"

3. **What's Broken** (if any tests failed):
   - Explain each problem in simple words
   - What should happen vs what actually happened
   - Don't use code terms - explain like you're talking to someone who doesn't program

4. **How to Fix** (if there are failures):
   - Simple steps they can tell their developer to fix
   - Or if it's a test issue (not a real bug), explain that

Use emojis to make it friendly and easy to scan:
- ✅ for things that work
- ❌ for things that are broken
- 💡 for tips
- 🔧 for fixes needed

Keep the language very simple - imagine explaining to a friend who has never coded before.`;

  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 2000,
      temperature: 0.7
    });

    const options = {
      hostname: 'api.openai.com',
      port: 443,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = https.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          if (parsed.error) {
            reject(new Error(parsed.error.message));
          } else {
            resolve(parsed.choices[0].message.content);
          }
        } catch (e) {
          reject(new Error('Failed to parse OpenAI response'));
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(data);
    req.end();
  });
}

async function main() {
  logSection('🧪 Running Tests...');

  let testOutput = '';
  let testsPassed = true;

  try {
    // Run tests and capture output
    testOutput = execSync('npm test -- --verbose --no-coverage 2>&1', {
      encoding: 'utf-8',
      maxBuffer: 10 * 1024 * 1024, // 10MB buffer
    });
  } catch (error) {
    // Tests failed but we still have output
    testOutput = error.stdout || error.message;
    testsPassed = false;
  }

  // Show raw test output
  console.log(testOutput);

  logSection('🤖 Asking OpenAI to Explain Results...');
  log('Please wait, this takes a few seconds...', colors.yellow);

  try {
    const explanation = await callOpenAI(testOutput);

    logSection('📝 Simple Explanation of Your Test Results');
    console.log(explanation);

    // Save to file
    const fs = require('fs');
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `test-explanation-${timestamp}.md`;

    const fileContent = `# Test Results Explanation
Generated: ${new Date().toLocaleString()}

${explanation}

---

## Raw Test Output

\`\`\`
${testOutput}
\`\`\`
`;

    fs.writeFileSync(filename, fileContent);

    logSection('✅ Done!');
    log(`📄 Explanation saved to: ${filename}`, colors.green);
    log('   You can open this file to read the explanation anytime.\n', colors.bright);

  } catch (error) {
    log('\n❌ Error getting explanation from OpenAI:', colors.red);
    log(error.message, colors.red);
    log('\nThe test results are shown above - you can still see what passed/failed.', colors.yellow);
  }
}

main();
