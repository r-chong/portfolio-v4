# Playwright Tests for Portfolio Website

This directory contains Playwright tests for the portfolio website. These tests ensure that all components and pages work correctly across different devices and browsers.

## Test Coverage

The tests cover the following functionality:

1. **Responsive Design Tests** (`responsive.spec.ts`)

    - Home page works on desktop and mobile
    - Projects page works on desktop and mobile
    - Blog page works on desktop and mobile

2. **Search and Tags Functionality** (`search-and-tags.spec.ts`)

    - Projects page search functionality
    - Projects page tag filtering
    - Blog page search functionality
    - Blog page tag filtering

3. **Compact Mode Functionality** (`compact-mode.spec.ts`)

    - Blog page compact mode toggle
    - Compact mode preference is remembered

4. **Linktree Component** (`linktree.spec.ts`)

    - Linktree buttons are visible and clickable
    - Verifies proper href attributes for links

5. **Content Tests** (`content.spec.ts`)

    - Blog posts have images and proper rendering
    - Project writeups have images and clickable links
    - Resume page loads and displays content

6. **MathJax Rendering Tests** (`mathjax.spec.ts`)
    - MathJax renders properly in blog posts
    - Inline vs. display math rendering

## Running the Tests

You can run the tests using the following npm scripts:

```bash
# Run all tests
npm test

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Run tests on specific browsers
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Run tests on mobile devices
npm run test:mobile
```

## Test Configuration

The tests are configured in `playwright.config.ts` at the root of the project. The configuration includes:

-   Multiple browser testing (Chromium, Firefox, WebKit)
-   Mobile device testing (Pixel 5, iPhone 12)
-   Automatic starting of the development server

## Test Design Considerations

The tests are designed to be robust and handle various edge cases:

1. **Responsive Design**: Tests check for content visibility rather than specific layout elements that might change
2. **Navigation**: Tests use flexible selectors to find navigation elements regardless of their exact structure
3. **Content Availability**: Tests gracefully handle cases where content might not exist (e.g., no blog posts)
4. **External Links**: Tests verify href attributes rather than actual navigation to avoid timeouts
5. **State Management**: Tests for features like compact mode verify state changes rather than specific visual effects

## Adding New Tests

When adding new tests, follow these guidelines:

1. Create a new test file in the `tests` directory with a descriptive name
2. Use the existing test files as templates
3. Make sure to handle cases where content might not exist (e.g., no blog posts)
4. Test both desktop and mobile views when relevant
5. Avoid strict dependencies on specific DOM structures that might change
6. Use flexible selectors that can adapt to design changes
