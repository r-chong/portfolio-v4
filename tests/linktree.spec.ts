import { test, expect } from '@playwright/test';

test.describe('Linktree Component', () => {
    test('Linktree buttons are visible and clickable', async ({ page }) => {
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
        // Just check that it's clickable
        await emailButton.click();
        await expect(emailButton).toBeVisible();

        // Check that buttons have proper href attributes
        const resumeHref = await resumeButton.evaluate((el) =>
            el.closest('a')?.getAttribute('href')
        );
        expect(resumeHref).toContain('resume');

        const linkedinHref = await linkedinButton.evaluate((el) =>
            el.closest('a')?.getAttribute('href')
        );
        expect(linkedinHref).toContain('linkedin');

        const githubHref = await githubButton.evaluate((el) =>
            el.closest('a')?.getAttribute('href')
        );
        expect(githubHref).toContain('github');
    });
});
