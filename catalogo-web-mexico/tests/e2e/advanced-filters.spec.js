import { test, expect } from '@playwright/test';

test.describe('Advanced Filtering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForSelector('.website-card', { timeout: 5000 });
  });

  test('should display advanced filter toggle button', async ({ page }) => {
    const filterToggle = page.getByRole('button', { name: /filtros avanzados/i });
    await expect(filterToggle).toBeVisible();
  });

  test('should expand advanced filters when toggle is clicked', async ({ page }) => {
    const filterToggle = page.getByRole('button', { name: /filtros avanzados/i });
    await filterToggle.click();
    
    // Check if filter sections are visible
    await expect(page.getByText('Categorías')).toBeVisible();
    await expect(page.getByText('Tecnologías')).toBeVisible();
    await expect(page.getByText('Nivel de Complejidad')).toBeVisible();
  });

  test('should filter by single category', async ({ page }) => {
    const filterToggle = page.getByRole('button', { name: /filtros avanzados/i });
    await filterToggle.click();
    
    // Get initial count
    const initialCount = await page.locator('.website-card').count();
    
    // Select a category
    const ecommerceCheckbox = page.getByLabel(/filtrar por e-commerce/i);
    await ecommerceCheckbox.check();
    
    // Wait for filter to apply
    await page.waitForTimeout(300);
    
    // Count should be less than initial
    const filteredCount = await page.locator('.website-card').count();
    expect(filteredCount).toBeLessThan(initialCount);
    
    // Check if filter count badge is visible
    const filterBadge = page.locator('.filter-count-badge');
    await expect(filterBadge).toBeVisible();
    await expect(filterBadge).toHaveText('1');
  });

  test('should filter by multiple categories', async ({ page }) => {
    const filterToggle = page.getByRole('button', { name: /filtros avanzados/i });
    await filterToggle.click();
    
    // Select multiple categories
    await page.getByLabel(/filtrar por e-commerce/i).check();
    await page.getByLabel(/filtrar por blog/i).check();
    
    await page.waitForTimeout(300);
    
    // Check filter count
    const filterBadge = page.locator('.filter-count-badge');
    await expect(filterBadge).toHaveText('2');
  });

  test('should filter by technology', async ({ page }) => {
    const filterToggle = page.getByRole('button', { name: /filtros avanzados/i });
    await filterToggle.click();
    
    // Click a technology chip
    const reactChip = page.getByRole('button', { name: /filtrar por react/i });
    await reactChip.click();
    
    await page.waitForTimeout(300);
    
    // Check if chip is active
    await expect(reactChip).toHaveClass(/active/);
    
    // Check filter count
    const filterBadge = page.locator('.filter-count-badge');
    await expect(filterBadge).toBeVisible();
  });

  test('should filter by complexity level', async ({ page }) => {
    const filterToggle = page.getByRole('button', { name: /filtros avanzados/i });
    await filterToggle.click();
    
    // Click medium complexity
    const mediumBtn = page.getByRole('button', { name: /filtrar proyectos de complejidad media/i });
    await mediumBtn.click();
    
    await page.waitForTimeout(300);
    
    // Check if button is active
    await expect(mediumBtn).toHaveClass(/active/);
  });

  test('should combine multiple filters with AND logic', async ({ page }) => {
    const filterToggle = page.getByRole('button', { name: /filtros avanzados/i });
    await filterToggle.click();
    
    // Apply category filter
    await page.getByLabel(/filtrar por e-commerce/i).check();
    
    // Apply technology filter
    const reactChip = page.getByRole('button', { name: /filtrar por react/i });
    await reactChip.click();
    
    await page.waitForTimeout(300);
    
    // Check that both filters are active
    const filterBadge = page.locator('.filter-count-badge');
    await expect(filterBadge).toHaveText('2');
    
    // Results should match both criteria
    const cards = page.locator('.website-card');
    const count = await cards.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should show active filter tags', async ({ page }) => {
    const filterToggle = page.getByRole('button', { name: /filtros avanzados/i });
    await filterToggle.click();
    
    // Apply filters
    await page.getByLabel(/filtrar por e-commerce/i).check();
    const reactChip = page.getByRole('button', { name: /filtrar por react/i });
    await reactChip.click();
    
    await page.waitForTimeout(300);
    
    // Check for active filter tags
    await expect(page.getByText('Filtros Activos')).toBeVisible();
    await expect(page.locator('.active-filter-tag').filter({ hasText: 'E-commerce' })).toBeVisible();
    await expect(page.locator('.active-filter-tag').filter({ hasText: 'React' })).toBeVisible();
  });

  test('should remove individual filter from active tags', async ({ page }) => {
    const filterToggle = page.getByRole('button', { name: /filtros avanzados/i });
    await filterToggle.click();
    
    // Apply filter
    await page.getByLabel(/filtrar por e-commerce/i).check();
    
    await page.waitForTimeout(300);
    
    // Remove filter from active tags
    const removeButton = page.getByRole('button', { name: /quitar filtro e-commerce/i });
    await removeButton.click();
    
    await page.waitForTimeout(300);
    
    // Filter should be removed
    const filterBadge = page.locator('.filter-count-badge');
    await expect(filterBadge).not.toBeVisible();
  });

  test('should clear all filters when clear button is clicked', async ({ page }) => {
    const filterToggle = page.getByRole('button', { name: /filtros avanzados/i });
    await filterToggle.click();
    
    // Apply multiple filters
    await page.getByLabel(/filtrar por e-commerce/i).check();
    const reactChip = page.getByRole('button', { name: /filtrar por react/i });
    await reactChip.click();
    
    await page.waitForTimeout(300);
    
    // Click clear all
    const clearButton = page.getByRole('button', { name: /limpiar todos los filtros/i });
    await clearButton.click();
    
    await page.waitForTimeout(300);
    
    // All filters should be cleared
    const filterBadge = page.locator('.filter-count-badge');
    await expect(filterBadge).not.toBeVisible();
  });

  test('should persist filters in URL parameters', async ({ page }) => {
    const filterToggle = page.getByRole('button', { name: /filtros avanzados/i });
    await filterToggle.click();
    
    // Apply filters
    await page.getByLabel(/filtrar por e-commerce/i).check();
    
    await page.waitForTimeout(500);
    
    // Check URL contains filter parameters
    const url = page.url();
    expect(url).toContain('categories=E-commerce');
  });

  test('should load filters from URL on page load', async ({ page }) => {
    // Navigate with URL parameters
    await page.goto('/?categories=E-commerce&technologies=React');
    
    await page.waitForSelector('.website-card', { timeout: 5000 });
    
    // Open advanced filters
    const filterToggle = page.getByRole('button', { name: /filtros avanzados/i });
    await filterToggle.click();
    
    // Check if filters are applied
    const ecommerceCheckbox = page.getByLabel(/filtrar por e-commerce/i);
    await expect(ecommerceCheckbox).toBeChecked();
    
    const reactChip = page.getByRole('button', { name: /filtrar por react/i });
    await expect(reactChip).toHaveClass(/active/);
    
    // Check filter count
    const filterBadge = page.locator('.filter-count-badge');
    await expect(filterBadge).toHaveText('2');
  });

  test('should update results count with active filters', async ({ page }) => {
    const filterToggle = page.getByRole('button', { name: /filtros avanzados/i });
    await filterToggle.click();
    
    // Apply filter
    await page.getByLabel(/filtrar por e-commerce/i).check();
    
    await page.waitForTimeout(300);
    
    // Check results count shows active filters
    const resultsCount = page.locator('.results-count');
    await expect(resultsCount).toContainText('filtro(s) activo(s)');
  });

  test('should be keyboard accessible', async ({ page }) => {
    // Tab to advanced filter toggle
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // Press Enter to expand
    await page.keyboard.press('Enter');
    
    // Check if expanded
    await expect(page.getByText('Categorías')).toBeVisible();
  });
});
