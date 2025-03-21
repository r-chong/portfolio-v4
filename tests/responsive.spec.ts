import { test, expect } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
    test('Home page works on desktop', async ({ page }) => {
        await page.goto('/');

        // Check if main elements are visible
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();

        // Look for navigation links in the header/nav area
        // Use more specific selectors to avoid strict mode violations
        const headerLinks = page.locator('header a, nav a');

        // Check that we have navigation links
        expect(await headerLinks.count()).toBeGreaterThan(0);

        // Check that at least one of the main navigation links is visible
        const hasProjects =
            (await page
                .locator('header a, nav a')
                .filter({ hasText: /projects/i })
                .count()) > 0;
        const hasBlog =
            (await page
                .locator('header a, nav a')
                .filter({ hasText: /blog/i })
                .count()) > 0;
        const hasAbout =
            (await page
                .locator('header a, nav a')
                .filter({ hasText: /about/i })
                .count()) > 0;

        expect(hasProjects || hasBlog || hasAbout).toBeTruthy();
    });

    test('Home page works on mobile', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'This test is only for mobile');

        await page.goto('/');

        // Check if main elements are visible
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();

        // On mobile, the navigation might be in a hamburger menu
        // Look for any mobile menu button
        const mobileMenuButton = page.locator('button').first();

        // If we find a mobile menu button, test it
        if ((await mobileMenuButton.count()) > 0) {
            await expect(mobileMenuButton).toBeVisible();
            await mobileMenuButton.click();

            // Wait a moment for any animations to complete
            await page.waitForTimeout(500);

            // Check that menu items are now visible
            // We'll just check that at least one navigation link is visible
            const navLinks = page.getByRole('link');
            expect(await navLinks.count()).toBeGreaterThan(0);
        } else {
            // If no mobile menu button, at least one link should be visible
            const navLinks = page.getByRole('link');
            expect(await navLinks.count()).toBeGreaterThan(0);
        }
    });

    test('Projects page works on desktop', async ({ page }) => {
        await page.goto('/projects');

        // Check if main elements are visible
        await expect(page.locator('h1')).toBeVisible();
        await expect(
            page.locator('input[placeholder*="Search projects"]')
        ).toBeVisible();

        // Check that projects are displayed
        // We'll look for any links or project elements
        const projectElements = page.getByRole('link');
        expect(await projectElements.count()).toBeGreaterThan(0);
    });

    test('Projects page works on mobile', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'This test is only for mobile');

        await page.goto('/projects');

        // Check if main elements are visible
        await expect(page.locator('h1')).toBeVisible();
        await expect(
            page.locator('input[placeholder*="Search projects"]')
        ).toBeVisible();

        // Check that at least some content is visible
        const projectElements = page.getByRole('link');
        expect(await projectElements.count()).toBeGreaterThan(0);
    });

    test('Blog page works on desktop', async ({ page }) => {
        await page.goto('/blog');

        // Check if main elements are visible
        await expect(
            page.locator('h1').filter({ hasText: 'Blog' })
        ).toBeVisible();
        await expect(
            page.locator('input[placeholder*="Search posts"]')
        ).toBeVisible();

        // Check that compact mode toggle is visible
        await expect(page.getByText('Compact')).toBeVisible();

        // Check that at least one blog post is visible (if any exist)
        const posts = page.locator('article');
        if ((await posts.count()) > 0) {
            await expect(posts.first()).toBeVisible();
        }
    });

    test('Blog page works on mobile', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'This test is only for mobile');

        await page.goto('/blog');

        // Check if main elements are visible
        await expect(
            page.locator('h1').filter({ hasText: 'Blog' })
        ).toBeVisible();
        await expect(
            page.locator('input[placeholder*="Search posts"]')
        ).toBeVisible();

        // Check that compact mode toggle is visible
        await expect(page.getByText('Compact')).toBeVisible();

        // Check that at least one blog post is visible (if any exist)
        const posts = page.locator('article');
        if ((await posts.count()) > 0) {
            await expect(posts.first()).toBeVisible();
        }
    });
});
