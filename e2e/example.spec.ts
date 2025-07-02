import { test, expect } from '@playwright/test'

test.describe('Example E2E Tests', () => {
    test('basic page navigation example', async ({ page }) => {
        // Navigate to the login page
        await page.goto('/login')

        // Check that the page loaded correctly
        await expect(page).toHaveTitle(/codac/)
        await expect(page.locator('h1')).toBeVisible()
    })

    test('form interaction example', async ({ page }) => {
        await page.goto('/login')

        // Fill out the form
        await page.fill('input[placeholder="Email"]', 'example@test.com')
        await page.fill('input[placeholder="Password"]', 'testpassword')

        // Click the submit button
        await page.click('button[type="submit"]')

        // Wait for response/redirect
        await page.waitForTimeout(1000)
    })

    test('responsive design example', async ({ page }) => {
        // Test desktop view
        await page.setViewportSize({ width: 1280, height: 720 })
        await page.goto('/login')
        await expect(page.locator('h1')).toBeVisible()

        // Test mobile view
        await page.setViewportSize({ width: 375, height: 667 })
        await expect(page.locator('h1')).toBeVisible()
    })

    test('network interception example', async ({ page }) => {
        // Intercept API calls
        await page.route('**/api/**', route => {
            console.log(`Intercepted: ${route.request().method()} ${route.request().url()}`)
            route.continue()
        })

        await page.goto('/login')
        await page.fill('input[placeholder="Email"]', 'test@example.com')
        await page.fill('input[placeholder="Password"]', 'password123')
        await page.click('button[type="submit"]')

        await page.waitForTimeout(1000)
    })
}) 