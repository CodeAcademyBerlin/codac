import { Page, expect } from '@playwright/test'

/**
 * Common utility functions for e2e tests
 */

/**
 * Clear all authentication state and cookies
 */
export async function clearAuthState(page: Page) {
    await page.context().clearCookies()
    await page.context().clearPermissions()
}

/**
 * Fill login form with provided credentials
 */
export async function fillLoginForm(page: Page, email: string, password: string) {
    await page.fill('input[placeholder="Email"]', email)
    await page.fill('input[placeholder="Password"]', password)
}

/**
 * Fill registration form with provided data
 */
export async function fillRegistrationForm(
    page: Page,
    data: {
        name: string
        email: string
        password: string
        confirmPassword?: string
    }
) {
    await page.fill('input[placeholder="Enter your name"]', data.name)
    await page.fill('input[placeholder="Enter your email"]', data.email)
    await page.fill('input[placeholder="Enter your password"]', data.password)
    await page.fill(
        'input[placeholder="Confirm your password"]',
        data.confirmPassword || data.password
    )
}

/**
 * Submit a form and wait for response
 */
export async function submitForm(page: Page, waitTime = 2000) {
    await page.click('button[type="submit"]')
    await page.waitForTimeout(waitTime)
}

/**
 * Mock authentication API responses
 */
export async function mockAuthSuccess(page: Page) {
    await page.route('**/api/auth/**', route => {
        route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
                user: {
                    id: 'test-user-id',
                    email: 'test@example.com',
                    name: 'Test User'
                }
            })
        })
    })
}

/**
 * Mock authentication API failure
 */
export async function mockAuthFailure(page: Page, error = 'Invalid credentials') {
    await page.route('**/api/auth/**', route => {
        route.fulfill({
            status: 401,
            contentType: 'application/json',
            body: JSON.stringify({
                error: error
            })
        })
    })
}

/**
 * Mock network failure for testing offline scenarios
 */
export async function mockNetworkFailure(page: Page) {
    await page.route('**/*', route => route.abort())
}

/**
 * Wait for toast notification to appear
 */
export async function waitForToast(page: Page, message?: string) {
    if (message) {
        await expect(page.locator(`text=${message}`)).toBeVisible()
    } else {
        // Wait for any toast/notification element
        await page.waitForSelector('[role="alert"], .toast, [data-testid="toast"]', {
            timeout: 5000
        })
    }
}

/**
 * Check if user is redirected to login page
 */
export async function expectLoginRedirect(page: Page) {
    await expect(page).toHaveURL(/\/(login)?/)
}

/**
 * Test responsive design at different breakpoints
 */
export async function testResponsiveBreakpoints(
    page: Page,
    testFunction: (page: Page, viewport: string) => Promise<void>
) {
    const breakpoints = [
        { name: 'mobile', width: 375, height: 667 },
        { name: 'tablet', width: 768, height: 1024 },
        { name: 'desktop', width: 1280, height: 720 },
        { name: 'large', width: 1920, height: 1080 }
    ]

    for (const breakpoint of breakpoints) {
        await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height })
        await testFunction(page, breakpoint.name)
    }
}

/**
 * Check for accessibility violations (basic)
 */
export async function checkBasicAccessibility(page: Page) {
    // Check for proper heading structure
    const h1Count = await page.locator('h1').count()
    expect(h1Count).toBeLessThanOrEqual(1) // Should have at most one H1

    // Check for alt text on images
    const images = page.locator('img')
    const imageCount = await images.count()

    for (let i = 0; i < imageCount; i++) {
        const img = images.nth(i)
        const alt = await img.getAttribute('alt')
        const ariaLabel = await img.getAttribute('aria-label')
        expect(alt || ariaLabel).toBeTruthy() // Should have alt or aria-label
    }

    // Check for form labels
    const inputs = page.locator('input[type="text"], input[type="email"], input[type="password"]')
    const inputCount = await inputs.count()

    for (let i = 0; i < inputCount; i++) {
        const input = inputs.nth(i)
        const id = await input.getAttribute('id')
        const ariaLabel = await input.getAttribute('aria-label')
        const ariaLabelledBy = await input.getAttribute('aria-labelledby')

        if (id) {
            const label = page.locator(`label[for="${id}"]`)
            const labelExists = await label.count() > 0
            expect(labelExists || ariaLabel || ariaLabelledBy).toBeTruthy()
        }
    }
}

/**
 * Test keyboard navigation through form elements
 */
export async function testKeyboardNavigation(page: Page, expectedElements: string[]) {
    for (let i = 0; i < expectedElements.length; i++) {
        await page.keyboard.press('Tab')
        const focusedElement = page.locator(expectedElements[i])
        await expect(focusedElement).toBeFocused()
    }
}

/**
 * Fill form with invalid data for validation testing
 */
export async function fillFormWithInvalidData(page: Page, formType: 'login' | 'register') {
    if (formType === 'login') {
        await page.fill('input[placeholder="Email"]', 'invalid-email')
        await page.fill('input[placeholder="Password"]', '123') // Too short
    } else if (formType === 'register') {
        await page.fill('input[placeholder="Enter your name"]', 'A') // Too short
        await page.fill('input[placeholder="Enter your email"]', 'invalid-email')
        await page.fill('input[placeholder="Enter your password"]', '123') // Too short
        await page.fill('input[placeholder="Confirm your password"]', '456') // Doesn't match
    }
}

/**
 * Wait for loading state to complete
 */
export async function waitForLoadingComplete(page: Page) {
    // Wait for any loading spinners to disappear
    await page.waitForFunction(() => {
        const loadingElements = document.querySelectorAll('[data-loading="true"], .loading, .spinner')
        return loadingElements.length === 0
    }, { timeout: 10000 })
}

/**
 * Generate test user data
 */
export function generateTestUser() {
    const timestamp = Date.now()
    return {
        name: `Test User ${timestamp}`,
        email: `test${timestamp}@example.com`,
        password: 'TestPassword123!',
        github: 'https://github.com/testuser',
        linkedin: 'https://linkedin.com/in/testuser',
        bio: 'This is a test user bio for e2e testing.'
    }
}

/**
 * Check if element is visible in viewport
 */
export async function isElementInViewport(page: Page, selector: string): Promise<boolean> {
    return await page.evaluate((sel) => {
        const element = document.querySelector(sel)
        if (!element) return false

        const rect = element.getBoundingClientRect()
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        )
    }, selector)
}

/**
 * Capture console errors during test execution
 */
export function captureConsoleErrors(page: Page): string[] {
    const errors: string[] = []

    page.on('console', msg => {
        if (msg.type() === 'error') {
            errors.push(msg.text())
        }
    })

    page.on('pageerror', error => {
        errors.push(error.message)
    })

    return errors
} 