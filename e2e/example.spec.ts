import { expect, test } from '@playwright/test'

test.describe('Example E2E Tests', () => {
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

  test('network interception example', async ({ page }) => {
    // Intercept API calls
    await page.route('**/api/**', (route) => {
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
