# Testing Guide

This guide covers how to write and run tests in the Codac project. We use multiple testing approaches to ensure code quality and reliability.

## Testing Stack

- **Jest** - Unit and integration testing
- **React Testing Library** - Component testing
- **Playwright** - End-to-end testing
- **Playwright MCP Tools** - Enhanced test automation and debugging

## Types of Tests

### 1. Unit Tests
Test individual functions and components in isolation.

**When to write:**
- Testing utility functions
- Testing component logic
- Testing server actions
- Testing custom hooks

### 2. Integration Tests
Test how multiple components work together.

**When to write:**
- Testing form submissions
- Testing data flow between components
- Testing API integrations

### 3. End-to-End (E2E) Tests
Test complete user workflows in a real browser.

**When to write:**
- Testing critical user journeys
- Testing authentication flows
- Testing cross-browser compatibility

## Unit Testing with Jest

### Setting Up Tests

Test files should be placed in `__tests__/` directory or alongside components with `.test.ts` or `.test.tsx` extensions.

```
__tests__/
├── utils.test.ts
├── components/
│   └── user-card.test.tsx
└── actions/
    └── user-actions.test.ts
```

### Basic Component Test

```typescript
// __tests__/components/user-card.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { UserCard } from '@/components/user-card'

const mockUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  createdAt: new Date(),
}

describe('UserCard', () => {
  it('should render user information', () => {
    render(<UserCard user={mockUser} />)
    
    // Check if content is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('should handle edit button click', () => {
    const mockOnEdit = jest.fn()
    render(<UserCard user={mockUser} onEdit={mockOnEdit} />)
    
    // Find and click the edit button
    const editButton = screen.getByRole('button', { name: /edit/i })
    fireEvent.click(editButton)
    
    // Verify the callback was called
    expect(mockOnEdit).toHaveBeenCalledTimes(1)
  })

  it('should not show edit button when onEdit is not provided', () => {
    render(<UserCard user={mockUser} />)
    
    // Edit button should not be present
    const editButton = screen.queryByRole('button', { name: /edit/i })
    expect(editButton).not.toBeInTheDocument()
  })
})
```

### Testing Utility Functions

```typescript
// __tests__/utils.test.ts
import { formatDate, cn } from '@/lib/utils'

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15T10:30:00Z')
    const formatted = formatDate(date)
    
    expect(formatted).toBe('Jan 15, 2024')
  })

  it('should handle invalid dates', () => {
    const invalidDate = new Date('invalid')
    const formatted = formatDate(invalidDate)
    
    expect(formatted).toBe('Invalid Date')
  })
})

describe('cn utility', () => {
  it('should combine class names', () => {
    const result = cn('base-class', 'additional-class')
    expect(result).toBe('base-class additional-class')
  })

  it('should handle conditional classes', () => {
    const isActive = true
    const result = cn('base-class', isActive && 'active-class')
    expect(result).toBe('base-class active-class')
  })
})
```

### Testing Server Actions

```typescript
// __tests__/actions/user-actions.test.ts
import { createUser } from '@/actions/user'
import { db } from '@/app/db'

// Mock the database
jest.mock('@/app/db', () => ({
  db: {
    insert: jest.fn(),
    select: jest.fn(),
  },
}))

const mockDb = db as jest.Mocked<typeof db>

describe('createUser', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create user successfully', async () => {
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
    }

    const mockUser = { id: '1', ...userData, createdAt: new Date() }
    mockDb.insert.mockResolvedValue([mockUser])

    const result = await createUser(userData)

    expect(result.success).toBe(true)
    expect(result.data).toEqual(mockUser)
    expect(mockDb.insert).toHaveBeenCalledWith(expect.objectContaining(userData))
  })

  it('should handle validation errors', async () => {
    const invalidData = {
      name: '', // Invalid - empty name
      email: 'invalid-email', // Invalid - not a valid email
    }

    const result = await createUser(invalidData)

    expect(result.success).toBe(false)
    expect(result.error).toBe('Invalid input data')
    expect(mockDb.insert).not.toHaveBeenCalled()
  })
})
```

### Testing Custom Hooks

```typescript
// __tests__/hooks/use-user-profile.test.tsx
import { renderHook, act } from '@testing-library/react'
import { useUserProfile } from '@/hooks/use-user-profile'

describe('useUserProfile', () => {
  it('should fetch user profile', async () => {
    const { result } = renderHook(() => useUserProfile('user-1'))

    // Initially loading
    expect(result.current.loading).toBe(true)
    expect(result.current.user).toBe(null)

    // Wait for the hook to update
    await act(async () => {
      // Wait for async operations to complete
    })

    expect(result.current.loading).toBe(false)
    expect(result.current.user).toBeDefined()
  })
})
```

## End-to-End Testing with Playwright

### Test Structure

E2E tests are located in the `e2e/` directory:

