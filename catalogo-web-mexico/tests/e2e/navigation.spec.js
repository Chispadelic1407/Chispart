import { test, expect } from '@playwright/test';

test.describe('Basic Navigation', () => {
  test('should load the homepage', async ({ page }) => {
    await page.goto('/');
    
    // Check if the header is visible
    await expect(page.locator('header')).toBeVisible();
    
    // Check if the logo is present
    await expect(page.getByText('WebCatalogMX')).toBeVisible();
  });

  test('should display navigation links', async ({ page }) => {
    await page.goto('/');
    
    // Check navigation links
    await expect(page.getByRole('link', { name: 'Catálogo' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Servicios' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contacto' })).toBeVisible();
  });

  test('should display tour button', async ({ page }) => {
    await page.goto('/');
    
    // Check if tour button is present
    const tourButton = page.getByRole('button', { name: /tour guiado/i });
    await expect(tourButton).toBeVisible();
  });

  test('should display project catalog', async ({ page }) => {
    await page.goto('/');
    
    // Wait for catalog to load
    await page.waitForSelector('.catalog', { timeout: 5000 });
    
    // Check if catalog is visible
    await expect(page.locator('.catalog')).toBeVisible();
  });
});
