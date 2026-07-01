import { test, expect } from '@playwright/test';

test.describe('User Directory Application', () => {
  test('should load the page and correctly display the user list', async ({ page }) => {
    // Navigate to the base URL
    await page.goto('/');

    // Verify the main header is present
    const header = page.locator('h1');
    await expect(header).toHaveText('User Directory');

    // Wait for the 'Loading users...' message to disappear (or the list to appear)
    const loadingMessage = page.locator('text=Loading users...');
    await expect(loadingMessage).not.toBeVisible({ timeout: 10000 });

    // Assert that the list containing users is visible
    const userList = page.locator('ul');
    await expect(userList).toBeVisible();

    // Verify that the list contains items
    const listItems = page.locator('ul li');
    await expect(listItems).toHaveCount(10);

    // Verify that the first user "Leanne Graham" is displayed correctly
    const firstUser = listItems.first();
    await expect(firstUser).toContainText('Leanne Graham');
    await expect(firstUser).toContainText('Sincere@april.biz');
  });
});
