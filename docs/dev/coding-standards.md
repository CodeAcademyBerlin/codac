# Coding Standards

This document outlines the coding standards and best practices we follow in the Codac project. Following these standards helps maintain code quality and makes collaboration easier.

## TypeScript Guidelines

### Basic Principles
- **Always use TypeScript** - No plain JavaScript files
- **Strict mode enabled** - Our tsconfig.json has strict settings
- **Explicit types** - Prefer explicit types over `any`
- **Type imports** - Use `import type` for type-only imports

### Type Definitions
```typescript
// ✅ Good - Explicit types
interface User {
  id: string
  name: string
  email: string
  createdAt: Date
}

function getUser(id: string): Promise<User | null> {
  // implementation
}

// ❌ Avoid - Using 'any'
function getUser(id: any): any {
  // implementation
}
```

### Naming Conventions

#### Variables and Functions
```typescript
// ✅ Good - camelCase
const userName = 'john_doe'
const isAuthenticated = true
const getUserProfile = () => { /* ... */ }

// ❌ Avoid
const user_name = 'john_doe'  // snake_case
const IsAuthenticated = true  // PascalCase for variables
```

#### Types and Interfaces
```typescript
// ✅ Good - PascalCase
interface UserProfile {
  id: string
  name: string
}

type ServerActionResult<T = void> = {
  success: boolean
  data?: T
  error?: string
}

// ❌ Avoid
interface userProfile { /* ... */ }  // camelCase
type serverActionResult<T> = { /* ... */ }  // camelCase
```

#### Constants
```typescript
// ✅ Good - SCREAMING_SNAKE_CASE
const MAX_FILE_SIZE = 5 * 1024 * 1024  // 5MB
const API_BASE_URL = 'https://api.example.com'

// ❌ Avoid
const maxFileSize = 5 * 1024 * 1024  // camelCase for constants
```

## React Component Guidelines

### Component Structure
```typescript
// ✅ Good component structure
interface UserCardProps {
  user: User
  onEdit?: () => void
  className?: string
}

export function UserCard({ user, onEdit, className }: UserCardProps) {
  // Hooks at the top
  const [isEditing, setIsEditing] = useState(false)
  const { toast } = useToast()

  // Event handlers
  const handleEdit = () => {
    setIsEditing(true)
    onEdit?.()
  }

  // Early returns
  if (!user) {
    return <div>No user data</div>
  }

  // Main render
  return (
    <div className={cn('border rounded-lg p-4', className)}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {onEdit && (
        <Button onClick={handleEdit}>Edit</Button>
      )}
    </div>
  )
}
```

### Component Naming
- **Files**: kebab-case (`user-profile.tsx`)
- **Components**: PascalCase (`UserProfile`)
- **Props interfaces**: Component name + "Props" (`UserProfileProps`)

### Hooks Usage
```typescript
// ✅ Good - Hooks at component top
function UserProfile() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    loadUser()
  }, [])

  // ... rest of component
}

// ❌ Avoid - Hooks in conditions or loops
function UserProfile() {
  if (someCondition) {
    const [user, setUser] = useState<User | null>(null)  // ❌ Wrong
  }
}
```

## Server Actions

### Structure
```typescript
'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'

// Input validation schema
const CreateUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

export async function createUser(input: z.infer<typeof CreateUserSchema>) {
  try {
    // Validate input
    const validatedInput = CreateUserSchema.parse(input)
    
    // Database operation
    const user = await db.insert(users).values(validatedInput)
    
    // Revalidate relevant paths
    revalidatePath('/users')
    
    return { success: true, data: user }
  } catch (error) {
    console.error('Failed to create user:', error)
    return { success: false, error: 'Failed to create user' }
  }
}
```

### Return Types
Always return a consistent result type:
```typescript
type ServerActionResult<T = void> = {
  success: boolean
  data?: T
  error?: string
}
```

## Styling Guidelines

### Tailwind CSS
```typescript
// ✅ Good - Semantic class combinations
<div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
  <h2 className="text-lg font-semibold text-gray-900">Title</h2>
  <Button variant="outline" size="sm">Edit</Button>
</div>

// ❌ Avoid - Too many utility classes in one line
<div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
```

### Conditional Classes
Use the `cn()` utility for conditional classes:
```typescript
import { cn } from '@/lib/utils'

// ✅ Good
<Button 
  className={cn(
    'px-4 py-2 rounded',
    isActive && 'bg-blue-500 text-white',
    isDisabled && 'opacity-50 cursor-not-allowed'
  )}
>
  Click me
</Button>

// ❌ Avoid - String concatenation
<Button className={`px-4 py-2 rounded ${isActive ? 'bg-blue-500 text-white' : ''}`}>
```

