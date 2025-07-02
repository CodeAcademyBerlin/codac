# Troubleshooting Guide

This guide helps resolve common issues encountered during development of the Codac project.

## Development Server Issues

### Port Already in Use
```bash
# Error: Port 3000 is already in use
# Solution: Kill the process using the port
lsof -ti:3000 | xargs kill -9

# Or use a different port
pnpm dev -- -p 3001
```

### Server Won't Start
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Start fresh
pnpm dev
```

### Hot Reload Not Working
```bash
# Check if you're in the right directory
pwd

# Restart the dev server
# Ctrl+C to stop, then
pnpm dev

# Clear browser cache
# Ctrl+Shift+R (hard refresh)
```

## Database Issues

### Migration Errors
```bash
# Error: Schema out of sync
# Solution: Reset and push schema
pnpm db:push --force

# Generate new migration
pnpm db:generate

# Check migration files in drizzle/ folder
```

### Connection Issues
```bash
# Check environment variables
cat .env.local

# Verify PostgreSQL database URL format
# PostgreSQL: postgresql://user:pass@localhost:5432/dbname
```

### Schema Changes Not Applied
```bash
# Generate migration after schema changes
pnpm db:generate

# Apply migration
pnpm db:push

# Verify in database studio
pnpm db:studio
```

## TypeScript Issues

### Type Errors
```typescript
// Error: Property 'x' does not exist on type 'y'
// Solution: Check interface definitions

// Add proper typing
interface User {
  id: string
  name: string
  email: string
}

// Or use type assertion (last resort)
const user = data as User
```

### Import Errors
```typescript
// Error: Cannot find module '@/components/ui/button'
// Solution: Check if file exists and path is correct

// Use correct absolute path
import { Button } from '@/components/ui/button'

// Or relative path
import { Button } from '../ui/button'
```

### Build Errors
```bash
# Type checking during build
pnpm build

# Fix type errors before committing
pnpm type-check
```

## Authentication Issues

### NextAuth Errors
```bash
# Error: NEXTAUTH_SECRET not set
# Solution: Add to .env.local
NEXTAUTH_SECRET=your-secret-key-here

# Error: NEXTAUTH_URL not set
NEXTAUTH_URL=http://localhost:3000
```

### Session Issues
```typescript
// Check if SessionProvider is wrapped correctly
// In app/layout.tsx
import { SessionProvider } from '@/components/providers/session-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
```

## Testing Issues

### Jest Tests Failing
```bash
# Clear Jest cache
pnpm test --clearCache

# Run specific test
pnpm test user.test.ts

# Run in watch mode
pnpm test:watch
```

### Playwright Tests Failing
```bash
# Install browsers
pnpm playwright install

# Run in headed mode to see what's happening
pnpm playwright test --headed

# Debug specific test
pnpm playwright test auth.spec.ts --debug
```

### Mock Issues
```typescript
// Mock external dependencies
jest.mock('@/lib/api', () => ({
  fetchUser: jest.fn(),
}))

// Clear mocks between tests
beforeEach(() => {
  jest.clearAllMocks()
})
```

## Styling Issues

### Tailwind Not Working
```bash
# Check if Tailwind is installed
pnpm list tailwindcss

# Verify tailwind.config.ts content paths
content: [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
]

# Restart dev server after config changes
```

### CSS Not Loading
```tsx
// Check if globals.css is imported in layout
// app/layout.tsx
import './globals.css'
```

### Responsive Issues
```tsx
// Check viewport meta tag
// app/layout.tsx
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

## Performance Issues

### Slow Build Times
```bash
# Use Turbo for faster builds
pnpm dev --turbo

# Check for large dependencies
pnpm ls --depth=0
```

### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm dev
```

## Environment Issues

### Missing Environment Variables
```bash
# Check required variables
cat .env.example

# Copy to local environment
cp .env.example .env.local

# Edit with your values
nano .env.local
```

### Different Environments
```bash
# Development
NODE_ENV=development pnpm dev

# Production build
NODE_ENV=production pnpm build
```

## Git Issues

### Merge Conflicts
```bash
# Pull latest changes
git pull origin main

# Resolve conflicts in files
# Edit conflicted files, remove conflict markers

# Add resolved files
git add .
git commit -m "resolve merge conflicts"
```

### Wrong Branch
```bash
# Switch to correct branch
git checkout main

# Create new branch from main
git checkout -b feature/new-feature
```

## Package Manager Issues

### pnpm Issues
```bash
# Clear pnpm cache
pnpm store prune

# Reinstall dependencies
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Version Conflicts
```bash
# Check for conflicting versions
pnpm audit

# Update dependencies
pnpm update

# Fix security issues
pnpm audit fix
```

## Browser Issues

### CORS Errors
```typescript
// Add CORS headers in API routes
// app/api/example/route.ts
export async function GET(request: Request) {
  return Response.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
```

### Local Storage Issues
```typescript
// Check if running in browser
if (typeof window !== 'undefined') {
  localStorage.setItem('key', 'value')
}
```

## Common Error Messages

### "Module not found"
- Check file path and spelling
- Verify file exists
- Check import statement syntax

### "Cannot read property of undefined"
- Add null/undefined checks
- Use optional chaining: `user?.name`
- Provide default values

### "Hydration failed"
- Ensure server and client render the same
- Check for browser-only code in server components
- Use `useEffect` for client-only code

## Getting Help

### Before Asking for Help
1. Check this troubleshooting guide
2. Search existing GitHub issues
3. Check the documentation
4. Try reproducing in a fresh environment

### When Asking for Help
1. Provide the full error message
2. Include relevant code snippets
3. Mention what you've already tried
4. Share your environment details

### Useful Debugging Commands
```bash
# Check versions
node --version
pnpm --version

# Check running processes
ps aux | grep node

# Check environment variables
printenv | grep NEXT

# Check file permissions
ls -la
```

Remember: Most issues have been encountered before. Take time to read error messages carefully and search for solutions! 