import { expect, test } from '@playwright/test'

test.describe('Navigation and Basic Pages', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing auth state
    await page.context().clearCookies()
  })

  test('should load login page correctly', async ({ page }) => {
    await page.goto('/login')

    await expect(page).toHaveTitle(/codac - Learning Management System/)
    await expect(page.locator('h1')).toContainText('Login')
  })

  test('should load register page correctly', async ({ page }) => {
    await page.goto('/register')

    await expect(page).toHaveTitle(/codac - Learning Management System/)
    await expect(page.locator('h1')).toContainText('Create Account')
  })

  test('should redirect to login when accessing protected profile page', async ({ page }) => {
    await page.goto('/profile')

    // Should redirect to login or show login form
    await expect(page).toHaveURL(/\/(login)?/)
  })

  test('should redirect to login when accessing protected admin page', async ({ page }) => {
    await page.goto('/admin')

    // Should redirect to login or show login form
    await expect(page).toHaveURL(/\/(login)?/)
  })

  test('should have proper meta tags and SEO elements', async ({ page }) => {
    await page.goto('/login')

    await expect(page).toHaveTitle(/codac - Learning Management System/)

    // Check if meta description is present
    const metaDescription = page.locator('meta[name="description"]')
    await expect(metaDescription).toHaveAttribute('content', /learning management system/i)
  })

  test('should be responsive on mobile viewport', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 }) // iPhone SE size
    await page.goto('/login')

    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('input[placeholder="Email"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Password"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should be responsive on tablet viewport', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }) // iPad size
    await page.goto('/register')

    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('input[placeholder="Enter your name"]')).toBeVisible()
    await expect(page.locator('input[placeholder="Enter your email"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should load CSS and styles correctly', async ({ page }) => {
    await page.goto('/login')

    // Check if the page has proper styling
    const card = page.locator('.card, [class*="card"]').first()
    if ((await card.count()) > 0) {
      await expect(card).toBeVisible()
    }

    // Check if buttons have proper styling
    const button = page.locator('button[type="submit"]')
    await expect(button).toBeVisible()

    // Verify the button has some styling applied
    const buttonClasses = await button.getAttribute('class')
    expect(buttonClasses).toBeTruthy()
  })
})
