import { test, expect } from '@playwright/test';

test.describe('Linktree Component', () => {
    test('Linktree buttons are clickable on home page', async ({
        page,
        context,
    }) => {
        await page.goto('/');

        // Find the Linktree component
        const linktree = page
            .locator('div')
            .filter({ hasText: 'Copy email address' })
            .first();
        await expect(linktree).toBeVisible();

        // Check that all buttons are visible
        const emailButton = linktree.getByText('Copy email address');
        const resumeButton = linktree.getByText('Resume');
        const linkedinButton = linktree.getByText('LinkedIn');
        const githubButton = linktree.getByText('GitHub');

        await expect(emailButton).toBeVisible();
        await expect(resumeButton).toBeVisible();
        await expect(linkedinButton).toBeVisible();
        await expect(githubButton).toBeVisible();

        // Test email button (copies to clipboard)
        await emailButton.click();
        // Check that the button text changes to indicate copying
        await expect(
            linktree.getByText('Copied Email Address! ✅')
        ).toBeVisible();

        // Test resume button (opens in same tab)
        const resumePromise = page.waitForNavigation();
        await resumeButton.click();
        await resumePromise;

        // Check that we navigated to the resume page
        expect(page.url()).toContain('/resume');

        // Go back to home page
        await page.goto('/');

        // Find the Linktree component again
        const linktree2 = page
            .locator('div')
            .filter({ hasText: 'Copy email address' })
            .first();

        // Test LinkedIn button (opens in new tab)
        const linkedinButton2 = linktree2.getByText('LinkedIn');
        const [linkedinPage] = await Promise.all([
            context.waitForEvent('page'),
            linkedinButton2.click(),
        ]);

        await linkedinPage.waitForLoadState();
        expect(linkedinPage.url()).toContain('linkedin.com');

        // Test GitHub button (opens in new tab)
        const githubButton2 = linktree2.getByText('GitHub');
        const [githubPage] = await Promise.all([
            context.waitForEvent('page'),
            githubButton2.click(),
        ]);

        await githubPage.waitForLoadState();
        expect(githubPage.url()).toContain('github.com');
    });
});
