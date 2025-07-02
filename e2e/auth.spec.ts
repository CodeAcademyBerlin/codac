import { expect, test } from '@playwright/test'

test.describe('Authentication Pages', () => {
  test.beforeEach(async ({ page }) => {
    // Clear any existing auth state
    await page.context().clearCookies()
  })

  test.describe('Login Page', () => {
    test('should display login form correctly', async ({ page }) => {
      await page.goto('/login')

      await expect(page.locator('h1')).toContainText('Login')
      await expect(page.locator('input[placeholder="Email"]')).toBeVisible()
      await expect(page.locator('input[placeholder="Password"]')).toBeVisible()
      await expect(page.locator('button[type="submit"]')).toContainText('Login')
      await expect(page.locator('text=Login with Google')).toBeVisible()
    })

    test('should have link to register page', async ({ page }) => {
      await page.goto('/login')

      const registerLink = page.locator('a[href="/register"]')
      await expect(registerLink).toBeVisible()
      await expect(registerLink).toContainText('Sign up')
    })
  })

  test.describe('Register Page', () => {
    test('should display registration form correctly', async ({ page }) => {
      await page.goto('/register')

      await expect(page.locator('h1')).toContainText('Create Account')
      await expect(page.locator('input[placeholder="Enter your name"]')).toBeVisible()
      await expect(page.locator('input[placeholder="Enter your email"]')).toBeVisible()
      await expect(page.locator('input[placeholder="Enter your password"]')).toBeVisible()
      await expect(page.locator('input[placeholder="Confirm your password"]')).toBeVisible()
      await expect(page.locator('button[type="submit"]')).toContainText('Create Account')
    })

    test('should have link to login page', async ({ page }) => {
      await page.goto('/register')

      const loginLink = page.locator('a[href="/login"]')
      await expect(loginLink).toBeVisible()
      await expect(loginLink).toContainText('Sign in')
    })
  })

  test.describe('Navigation', () => {
    test('should navigate between auth pages', async ({ page }) => {
      await page.goto('/login')

      await Promise.all([page.waitForURL('/register'), page.click('text=Sign up')])

      await expect(page).toHaveURL('/register')

      await Promise.all([page.waitForURL('/login'), page.click('text=Sign in')])

      await expect(page).toHaveURL('/login')
    })
  })
})
