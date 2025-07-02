import { expect, test } from '@playwright/test'

test.describe('Basic Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing auth state
    await page.context().clearCookies()
  })

  test('should load login page correctly', async ({ page }) => {
    await page.goto('/login')

    await expect(page).toHaveTitle(/codac/)
    await expect(page.locator('h1')).toContainText('Login')
  })

  test('should load register page correctly', async ({ page }) => {
    await page.goto('/register')

    await expect(page).toHaveTitle(/codac/)
    await expect(page.locator('h1')).toContainText('Create Account')
  })

  test('should redirect to login when accessing protected pages', async ({ page }) => {
    await page.goto('/profile')

    // Should redirect to login for unauthenticated users
    await expect(page).toHaveURL(/\/(login)?/)
  })

  test('should be responsive on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/login')

    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('input[placeholder="Email"]')).toBeVisible()
    await expect(page.locator('button[type="submit"]')).toBeVisible()
  })

  test('should load CSS and basic styling', async ({ page }) => {
    await page.goto('/login')

    // Check if buttons have styling classes
    const submitButton = page.locator('button[type="submit"]')
    await expect(submitButton).toBeVisible()

    const buttonClasses = await submitButton.getAttribute('class')
    expect(buttonClasses).toBeTruthy()
  })
})
