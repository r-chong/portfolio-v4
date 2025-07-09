#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Running preflight checks...\n');

const checks = [
    {
        name: '📝 TypeScript Type Check',
        command: 'npx tsc --noEmit',
        description: 'Checking for TypeScript errors...',
    },
    {
        name: '🔍 ESLint Check',
        command: 'npm run lint',
        description: 'Running linter...',
    },
    {
        name: '🏗️  Next.js Build',
        command: 'npm run build',
        description: 'Building for production...',
    },
];

let allPassed = true;

for (const check of checks) {
    try {
        console.log(`${check.name}`);
        console.log(`${check.description}`);

        const startTime = Date.now();
        execSync(check.command, {
            stdio: 'inherit',
            cwd: process.cwd(),
            timeout: 300000, // 5 minutes timeout
        });

        const duration = ((Date.now() - startTime) / 1000).toFixed(1);
        console.log(`✅ ${check.name} passed (${duration}s)\n`);
    } catch (error) {
        console.log(`❌ ${check.name} failed\n`);
        allPassed = false;

        if (check.command.includes('lint')) {
            console.log(
                '💡 Try running "npm run lint:fix" to auto-fix some issues\n'
            );
        }

        break; // Stop on first failure
    }
}

if (allPassed) {
    console.log('🎉 All preflight checks passed! Ready for deployment.');
    process.exit(0);
} else {
    console.log(
        '🚨 Preflight checks failed. Please fix the issues above before deploying.'
    );
    process.exit(1);
}
