import { test, expect } from '@playwright/test';

test.describe('Responsive Design Tests', () => {
    test('Home page works on desktop', async ({ page }) => {
        await page.goto('/');

        // Check if main elements are visible
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();

        // Check navigation is visible and has expected items
        const header = page.locator('header');
        await expect(header).toBeVisible();
        await expect(
            header.getByRole('link', { name: 'Projects' })
        ).toBeVisible();
        await expect(header.getByRole('link', { name: 'Blog' })).toBeVisible();
        await expect(header.getByRole('link', { name: 'About' })).toBeVisible();
    });

    test('Home page works on mobile', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'This test is only for mobile');

        await page.goto('/');

        // Check if main elements are visible
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();

        // On mobile, the navigation is typically in a hamburger menu
        const hamburgerButton = page.locator(
            'button[aria-label="Toggle menu"]'
        );
        await expect(hamburgerButton).toBeVisible();

        // Open the mobile menu
        await hamburgerButton.click();

        // Check that menu items are now visible
        await expect(
            page.getByRole('link', { name: 'Projects' })
        ).toBeVisible();
        await expect(page.getByRole('link', { name: 'Blog' })).toBeVisible();
        await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    });

    test('Projects page works on desktop', async ({ page }) => {
        await page.goto('/projects');

        // Check if main elements are visible
        await expect(page.locator('h1')).toBeVisible();
        await expect(
            page.locator('input[placeholder*="Search projects"]')
        ).toBeVisible();

        // Check that projects are displayed in a grid
        const projectsGrid = page.locator('.grid');
        await expect(projectsGrid).toBeVisible();

        // Check that at least one project is visible
        await expect(projectsGrid.locator('a').first()).toBeVisible();
    });

    test('Projects page works on mobile', async ({ page, isMobile }) => {
        test.skip(!isMobile, 'This test is only for mobile');

        await page.goto('/projects');

        // Check if main elements are visible
        await expect(page.locator('h1')).toBeVisible();
        await expect(
            page.locator('input[placeholder*="Search projects"]')
        ).toBeVisible();

        // On mobile, projects should still be visible but in a single column
        const projectsSection = page
            .locator('section')
            .filter({ hasText: 'Search projects' });
        await expect(projectsSection).toBeVisible();

        // Check that at least one project is visible
        await expect(
            page
                .locator('a')
                .filter({ hasText: /View Project/i })
                .first()
        ).toBeVisible();
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