```
e2e/
├── auth.spec.ts          # Authentication tests
├── navigation.spec.ts    # Navigation tests
├── admin.spec.ts         # Admin functionality
├── forms.spec.ts         # Form validation
└── utils/
    └── test-helpers.ts   # Shared test utilities
```

### Basic E2E Test

```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    // Clear cookies before each test
    await page.context().clearCookies()
  })

  test('user can register with valid information', async ({ page }) => {
    await page.goto('/register')

    // Fill out registration form
    await page.fill('input[name="name"]', 'John Doe')
    await page.fill('input[name="email"]', 'john@example.com')
    await page.fill('input[name="password"]', 'SecurePassword123!')
    await page.fill('input[name="confirmPassword"]', 'SecurePassword123!')

    // Submit form
    await page.click('button[type="submit"]')

    // Should redirect to login or dashboard
    await expect(page).toHaveURL(/\/(login|dashboard)/)
  })

  test('login form shows validation errors for invalid input', async ({ page }) => {
    await page.goto('/login')

    // Try to submit empty form
    await page.click('button[type="submit"]')

    // Should show validation errors
    await expect(page.locator('text=Email is required')).toBeVisible()
    await expect(page.locator('text=Password is required')).toBeVisible()
  })

  test('user can login with valid credentials', async ({ page }) => {
    await page.goto('/login')

    // Fill login form
    await page.fill('input[name="email"]', 'existing@example.com')
    await page.fill('input[name="password"]', 'password123')

    // Submit form
    await page.click('button[type="submit"]')

    // Should redirect to dashboard
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('h1')).toContainText('Dashboard')
  })
})
```

### Using Page Object Model

For complex workflows, use the Page Object Model to keep tests maintainable:

```typescript
// e2e/utils/pages/login-page.ts
import { Page, Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.locator('input[name="email"]')
    this.passwordInput = page.locator('input[name="password"]')
    this.loginButton = page.locator('button[type="submit"]')
    this.errorMessage = page.locator('[role="alert"]')
  }

  async goto() {
    await this.page.goto('/login')
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  async expectErrorMessage(message: string) {
    await expect(this.errorMessage).toContainText(message)
  }
}

// Using the page object
test('login with invalid credentials shows error', async ({ page }) => {
  const loginPage = new LoginPage(page)
  
  await loginPage.goto()
  await loginPage.login('invalid@example.com', 'wrongpassword')
  await loginPage.expectErrorMessage('Invalid credentials')
})
```

### Testing with Playwright MCP Tools

Use MCP tools for enhanced testing automation. Our Cursor setup integrates with Playwright MCP for intelligent test generation:

```typescript
// e2e/advanced-testing.spec.ts
test('comprehensive form testing with MCP tools', async ({ page }) => {
  // Navigate to complex form
  await page.goto('/complex-form')

  // Use MCP tools for intelligent form interaction
  // The MCP tools can help with:
  // - Automatic form field detection
  // - Intelligent test data generation
  // - Cross-browser consistency validation
  // - AI-powered selector optimization
  
  // Fill form using enhanced selectors
  await page.getByLabel('Full Name').fill('John Doe')
  await page.getByLabel('Email Address').fill('john@example.com')
  await page.getByRole('combobox', { name: 'Country' }).selectOption('US')

  // Submit and verify
  await page.getByRole('button', { name: 'Submit' }).click()
  await expect(page.getByText('Form submitted successfully')).toBeVisible()
})
```

### Using Cursor AI for Test Generation

With Cursor and our rule-based setup, you can generate tests efficiently:

```
@rules/testing Generate comprehensive E2E tests for the user registration flow

@rules/testing Create unit tests for the UserCard component with all edge cases

@rules/testing Add integration tests for the authentication server actions
```

## Running Tests

### Unit Tests (Jest)

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:ci

# Run specific test file
pnpm test user-card.test.tsx

# Run tests matching a pattern
pnpm test --testNamePattern="should render"
```

### E2E Tests (Playwright)

```bash
# Run all E2E tests
pnpm test:e2e

# Run tests in UI mode (interactive)
pnpm test:e2e:ui

# Run tests in headed mode (see browser)
pnpm test:e2e:headed

# Run specific test file
pnpm playwright test auth.spec.ts

# Run tests for specific browser
pnpm playwright test --project=chromium

