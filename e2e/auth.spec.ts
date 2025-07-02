import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
    test.beforeEach(async ({ page }) => {
        // Clear any existing auth state
        await page.context().clearCookies()
    })

    test.describe('Registration', () => {
        test('should display registration form', async ({ page }) => {
            await page.goto('/register')

            await expect(page.locator('h1')).toContainText('Create Account')
            await expect(page.locator('input[placeholder="Enter your name"]')).toBeVisible()
            await expect(page.locator('input[placeholder="Enter your email"]')).toBeVisible()
            await expect(page.locator('input[placeholder="Enter your password"]')).toBeVisible()
            await expect(page.locator('input[placeholder="Confirm your password"]')).toBeVisible()
            await expect(page.locator('button[type="submit"]')).toContainText('Create Account')
        })

        test('should show validation errors for empty fields', async ({ page }) => {
            await page.goto('/register')

            await page.click('button[type="submit"]')

            await expect(page.locator('text=Name must be at least 2 characters')).toBeVisible()
            await expect(page.locator('text=Invalid email address')).toBeVisible()
            await expect(page.locator('text=Password must be at least 6 characters')).toBeVisible()
        })

        test('should show validation error for password mismatch', async ({ page }) => {
            await page.goto('/register')

            await page.fill('input[placeholder="Enter your name"]', 'Test User')
            await page.fill('input[placeholder="Enter your email"]', 'test@example.com')
            await page.fill('input[placeholder="Enter your password"]', 'password123')
            await page.fill('input[placeholder="Confirm your password"]', 'differentpassword')

            await page.click('button[type="submit"]')

            await expect(page.locator('text=Passwords must match')).toBeVisible()
        })

        test('should show validation error for invalid email', async ({ page }) => {
            await page.goto('/register')

            await page.fill('input[placeholder="Enter your name"]', 'Test User')
            await page.fill('input[placeholder="Enter your email"]', 'invalid-email')
            await page.fill('input[placeholder="Enter your password"]', 'password123')
            await page.fill('input[placeholder="Confirm your password"]', 'password123')

            await page.click('button[type="submit"]')

            await expect(page.locator('text=Invalid email address')).toBeVisible()
        })

        test('should have link to login page', async ({ page }) => {
            await page.goto('/register')

            const loginLink = page.locator('a[href="/login"]')
            await expect(loginLink).toBeVisible()
            await expect(loginLink).toContainText('Sign in')
        })
    })

    test.describe('Login', () => {
        test('should display login form', async ({ page }) => {
            await page.goto('/login')

            await expect(page.locator('h1')).toContainText('Login')
            await expect(page.locator('input[placeholder="Email"]')).toBeVisible()
            await expect(page.locator('input[placeholder="Password"]')).toBeVisible()
            await expect(page.locator('button[type="submit"]')).toContainText('Login')
            await expect(page.locator('text=Login with Google')).toBeVisible()
        })

        test('should show validation errors for empty fields', async ({ page }) => {
            await page.goto('/login')

            await page.click('button[type="submit"]')

            await expect(page.locator('text=Invalid email')).toBeVisible()
            await expect(page.locator('text=String must contain at least 6 character(s)')).toBeVisible()
        })

        test('should show validation error for invalid email format', async ({ page }) => {
            await page.goto('/login')

            await page.fill('input[placeholder="Email"]', 'invalid-email')
            await page.fill('input[placeholder="Password"]', 'password123')

            await page.click('button[type="submit"]')

            await expect(page.locator('text=Invalid email')).toBeVisible()
        })

        test('should have link to register page', async ({ page }) => {
            await page.goto('/login')

            const registerLink = page.locator('a[href="/register"]')
            await expect(registerLink).toBeVisible()
            await expect(registerLink).toContainText('Sign up')
        })

        test('should display Google login button', async ({ page }) => {
            await page.goto('/login')

            const googleButton = page.locator('text=Login with Google')
            await expect(googleButton).toBeVisible()
            await expect(googleButton).toHaveAttribute('type', 'button')
        })
    })

    test.describe('Navigation between auth pages', () => {
        test('should navigate from login to register', async ({ page }) => {
            await page.goto('/login')
            await page.click('a[href="/register"]')

            await expect(page).toHaveURL('/register')
            await expect(page.locator('h1')).toContainText('Create Account')
        })

        test('should navigate from register to login', async ({ page }) => {
            await page.goto('/register')
            await page.click('a[href="/login"]')

            await expect(page).toHaveURL('/login')
            await expect(page.locator('h1')).toContainText('Login')
        })
    })
}) 