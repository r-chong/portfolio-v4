# Playwright Tests

## Coverage

tests cover the following functionality:

1. **Responsive Design** (`responsive.spec.ts`)

    - Home page works on desktop, mobile
    - Projects page works on desktop, mobile
    - Blog page works on desktop, mobile

2. **Search and Tags Functionality** (`search-and-tags.spec.ts`)

    - Projects page search functionality
    - Projects page tag filtering
    - Blog page search functionality
    - Blog page tag filtering

3. **Compact Mode Functionality** (`compact-mode.spec.ts`)

    - Blog page compact mode toggle
    - Compact mode preference is remembered

4. **Linktree Component** (`linktree.spec.ts`)

    - Linktree buttons are clickable
    - Email copy functionality
    - External links open in new tabs

5. **Content Tests** (`content.spec.ts`)

    - Blog posts have images and proper rendering
    - Project writeups have images and clickable links
    - Resume page loads and displays content

6. **MathJax Rendering Tests** (`mathjax.spec.ts`)
    - MathJax renders properly in blog posts
    - Inline vs. display math rendering

## Running the Tests

run the tests using the following npm scripts:

```bash
# Run all tests
npm test

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug
```

## Test Configuration

The tests are configured in `playwright.config.ts` at the root of the project. The configuration includes:

-   Multiple browser testing (Chromium, Firefox, WebKit)
-   Mobile device testing (Pixel 5, iPhone 12)
-   Automatic starting of the development server

## Adding New Tests

When adding new tests, follow these guidelines:

1. Create a new test file in the `tests` directory with a descriptive name
2. Use the existing test files as templates
3. Make sure to handle cases where content might not exist (e.g., no blog posts)
4. Test both desktop and mobile views when relevant
