import { test, expect } from '@playwright/test';

test.describe('MathJax Rendering Tests', () => {
    test('MathJax renders properly in blog posts', async ({ page }) => {
        await page.goto('/blog');

        // Check if there are any blog posts
        const posts = page.locator('article');
        const postCount = await posts.count();

        if (postCount === 0) {
            test.skip(true, 'No blog posts found to test');
            return;
        }

        // We need to find a blog post that contains math
        // First, let's check if there are any tags related to math
        const mathTags = page
            .locator('button')
            .filter({ hasText: /#math|#mathematics|#equation/i });

        if ((await mathTags.count()) > 0) {
            // Click on the math tag to filter posts
            await mathTags.first().click();
            await page.waitForTimeout(500);

            // Check if there are any filtered posts
            const filteredPosts = page.locator('article');
            if ((await filteredPosts.count()) > 0) {
                // Click on the first filtered post
                await filteredPosts.first().locator('a').first().click();
            } else {
                // If no posts with math tags, clear filters and try the first post
                const clearButton = page.locator('button', {
                    hasText: 'Clear filters',
                });
                if (await clearButton.isVisible()) {
                    await clearButton.click();
                    await page.waitForTimeout(500);
                }

                // Click on the first post
                await posts.first().locator('a').first().click();
            }
        } else {
            // If no math tags, just try the first post
            await posts.first().locator('a').first().click();
        }

        // Wait for the blog post page to load
        await page.waitForLoadState('networkidle');

        // Check for MathJax rendering
        const mathElements = page.locator('.katex, .katex-display');
        const mathCount = await mathElements.count();

        if (mathCount === 0) {
            test.skip(true, 'No MathJax elements found in this blog post');
            return;
        }

        // Check that MathJax elements are rendered properly
        for (let i = 0; i < Math.min(mathCount, 5); i++) {
            const mathElement = mathElements.nth(i);

            // Check if the math element is visible
            await expect(mathElement).toBeVisible();

            // Check that the math element has a non-zero size
            const mathBox = await mathElement.boundingBox();
            expect(mathBox?.width).toBeGreaterThan(0);
            expect(mathBox?.height).toBeGreaterThan(0);

            // Check that the math element contains rendered math (not raw LaTeX)
            // KaTeX renders math into spans with specific classes
            const renderedMath = await mathElement
                .locator('span.katex-html')
                .count();
            expect(renderedMath).toBeGreaterThan(0);
        }

        // Test inline math vs. display math if both are present
        const inlineMath = page.locator('.katex:not(.katex-display)');
        const displayMath = page.locator('.katex-display');

        if ((await inlineMath.count()) > 0 && (await displayMath.count()) > 0) {
            // Inline math should be within the text flow
            const inlineMathBox = await inlineMath.first().boundingBox();

            // Display math should be on its own line
            const displayMathBox = await displayMath.first().boundingBox();

            // Display math is typically taller than inline math
            if (inlineMathBox?.height && displayMathBox?.height) {
                expect(displayMathBox.height).toBeGreaterThan(
                    inlineMathBox.height
                );
            }
        }
    });
});
