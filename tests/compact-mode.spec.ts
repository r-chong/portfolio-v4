import { test, expect } from '@playwright/test';

test.describe('Compact Mode Functionality', () => {
    test('Blog page compact mode toggle works', async ({ page }) => {
        await page.goto('/blog');

        // Check if there are any blog posts
        const posts = page.locator('article');
        const postCount = await posts.count();

        if (postCount === 0) {
            test.skip('No blog posts found to test compact mode');
            return;
        }

        // Get the compact mode toggle
        const compactToggle = page.locator('button[role="switch"]');
        await expect(compactToggle).toBeVisible();

        // Check initial state (should be non-compact by default)
        const initialCompactState = await compactToggle.getAttribute(
            'aria-checked'
        );
        expect(initialCompactState).toBe('false');

        // Measure the initial height of the first post
        const firstPost = posts.first();
        const initialHeight = await firstPost
            .boundingBox()
            .then((box) => box?.height);

        // Toggle compact mode on
        await compactToggle.click();

        // Check that the toggle state has changed
        await expect(compactToggle).toHaveAttribute('aria-checked', 'true');

        // Wait for the transition to complete
        await page.waitForTimeout(500);

        // Measure the new height of the first post
        const compactHeight = await firstPost
            .boundingBox()
            .then((box) => box?.height);

        // In compact mode, the height should be less than in non-compact mode
        expect(compactHeight).toBeLessThan(initialHeight);

        // Toggle compact mode off again
        await compactToggle.click();

        // Check that the toggle state has changed back
        await expect(compactToggle).toHaveAttribute('aria-checked', 'false');

        // Wait for the transition to complete
        await page.waitForTimeout(500);

        // Measure the height again
        const nonCompactHeight = await firstPost
            .boundingBox()
            .then((box) => box?.height);

        // The height should be back to approximately the initial height
        // Using approximately because there might be small differences due to rendering
        expect(nonCompactHeight).toBeGreaterThan(compactHeight);
        expect(Math.abs(nonCompactHeight - initialHeight)).toBeLessThan(5); // Allow for small differences
    });

    test('Compact mode preference is remembered', async ({ page }) => {
        // First visit to set preference
        await page.goto('/blog');

        // Get the compact mode toggle
        const compactToggle = page.locator('button[role="switch"]');
        await expect(compactToggle).toBeVisible();

        // Check initial state (should be non-compact by default)
        const initialState = await compactToggle.getAttribute('aria-checked');

        // Toggle compact mode (regardless of initial state)
        await compactToggle.click();

        // Check that the toggle state has changed
        const newState = await compactToggle.getAttribute('aria-checked');
        expect(newState).not.toEqual(initialState);

        // Store the current state for later comparison
        const stateToCheck = newState;

        // Navigate away and come back
        await page.goto('/');
        await page.goto('/blog');

        // Check that the compact mode preference was remembered
        const newCompactToggle = page.locator('button[role="switch"]');
        await expect(newCompactToggle).toHaveAttribute(
            'aria-checked',
            stateToCheck
        );

        // Reset to default for other tests
        if (stateToCheck === 'true') {
            await newCompactToggle.click();
            await expect(newCompactToggle).toHaveAttribute(
                'aria-checked',
                'false'
            );
        }
    });
});