# Debug tests
pnpm test:e2e:debug
```

## Best Practices

### General Testing Principles

1. **Test Behavior, Not Implementation**
   ```typescript
   // ✅ Good - Testing behavior
   test('should show success message after form submission', () => {
     // Test what the user sees
   })

   // ❌ Avoid - Testing implementation details
   test('should call handleSubmit function', () => {
     // Testing internal function calls
   })
   ```

2. **Use Descriptive Test Names**
   ```typescript
   // ✅ Good - Clear and specific
   test('should display validation error when email is invalid')

   // ❌ Avoid - Vague
   test('email validation')
   ```

3. **Follow AAA Pattern**
   ```typescript
   test('should calculate total price correctly', () => {
     // Arrange
     const items = [{ price: 10 }, { price: 20 }]
     
     // Act
     const total = calculateTotal(items)
     
     // Assert
     expect(total).toBe(30)
   })
   ```

### Component Testing Best Practices

1. **Test User Interactions**
   ```typescript
   // ✅ Good - Testing user perspective
   test('should submit form when user clicks submit button', async () => {
     const mockSubmit = jest.fn()
     render(<ContactForm onSubmit={mockSubmit} />)
     
     await user.type(screen.getByLabelText('Name'), 'John Doe')
     await user.click(screen.getByRole('button', { name: 'Submit' }))
     
     expect(mockSubmit).toHaveBeenCalledWith({ name: 'John Doe' })
   })
   ```

2. **Test Accessibility**
   ```typescript
   test('form should be accessible', () => {
     render(<ContactForm />)
     
     // Check for proper labels
     expect(screen.getByLabelText('Name')).toBeInTheDocument()
     expect(screen.getByLabelText('Email')).toBeInTheDocument()
     
     // Check for proper ARIA attributes
     expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
   })
   ```

### E2E Testing Best Practices

1. **Use Stable Selectors**
   ```typescript
   // ✅ Good - Semantic selectors
   await page.getByRole('button', { name: 'Submit' })
   await page.getByLabel('Email Address')
   await page.getByText('Welcome back!')

   // ❌ Avoid - Fragile selectors
   await page.locator('.btn-primary')
   await page.locator('#email-field')
   ```

2. **Test Critical User Journeys**
   ```typescript
   test('complete user registration flow', async ({ page }) => {
     // Test the entire flow from start to finish
     await page.goto('/register')
     // ... fill form
     await page.click('button[type="submit"]')
     // ... verify email confirmation
     // ... complete profile setup
     // ... verify dashboard access
   })
   ```

3. **Use Data Attributes for Testing**
   ```tsx
   // Add data-testid for reliable element selection
   <button data-testid="submit-button" type="submit">
     Submit
   </button>
   ```

   ```typescript
   // Use in tests
   await page.getByTestId('submit-button').click()
   ```

## Debugging Tests

### Jest Debugging

1. **Use `console.log` in tests**
   ```typescript
   test('debug test', () => {
     const result = myFunction(input)
     console.log('Result:', result)  // This will show in test output
     expect(result).toBe(expected)
   })
   ```

2. **Use VS Code debugger**
   - Set breakpoints in test files
   - Run tests in debug mode
   - Step through code execution

### Playwright Debugging

1. **Use debug mode**
   ```bash
   pnpm playwright test --debug
   ```

2. **Use page.pause()**
   ```typescript
   test('debug test', async ({ page }) => {
     await page.goto('/login')
     await page.pause()  // Pauses execution for manual inspection
     // ... rest of test
   })
   ```

3. **Take screenshots**
   ```typescript
   test('visual debug', async ({ page }) => {
     await page.goto('/dashboard')
     await page.screenshot({ path: 'debug-screenshot.png' })
   })
   ```

## Common Testing Patterns

### Mocking API Calls

```typescript
// Mock fetch for unit tests
global.fetch = jest.fn()

test('should handle API error', async () => {
  (fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'))
  
  const result = await fetchUserData('user-1')
  expect(result.error).toBe('Failed to fetch user data')
})
```

### Testing Error Boundaries

```typescript
test('should display error message when component throws', () => {
  const ThrowError = () => {
    throw new Error('Test error')
  }

  render(
    <ErrorBoundary>
      <ThrowError />
    </ErrorBoundary>
  )

  expect(screen.getByText('Something went wrong')).toBeInTheDocument()
})
```

### Testing Form Validation

```typescript
test('should validate required fields', async () => {
  render(<ContactForm onSubmit={jest.fn()} />)
  
  // Try to submit empty form
  await user.click(screen.getByRole('button', { name: 'Submit' }))
  
  // Check for validation messages
  expect(screen.getByText('Name is required')).toBeInTheDocument()
  expect(screen.getByText('Email is required')).toBeInTheDocument()
})
```

## Continuous Integration

Tests run automatically in CI/CD pipeline:

- **Unit tests** run on every push
- **E2E tests** run on pull requests and main branch
- **Coverage reports** are generated and tracked
- **Performance tests** run nightly

## Getting Help

If you need help with testing:

1. **Check existing tests** - Look for similar test patterns in the codebase
2. **Read documentation** - Jest, React Testing Library, and Playwright docs
3. **Ask questions** - Don't hesitate to ask for help in code review
4. **Test incrementally** - Start with simple tests and build complexity

Remember: Good tests make refactoring safer and bugs less likely. Invest time in writing quality tests! 