## Error Handling

### Client-Side Errors
```typescript
// ✅ Good - Proper error handling
async function handleSubmit(data: FormData) {
  try {
    const result = await createUser(data)
    
    if (result.success) {
      toast({ title: 'Success', description: 'User created successfully' })
    } else {
      toast({ 
        title: 'Error', 
        description: result.error || 'Something went wrong',
        variant: 'destructive' 
      })
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    toast({ 
      title: 'Error', 
      description: 'An unexpected error occurred',
      variant: 'destructive' 
    })
  }
}
```

### Server-Side Errors
```typescript
// ✅ Good - Consistent error handling
export async function createUser(input: CreateUserInput) {
  try {
    // Validation
    const validatedInput = CreateUserSchema.parse(input)
    
    // Business logic
    const user = await db.insert(users).values(validatedInput)
    
    return { success: true, data: user }
  } catch (error) {
    console.error('Create user failed:', error)
    
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid input data' }
    }
    
    return { success: false, error: 'Failed to create user' }
  }
}
```

## Database Guidelines

### Schema Definitions
```typescript
// ✅ Good - Clear, typed schema
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})
```

### Queries
```typescript
// ✅ Good - Type-safe queries
const user = await db
  .select()
  .from(users)
  .where(eq(users.id, userId))
  .limit(1)

// ✅ Good - Proper error handling
try {
  const users = await db.select().from(users)
  return users
} catch (error) {
  console.error('Database query failed:', error)
  throw new Error('Failed to fetch users')
}
```

## Testing Guidelines

### Unit Tests
```typescript
// ✅ Good - Descriptive test names
describe('UserCard component', () => {
  it('should display user name and email', () => {
    const user = { id: '1', name: 'John Doe', email: 'john@example.com' }
    render(<UserCard user={user} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('john@example.com')).toBeInTheDocument()
  })

  it('should call onEdit when edit button is clicked', () => {
    const mockOnEdit = jest.fn()
    const user = { id: '1', name: 'John Doe', email: 'john@example.com' }
    
    render(<UserCard user={user} onEdit={mockOnEdit} />)
    fireEvent.click(screen.getByRole('button', { name: /edit/i }))
    
    expect(mockOnEdit).toHaveBeenCalledTimes(1)
  })
})
```

### E2E Tests
```typescript
// ✅ Good - User-focused test scenarios
test('user can create and edit a profile', async ({ page }) => {
  await page.goto('/profile')
  
  // Fill out profile form
  await page.fill('input[name="name"]', 'John Doe')
  await page.fill('input[name="email"]', 'john@example.com')
  await page.click('button[type="submit"]')
  
  // Verify success
  await expect(page.locator('text=Profile saved')).toBeVisible()
})
```

## Code Review Checklist

Before submitting a pull request, make sure:

- [ ] Code follows TypeScript strict mode
- [ ] All components have proper TypeScript interfaces
- [ ] Error handling is implemented consistently
- [ ] Tests are written for new functionality
- [ ] Code is formatted with Biome (`pnpm format`)
- [ ] No console.errors in production code (use proper logging)
- [ ] Accessibility considerations are addressed
- [ ] Performance implications are considered

## Common Mistakes to Avoid

### TypeScript
- Using `any` type instead of proper typing
- Not handling null/undefined cases
- Missing return type annotations for functions

### React
- Forgetting to add dependencies to useEffect
- Not memoizing expensive calculations
- Using index as key in lists with dynamic data

### Performance
- Not lazy loading heavy components
- Fetching data in useEffect instead of server components
- Not optimizing images with Next.js Image component

### Security
- Not validating server action inputs
- Exposing sensitive data in client components
- Not implementing proper authentication checks

## Getting Help

If you're unsure about any of these standards:
1. Look at existing code examples in the project
2. Use Cursor AI with `@rules` to reference our coding standards
3. Ask questions in code review
4. Check the official documentation for the technologies we use
5. Don't hesitate to ask team members for clarification

## Using Cursor AI Effectively

### Prompt Examples for This Project
```
@rules/typescript Create a new server action for user management following our patterns

@rules/ui-and-styling Style this component using Tailwind CSS and our design system

@rules/testing Write comprehensive tests for this component following our testing guide
``` 