import { test, expect } from '@playwright/test';

test.describe('User Card Component E2E', () => {
  test('should display complete details on user cards', async ({ page }) => {
    await page.goto('/');

    // Wait for the first user card to render
    const firstCard = page.locator('app-user-card').first();
    await expect(firstCard).toBeVisible({ timeout: 10000 });

    // Verify Name is displayed correctly
    const name = firstCard.locator('.user-name');
    await expect(name).toBeVisible();
    await expect(name).toHaveText('Leanne Graham');

    // Verify Company Name
    const company = firstCard.locator('p', { hasText: 'Company:' });
    await expect(company).toContainText('Romaguera-Crona');

    // Verify Email with correct mailto link
    const emailLink = firstCard.locator('a[href^="mailto:"]');
    await expect(emailLink).toHaveAttribute('href', 'mailto:Sincere@april.biz');
    await expect(emailLink).toHaveText('Sincere@april.biz');

    // Verify Phone
    const phone = firstCard.locator('p', { hasText: 'Phone:' });
    await expect(phone).toContainText('1-770-736-8031 x56442');

    // Verify Website with target="_blank" and correct link
    const websiteLink = firstCard.locator('a[target="_blank"]');
    await expect(websiteLink).toHaveAttribute('href', 'https://hildegard.org');
    await expect(websiteLink).toHaveText('hildegard.org');
  });

  test('should display empty message when user list is empty', async ({ page }) => {
    // Mock the API response to return an empty array
    await page.route('**/users', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([]),
      });
    });

    await page.goto('/');

    // Verify empty state message is visible and has correct text
    const noUsers = page.locator('.no-users');
    await expect(noUsers).toBeVisible({ timeout: 10000 });
    await expect(noUsers).toHaveText('No users available.');

    // Ensure no cards are rendered
    const cards = page.locator('app-user-card');
    await expect(cards).toHaveCount(0);
  });
});
