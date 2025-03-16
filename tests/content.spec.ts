import { test, expect } from '@playwright/test';

test.describe('Content Tests', () => {
    test('Blog posts have images and proper rendering', async ({ page }) => {
        await page.goto('/blog');

        // Check if there are any blog posts
        const posts = page.locator('article');
        const postCount = await posts.count();

        if (postCount === 0) {
            test.skip('No blog posts found to test');
            return;
        }

        // Click on the first blog post
        const firstPostLink = posts.first().locator('a').first();
        await firstPostLink.click();

        // Wait for the blog post page to load
        await page.waitForLoadState('networkidle');

        // Check that the blog post title is visible
        const postTitle = page.locator('h1').first();
        await expect(postTitle).toBeVisible();

        // Check for images in the blog post
        const images = page.locator('img');
        const imageCount = await images.count();

        // Not all blog posts may have images, but if they do, check that they load properly
        for (let i = 0; i < imageCount; i++) {
            const image = images.nth(i);

            // Check if the image is visible and has loaded
            if (await image.isVisible()) {
                // Check that the image has a non-zero size
                const box = await image.boundingBox();
                expect(box?.width).toBeGreaterThan(0);
                expect(box?.height).toBeGreaterThan(0);

                // Check that the image has a valid src attribute
                const src = await image.getAttribute('src');
                expect(src).toBeTruthy();
            }
        }

        // Check for MathJax rendering if present
        const mathElements = page.locator('.katex');
        const mathCount = await mathElements.count();

        if (mathCount > 0) {
            // If there are math elements, check that they are rendered properly
            await expect(mathElements.first()).toBeVisible();

            // Check that the math element has a non-zero size
            const mathBox = await mathElements.first().boundingBox();
            expect(mathBox?.width).toBeGreaterThan(0);
            expect(mathBox?.height).toBeGreaterThan(0);
        }
    });

    test('Project writeups have images and clickable links', async ({
        page,
        context,
    }) => {
        await page.goto('/projects');

        // Check if there are any projects
        const projects = page.locator('a').filter({ hasText: /View Project/i });
        const projectCount = await projects.count();

        if (projectCount === 0) {
            test.skip('No projects found to test');
            return;
        }

        // Click on the first project
        await projects.first().click();

        // Wait for the project page to load
        await page.waitForLoadState('networkidle');

        // Check that the project title is visible
        const projectTitle = page.locator('h1').first();
        await expect(projectTitle).toBeVisible();

        // Check for images in the project writeup
        const images = page.locator('img');
        const imageCount = await images.count();

        // Projects should typically have at least one image
        expect(imageCount).toBeGreaterThan(0);

        // Check that images load properly
        for (let i = 0; i < imageCount; i++) {
            const image = images.nth(i);

            // Check if the image is visible and has loaded
            if (await image.isVisible()) {
                // Check that the image has a non-zero size
                const box = await image.boundingBox();
                expect(box?.width).toBeGreaterThan(0);
                expect(box?.height).toBeGreaterThan(0);

                // Check that the image has a valid src attribute
                const src = await image.getAttribute('src');
                expect(src).toBeTruthy();
            }
        }

        // Check for links in the project writeup
        const links = page
            .locator('a')
            .filter({ hasNotText: /Home|Projects|Blog|About/ });
        const linkCount = await links.count();

        // Test a sample of links (up to 3) to avoid too many new tabs
        const linksToTest = Math.min(linkCount, 3);

        for (let i = 0; i < linksToTest; i++) {
            const link = links.nth(i);

            // Only test links that are visible and have an href attribute
            if (await link.isVisible()) {
                const href = await link.getAttribute('href');

                // Skip links that are anchors or javascript functions
                if (
                    href &&
                    !href.startsWith('#') &&
                    !href.startsWith('javascript:')
                ) {
                    // Check if the link opens in a new tab
                    const target = await link.getAttribute('target');

                    if (target === '_blank') {
                        // Link opens in a new tab
                        const [newPage] = await Promise.all([
                            context.waitForEvent('page'),
                            link.click(),
                        ]);

                        await newPage.waitForLoadState('domcontentloaded');
                        expect(newPage.url()).toContain(
                            href.replace(/^\//, '')
                        );
                        await newPage.close();
                    } else {
                        // Link opens in the same tab
                        const currentUrl = page.url();
                        await link.click();
                        await page.waitForLoadState('domcontentloaded');

                        // Check that the URL has changed
                        expect(page.url()).not.toEqual(currentUrl);

                        // Go back to the project page
                        await page.goBack();
                        await page.waitForLoadState('domcontentloaded');
                    }
                }
            }
        }
    });

    test('Resume page loads and displays content', async ({ page }) => {
        await page.goto('/resume');

        // Check that the resume iframe is visible
        const resumeFrame = page.locator('iframe');
        await expect(resumeFrame).toBeVisible();

        // Check that the download button is visible and clickable
        const downloadButton = page.locator('a', { hasText: 'Download' });
        await expect(downloadButton).toBeVisible();

        // Check that the download button has a valid href attribute
        const href = await downloadButton.getAttribute('href');
        expect(href).toBeTruthy();
    });
});
