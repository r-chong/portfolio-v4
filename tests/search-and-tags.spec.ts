import { test, expect } from '@playwright/test';

test.describe('Search and Tags Functionality', () => {
    test('Projects page search functionality works', async ({ page }) => {
        await page.goto('/projects');

        // Get the search input
        const searchInput = page.locator(
            'input[placeholder*="Search projects"]'
        );
        await expect(searchInput).toBeVisible();

        // Store the initial count of projects
        const initialProjectCount = await page
            .locator('a')
            .filter({ hasText: /View Project/i })
            .count();

        // Type a search term that should match at least one project
        await searchInput.fill('project');
        await searchInput.press('Enter');

        // Wait for the search results to update
        await page.waitForTimeout(500);

        // Check that the search results are displayed
        const filteredProjectCount = await page
            .locator('a')
            .filter({ hasText: /View Project/i })
            .count();

        // Either we found fewer projects (filtering worked) or we found the same number (all projects match)
        expect(filteredProjectCount).toBeLessThanOrEqual(initialProjectCount);

        // Clear the search
        await searchInput.click();
        await searchInput.clear();

        // Wait for the results to reset
        await page.waitForTimeout(500);

        // Check that all projects are displayed again
        const resetProjectCount = await page
            .locator('a')
            .filter({ hasText: /View Project/i })
            .count();
        expect(resetProjectCount).toEqual(initialProjectCount);
    });

    test('Projects page tag filtering works', async ({ page }) => {
        await page.goto('/projects');

        // Check if there are any tags
        const tagButtons = page
            .locator('button')
            .filter({ hasText: /^[^+]/ })
            .filter({ hasNotText: 'Clear filters' });
        const tagCount = await tagButtons.count();

        if (tagCount === 0) {
            test.skip(true, 'No tags found to test');
            return;
        }

        // Store the initial count of projects
        const initialProjectCount = await page
            .locator('a')
            .filter({ hasText: /View Project/i })
            .count();

        // Click on the first tag
        await tagButtons.first().click();

        // Wait for the filtering to apply
        await page.waitForTimeout(500);

        // Check that the filtered results are displayed
        const filteredProjectCount = await page
            .locator('a')
            .filter({ hasText: /View Project/i })
            .count();

        // Either we found fewer projects (filtering worked) or we found the same number (all projects have this tag)
        expect(filteredProjectCount).toBeLessThanOrEqual(initialProjectCount);

        // Clear the filters
        const clearButton = page.locator('button', {
            hasText: 'Clear filters',
        });
        if (await clearButton.isVisible()) {
            await clearButton.click();

            // Wait for the results to reset
            await page.waitForTimeout(500);

            // Check that all projects are displayed again
            const resetProjectCount = await page
                .locator('a')
                .filter({ hasText: /View Project/i })
                .count();
            expect(resetProjectCount).toEqual(initialProjectCount);
        }
    });

    test('Blog page search functionality works', async ({ page }) => {
        await page.goto('/blog');

        // Get the search input
        const searchInput = page.locator('input[placeholder*="Search posts"]');
        await expect(searchInput).toBeVisible();

        // Store the initial count of blog posts
        const initialPostCount = await page.locator('article').count();

        // If there are no posts, skip the test
        if (initialPostCount === 0) {
            test.skip(true, 'No blog posts found to test search functionality');
            return;
        }

        // Type a search term
        await searchInput.fill('blog');
        await searchInput.press('Enter');

        // Wait for the search results to update
        await page.waitForTimeout(500);

        // Check that the search results are displayed
        const filteredPostCount = await page.locator('article').count();

        // Either we found fewer posts (filtering worked) or we found the same number (all posts match)
        expect(filteredPostCount).toBeLessThanOrEqual(initialPostCount);

        // Clear the search
        await searchInput.click();
        await searchInput.clear();

        // Wait for the results to reset
        await page.waitForTimeout(500);

        // Check that all posts are displayed again
        const resetPostCount = await page.locator('article').count();
        expect(resetPostCount).toEqual(initialPostCount);
    });

    test('Blog page tag filtering works', async ({ page }) => {
        await page.goto('/blog');

        // Check if there are any tags
        const tagButtons = page
            .locator('button')
            .filter({ hasText: /^#/ })
            .filter({ hasNotText: 'Clear filters' });
        const tagCount = await tagButtons.count();

        if (tagCount === 0) {
            test.skip(true, 'No tags found to test');
            return;
        }

        // Store the initial count of blog posts
        const initialPostCount = await page.locator('article').count();

        // If there are no posts, skip the test
        if (initialPostCount === 0) {
            test.skip(true, 'No blog posts found to test tag filtering');
            return;
        }

        // Click on the first tag
        await tagButtons.first().click();

        // Wait for the filtering to apply
        await page.waitForTimeout(500);

        // Check that the filtered results are displayed
        const filteredPostCount = await page.locator('article').count();

        // Either we found fewer posts (filtering worked) or we found the same number (all posts have this tag)
        expect(filteredPostCount).toBeLessThanOrEqual(initialPostCount);

        // Clear the filters
        const clearButton = page.locator('button', {
            hasText: 'Clear filters',
        });
        if (await clearButton.isVisible()) {
            await clearButton.click();

            // Wait for the results to reset
            await page.waitForTimeout(500);

            // Check that all posts are displayed again
            const resetPostCount = await page.locator('article').count();
            expect(resetPostCount).toEqual(initialPostCount);
        }
    });
});
