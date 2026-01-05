import { test, expect } from '@playwright/test';

test.describe('Share Functionality', () => {
  test('should display share button on project cards', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    // Check if share buttons are visible
    const shareButtons = page.locator('.share-button');
    await expect(shareButtons.first()).toBeVisible();
  });

  test('should open share menu when clicking share button', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    // Click the first share button
    const firstShareButton = page.locator('.share-button').first();
    await firstShareButton.click();
    
    // Check if share menu is visible
    const shareMenu = page.locator('.share-menu');
    await expect(shareMenu).toBeVisible();
    
    // Check if all share options are present
    await expect(page.getByRole('menuitem', { name: /twitter/i })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /linkedin/i })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /facebook/i })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /whatsapp/i })).toBeVisible();
    await expect(page.getByRole('menuitem', { name: /copiar enlace/i })).toBeVisible();
  });

  test('should close share menu when clicking share button again', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    const firstShareButton = page.locator('.share-button').first();
    
    // Open menu
    await firstShareButton.click();
    await expect(page.locator('.share-menu')).toBeVisible();
    
    // Close menu
    await firstShareButton.click();
    await expect(page.locator('.share-menu')).not.toBeVisible();
  });

  test('should copy link to clipboard', async ({ page, context }) => {
    // Grant clipboard permissions
    await context.grantPermissions(['clipboard-read', 'clipboard-write']);
    
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    // Open share menu
    const firstShareButton = page.locator('.share-button').first();
    await firstShareButton.click();
    
    // Click copy link option
    const copyOption = page.getByRole('menuitem', { name: /copiar enlace/i });
    await copyOption.click();
    
    // Check for success message
    await expect(page.getByText('¡Copiado!')).toBeVisible();
    
    // Verify clipboard content
    const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
    expect(clipboardText).toContain('?project=');
  });

  test('should have correct ARIA attributes', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    const firstShareButton = page.locator('.share-button').first();
    
    // Check initial ARIA attributes
    await expect(firstShareButton).toHaveAttribute('aria-expanded', 'false');
    await expect(firstShareButton).toHaveAttribute('aria-haspopup', 'true');
    
    // Open menu
    await firstShareButton.click();
    
    // Check updated ARIA attributes
    await expect(firstShareButton).toHaveAttribute('aria-expanded', 'true');
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    // Tab to share button (may need multiple tabs depending on page structure)
    for (let i = 0; i < 10; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement.className);
      if (focused.includes('share-button')) {
        break;
      }
    }
    
    // Press Enter to open menu
    await page.keyboard.press('Enter');
    
    // Check if menu is visible
    await expect(page.locator('.share-menu')).toBeVisible();
  });

  test('should not propagate click to parent card', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    // Get initial card state (not expanded)
    const firstCard = page.locator('.website-card').first();
    const initialExpandedState = await firstCard.locator('.card-details').getAttribute('class');
    
    // Click share button
    const firstShareButton = page.locator('.share-button').first();
    await firstShareButton.click();
    
    // Card should not expand
    const afterClickState = await firstCard.locator('.card-details').getAttribute('class');
    expect(afterClickState).toBe(initialExpandedState);
  });
});
