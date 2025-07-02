# E2E Tests for codac

This directory contains end-to-end (e2e) tests for the codac learning management system using [Playwright](https://playwright.dev/).

## Test Structure

Our e2e tests are organized into several categories:

### 📁 Test Files

- **`auth.spec.ts`** - Authentication flows (login, register, validation)
- **`navigation.spec.ts`** - Basic navigation and page accessibility
- **`admin.spec.ts`** - Admin dashboard functionality and role-based access
- **`forms-validation.spec.ts`** - Comprehensive form validation and accessibility
- **`profile.spec.ts`** - Profile management functionality
- **`ui-interactions.spec.ts`** - UI interactions, edge cases, and UX testing
- **`example.spec.ts`** - Simple examples for reference

## Running Tests

### Prerequisites

1. Make sure your development server is running:
   ```bash
   pnpm dev
   ```

2. Install Playwright browsers (if not already installed):
   ```bash
   pnpm playwright install
   ```

### Running All Tests

```bash
# Run all e2e tests
pnpm test:e2e

# Run tests in UI mode (interactive)
pnpm test:e2e:ui

# Run tests in headed mode (see browser)
pnpm playwright test --headed

# Run specific test file
pnpm playwright test auth.spec.ts
```

### Running Tests in Different Browsers

```bash
# Run in specific browser
pnpm playwright test --project=chromium
pnpm playwright test --project=firefox
pnpm playwright test --project=webkit
```

### Debug Mode

```bash
# Run in debug mode
pnpm playwright test --debug

# Run specific test in debug mode
pnpm playwright test auth.spec.ts --debug
```

## Test Categories Explained

### 🔐 Authentication Tests (`auth.spec.ts`)

Tests the complete authentication flow:
- Registration form validation
- Login form validation  
- Navigation between auth pages
- Error handling for invalid credentials
- Google OAuth button presence

### 🧭 Navigation Tests (`navigation.spec.ts`)

Tests basic navigation and page loading:
- Page titles and meta tags
- Protected route redirects
- Responsive design on different viewports
- 404 error handling
- CSS and styling verification

### 👨‍💼 Admin Tests (`admin.spec.ts`)

Tests admin-specific functionality:
- Role-based access control
- Dashboard statistics display
- Admin UI components
- Responsive admin interface

### 📝 Form Validation Tests (`forms-validation.spec.ts`)

Comprehensive form testing:
- Real-time validation
- Accessibility features (ARIA, labels)
- Keyboard navigation
- Error message display
- Loading states
- Network error handling

### 👤 Profile Tests (`profile.spec.ts`)

Tests user profile functionality:
- Profile page access control
- Profile form validation
- Avatar display
- Security considerations

### 🎨 UI Interaction Tests (`ui-interactions.spec.ts`)

Tests advanced UI interactions:
- Loading states and performance
- Toast notifications
- Browser compatibility
- Input edge cases
- Accessibility features
- Security considerations
- Mobile-specific interactions

## Writing New Tests

### Best Practices

1. **Use descriptive test names**:
   ```typescript
   test('should display validation error for invalid email format', async ({ page }) => {
     // Test implementation
   })
   ```

2. **Clear test state before each test**:
   ```typescript
   test.beforeEach(async ({ page }) => {
     await page.context().clearCookies()
   })
   ```

3. **Use proper selectors**:
   ```typescript
   // Good - semantic selectors
   await page.locator('button[type="submit"]').click()
   await page.locator('input[placeholder="Email"]').fill('test@example.com')
   
   // Avoid - brittle CSS selectors
   await page.locator('.btn-primary').click()
   ```

4. **Handle async operations properly**:
   ```typescript
   // Wait for elements to be visible
   await expect(page.locator('h1')).toBeVisible()
   
   // Wait for navigation
   await expect(page).toHaveURL('/dashboard')
   ```

5. **Test both success and failure cases**:
   ```typescript
   test('should handle network errors gracefully', async ({ page }) => {
     await page.route('**/api/**', route => route.abort())
     // Test error handling
   })
   ```

### Test Organization

Group related tests using `test.describe()`:

```typescript
test.describe('Form Validation', () => {
  test.describe('Login Form', () => {
    test('should validate email format', async ({ page }) => {
      // Test implementation
    })
  })
})
```

### Mocking and Test Data

For authentication-required tests, you may need to:

1. Create test users in your database
2. Use authentication helpers
3. Mock API responses for consistent testing

```typescript
// Example: Mock successful login
await page.route('**/api/auth/**', route => {
  route.fulfill({
    status: 200,
    body: JSON.stringify({ success: true })
  })
})
```

## Configuration

The Playwright configuration is in `playwright.config.ts` at the root level. Key settings:

- **Base URL**: `http://localhost:3000`
- **Test directory**: `./e2e`
- **Browsers**: Chrome, Firefox, Safari
- **Retries**: 2 retries on CI, 0 locally
- **Reporter**: HTML reporter

## CI/CD Integration

These tests are designed to run in CI environments. Make sure your CI pipeline:

1. Starts the Next.js application
2. Waits for the server to be ready
3. Runs the Playwright tests
4. Publishes test results

## Troubleshooting

### Common Issues

1. **Tests failing due to timing**:
   - Use `await expect()` instead of `await page.waitForTimeout()`
   - Use proper locator strategies

2. **Flaky tests**:
   - Ensure proper test isolation
   - Use deterministic test data
   - Handle async operations correctly

3. **Browser not found**:
   ```bash
   pnpm playwright install
   ```

### Debug Tips

1. **Use the trace viewer**:
   ```bash
   pnpm playwright test --trace on
   pnpm playwright show-trace
   ```

2. **Screenshots on failure**:
   Tests automatically capture screenshots on failure.

3. **Console logs**:
   ```typescript
   page.on('console', msg => console.log(msg.text()))
   ```

## Contributing

When adding new features to the application:

1. Add corresponding e2e tests
2. Update existing tests if UI changes
3. Ensure tests pass locally before committing
4. Consider adding tests for edge cases and error scenarios

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [API Reference](https://playwright.dev/docs/api/class-playwright) 