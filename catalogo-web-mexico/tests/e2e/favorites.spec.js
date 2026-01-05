import { test, expect } from '@playwright/test';

test.describe('Favorites Functionality', () => {
  test.beforeEach(async ({ page }) => {
    // Clear localStorage before each test
    await page.goto('/');
    await page.evaluate(() => localStorage.clear());
    await page.reload();
  });

  test('should display favorite button on project cards', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    // Check if favorite buttons are visible
    const favoriteButtons = page.locator('.favorite-button');
    await expect(favoriteButtons.first()).toBeVisible();
  });

  test('should add project to favorites when clicking heart button', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    // Click the first favorite button
    const firstFavoriteButton = page.locator('.favorite-button').first();
    await firstFavoriteButton.click();
    
    // Check if button has favorited class
    await expect(firstFavoriteButton).toHaveClass(/favorited/);
    
    // Check if favorites count badge appears
    const favoritesCount = page.locator('.favorites-count');
    await expect(favoritesCount).toBeVisible();
    await expect(favoritesCount).toHaveText('1');
  });

  test('should remove project from favorites when clicking heart button again', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    const firstFavoriteButton = page.locator('.favorite-button').first();
    
    // Add to favorites
    await firstFavoriteButton.click();
    await expect(firstFavoriteButton).toHaveClass(/favorited/);
    
    // Remove from favorites
    await firstFavoriteButton.click();
    await expect(firstFavoriteButton).not.toHaveClass(/favorited/);
  });

  test('should persist favorites after page reload', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    // Add first project to favorites
    const firstFavoriteButton = page.locator('.favorite-button').first();
    await firstFavoriteButton.click();
    await expect(firstFavoriteButton).toHaveClass(/favorited/);
    
    // Reload page
    await page.reload();
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    // Check if favorite is still marked
    const reloadedFirstButton = page.locator('.favorite-button').first();
    await expect(reloadedFirstButton).toHaveClass(/favorited/);
    
    // Check if count is still visible
    const favoritesCount = page.locator('.favorites-count');
    await expect(favoritesCount).toBeVisible();
    await expect(favoritesCount).toHaveText('1');
  });

  test('should show only favorited projects when favorites filter is active', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    // Count initial projects
    const initialCount = await page.locator('.website-card').count();
    expect(initialCount).toBeGreaterThan(0);
    
    // Add first two projects to favorites
    const favoriteButtons = page.locator('.favorite-button');
    await favoriteButtons.nth(0).click();
    await favoriteButtons.nth(1).click();
    
    // Click favorites filter button
    const favoritesToggle = page.locator('.favorites-toggle');
    await favoritesToggle.click();
    
    // Wait for filter to apply
    await page.waitForTimeout(500);
    
    // Check if only 2 projects are shown
    const filteredCount = await page.locator('.website-card').count();
    expect(filteredCount).toBe(2);
    
    // Check if results count shows favorites
    const resultsCount = page.locator('.results-count');
    await expect(resultsCount).toContainText('Favoritos');
  });

  test('should show empty state message when no favorites exist', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    // Click favorites filter without adding any favorites
    const favoritesToggle = page.locator('.favorites-toggle');
    await favoritesToggle.click();
    
    // Check for empty state message
    const resultsCount = page.locator('.results-count');
    await expect(resultsCount).toContainText('No hay favoritos guardados');
  });

  test('should update favorites count badge correctly', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    const favoriteButtons = page.locator('.favorite-button');
    const favoritesCount = page.locator('.favorites-count');
    
    // Add 3 favorites
    await favoriteButtons.nth(0).click();
    await expect(favoritesCount).toHaveText('1');
    
    await favoriteButtons.nth(1).click();
    await expect(favoritesCount).toHaveText('2');
    
    await favoriteButtons.nth(2).click();
    await expect(favoritesCount).toHaveText('3');
    
    // Remove one favorite
    await favoriteButtons.nth(1).click();
    await expect(favoritesCount).toHaveText('2');
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    // Tab to first favorite button
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Press Enter to toggle favorite
    await page.keyboard.press('Enter');
    
    // Check if favorite was added
    const favoritesCount = page.locator('.favorites-count');
    await expect(favoritesCount).toBeVisible();
  });
});
