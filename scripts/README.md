# Preflight Check Scripts

This directory contains scripts to run comprehensive checks before deployment to catch build and debug issues early.

## Available Scripts

### `npm run preflight`

Runs the full preflight check suite:

1. TypeScript type checking
2. ESLint linting
3. Next.js production build

**Use this before every deployment.**

### `npm run preflight:ps`

Same as above but uses PowerShell for better Windows compatibility and colored output.

### `npm run preflight:quick`

Runs only type checking and linting (skips the build step for faster feedback).

### `npm run preflight:fix`

Runs type checking, attempts to auto-fix linting issues, then builds.

### Individual Commands

-   `npm run type-check` - Only TypeScript type checking
-   `npm run lint` - Only ESLint checking
-   `npm run lint:fix` - ESLint with automatic fixes
-   `npm run build` - Only Next.js build

## Usage Examples

```bash
# Before deploying
npm run preflight

# Quick check while developing
npm run preflight:quick

# Auto-fix linting issues and then check
npm run preflight:fix

# On Windows with PowerShell
npm run preflight:ps
```

## What Each Check Does

### TypeScript Type Check

-   Validates all TypeScript files for type errors
-   Uses `tsc --noEmit` to check without generating files
-   Catches type mismatches, missing imports, etc.

### ESLint Check

-   Validates code style and catches potential bugs
-   Uses your existing ESLint configuration
-   Can auto-fix many issues with `lint:fix`

### Next.js Build

-   Simulates the production build process
-   Catches build-time errors that might not show in development
-   Validates all pages, components, and assets
-   Checks for missing dependencies and import errors

## Tips

-   Run `preflight:quick` frequently during development
-   Run full `preflight` before every commit/deployment
-   If linting fails, try `preflight:fix` first
-   Build errors often indicate missing dependencies or import issues
