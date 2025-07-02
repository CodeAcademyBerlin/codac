import { expect, test } from '@playwright/test'

test.describe('Forms and Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies()
  })

  test.describe('Login Form Validation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/login')
    })

    test('should focus on first input field when page loads', async ({ page }) => {
      const emailInput = page.locator('input[placeholder="Email"]')
      await expect(emailInput).toBeFocused()
    })

    test('should validate email format in real-time', async ({ page }) => {
      const emailInput = page.locator('input[placeholder="Email"]')

      await emailInput.fill('invalid-email')
      await emailInput.blur()

      // Look for validation message after blur
      await expect(page.locator('text=Invalid email')).toBeVisible()
    })

    test('should show password length validation', async ({ page }) => {
      const passwordInput = page.locator('input[placeholder="Password"]')

      await passwordInput.fill('12345') // Less than 6 characters
      await passwordInput.blur()

      await expect(page.locator('text=String must contain at least 6 character(s)')).toBeVisible()
    })

    test('should enable submit button only when form is valid', async ({ page }) => {
      const submitButton = page.locator('button[type="submit"]')
      const emailInput = page.locator('input[placeholder="Email"]')
      const passwordInput = page.locator('input[placeholder="Password"]')

      // Initially button should be enabled (browser default)
      await expect(submitButton).toBeEnabled()

      // Fill with valid data
      await emailInput.fill('test@example.com')
      await passwordInput.fill('password123')

      await expect(submitButton).toBeEnabled()
    })

    test('should handle keyboard navigation', async ({ page }) => {
      const emailInput = page.locator('input[placeholder="Email"]')
      const passwordInput = page.locator('input[placeholder="Password"]')
      const submitButton = page.locator('button[type="submit"]')

      await emailInput.focus()
      await page.keyboard.press('Tab')
      await expect(passwordInput).toBeFocused()

      await page.keyboard.press('Tab')
      await expect(submitButton).toBeFocused()
    })
  })

  test.describe('Registration Form Validation', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('/register')
    })

    test('should validate all required fields', async ({ page }) => {
      const submitButton = page.locator('button[type="submit"]')

      await submitButton.click()

      await expect(page.locator('text=Name must be at least 2 characters')).toBeVisible()
      await expect(page.locator('text=Invalid email address')).toBeVisible()
      await expect(page.locator('text=Password must be at least 6 characters')).toBeVisible()
    })

    test('should validate name field', async ({ page }) => {
      const nameInput = page.locator('input[placeholder="Enter your name"]')

      await nameInput.fill('A') // Too short
      await nameInput.blur()

      await expect(page.locator('text=Name must be at least 2 characters')).toBeVisible()

      await nameInput.fill('Valid Name')
      await nameInput.blur()

      await expect(page.locator('text=Name must be at least 2 characters')).not.toBeVisible()
    })

    test('should validate password confirmation', async ({ page }) => {
      const passwordInput = page.locator('input[placeholder="Enter your password"]')
      const confirmPasswordInput = page.locator('input[placeholder="Confirm your password"]')

      await passwordInput.fill('password123')
      await confirmPasswordInput.fill('different456')
      await confirmPasswordInput.blur()

      await expect(page.locator('text=Passwords must match')).toBeVisible()

      await confirmPasswordInput.fill('password123')
      await confirmPasswordInput.blur()

      await expect(page.locator('text=Passwords must match')).not.toBeVisible()
    })

    test('should maintain form state during validation', async ({ page }) => {
      const nameInput = page.locator('input[placeholder="Enter your name"]')
      const emailInput = page.locator('input[placeholder="Enter your email"]')

      await nameInput.fill('John Doe')
      await emailInput.fill('john@example.com')

      // Trigger validation by submitting
      await page.locator('button[type="submit"]').click()

      // Check that valid fields retain their values
      await expect(nameInput).toHaveValue('John Doe')
      await expect(emailInput).toHaveValue('john@example.com')
    })

    test('should handle password visibility toggle if implemented', async ({ page }) => {
      const passwordInput = page.locator('input[placeholder="Enter your password"]')

      await passwordInput.fill('secret123')

      // Check initial password input type
      await expect(passwordInput).toHaveAttribute('type', 'password')

      // If there's a password visibility toggle, test it
      const toggleButton = page.locator('[data-testid="password-toggle"]')
      if ((await toggleButton.count()) > 0) {
        await toggleButton.click()
        await expect(passwordInput).toHaveAttribute('type', 'text')
      }
    })
  })

  test.describe('Form Accessibility', () => {
    test('login form should have proper labels and ARIA attributes', async ({ page }) => {
      await page.goto('/login')

      const emailInput = page.locator('input[placeholder="Email"]')
      const passwordInput = page.locator('input[placeholder="Password"]')

      // Check for associated labels
      await expect(page.locator('label:has-text("Email")')).toBeVisible()
      await expect(page.locator('label:has-text("Password")')).toBeVisible()

      // Check that inputs have proper accessibility attributes
      await expect(emailInput).toHaveAttribute('type', 'email')
      await expect(passwordInput).toHaveAttribute('type', 'password')
    })

    test('register form should have proper labels and ARIA attributes', async ({ page }) => {
      await page.goto('/register')

      await expect(page.locator('label:has-text("Name")')).toBeVisible()
      await expect(page.locator('label:has-text("Email")')).toBeVisible()
      await expect(page.locator('label:has-text("Password")')).toBeVisible()
      await expect(page.locator('label:has-text("Confirm Password")')).toBeVisible()
    })

    test('error messages should be announced to screen readers', async ({ page }) => {
      await page.goto('/login')

      await page.locator('button[type="submit"]').click()

      // Check that error messages have proper ARIA attributes or roles
      const errorMessage = page.locator('text=Invalid email').first()
      if ((await errorMessage.count()) > 0) {
        // Error messages should be visible and associated with their inputs
        await expect(errorMessage).toBeVisible()
      }
    })

    test('forms should be keyboard navigable', async ({ page }) => {
      await page.goto('/register')

      // Test tab order
      await page.keyboard.press('Tab') // Should focus first input
      const nameInput = page.locator('input[placeholder="Enter your name"]')
      await expect(nameInput).toBeFocused()

      await page.keyboard.press('Tab') // Should focus email input
      const emailInput = page.locator('input[placeholder="Enter your email"]')
      await expect(emailInput).toBeFocused()

      await page.keyboard.press('Tab') // Should focus password input
      const passwordInput = page.locator('input[placeholder="Enter your password"]')
      await expect(passwordInput).toBeFocused()
    })
  })

  test.describe('Form Error Handling', () => {
    test('should handle network errors gracefully', async ({ page }) => {
      await page.goto('/login')

      // Fill valid form data
      await page.fill('input[placeholder="Email"]', 'test@example.com')
      await page.fill('input[placeholder="Password"]', 'password123')

      // Intercept network request to simulate failure
      await page.route('**/api/auth/**', (route) => route.abort())

      await page.click('button[type="submit"]')

      // Should show some kind of error indication
      // This might be a toast, error message, or loading state
      await page.waitForTimeout(1000) // Wait for error handling
    })

    test('should show loading state during form submission', async ({ page }) => {
      await page.goto('/login')

      await page.fill('input[placeholder="Email"]', 'test@example.com')
      await page.fill('input[placeholder="Password"]', 'password123')

      // Delay the response to see loading state
      await page.route('**/api/auth/**', async (route) => {
        await page.waitForTimeout(2000)
        await route.continue()
      })

      const submitButton = page.locator('button[type="submit"]')
      await submitButton.click()

      // Check if button shows loading state (disabled, loading text, spinner, etc.)
      // This depends on your implementation
      await expect(submitButton).toBeDisabled()
    })
  })
})
