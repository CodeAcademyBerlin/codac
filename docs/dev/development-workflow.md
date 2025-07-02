# Development Workflow

This guide outlines the day-to-day development workflow for contributing to the Codac project.

## Branch Strategy

We use a feature branch workflow:

- **`main`** - Production-ready code
- **`develop`** - Integration branch for new features
- **`feature/*`** - Individual feature branches
- **`hotfix/*`** - Quick production fixes

## Daily Workflow

### 1. Start New Feature
```bash
# Pull latest changes
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Development Cycle
```bash
# Make changes
# ... edit files ...

# Check what changed
git status
git diff

# Stage and commit
git add .
git commit -m "feat: add user profile validation"

# Push to remote
git push origin feature/your-feature-name
```

### 3. Testing Before Push
```bash
# Run type checking
pnpm build

# Run unit tests
pnpm test

# Run linting
pnpm lint
pnpm format

# Run E2E tests (for critical features)
pnpm test:e2e
```

## Commit Messages

Use conventional commits format:

```
type(scope): description

[optional body]

[optional footer]
```

### Types:
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes
- `refactor` - Code refactoring
- `test` - Adding tests
- `chore` - Build/tooling changes

### Examples:
```bash
git commit -m "feat: add user authentication"
git commit -m "fix: resolve login form validation issue"
git commit -m "docs: update API documentation"
git commit -m "test: add unit tests for user service"
```

## Pull Request Process

### 1. Create PR
- Go to GitHub and create pull request
- Use the PR template
- Link related issues
- Add screenshots for UI changes

### 2. PR Description Template
```markdown
## What
Brief description of changes

## Why
Explain the motivation for changes

## How
Describe the approach taken

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Screenshots
(For UI changes)
```

### 3. Code Review
- Address reviewer feedback
- Update code based on suggestions
- Ensure all CI checks pass

### 4. Merge
- Use "Squash and merge" for feature branches
- Delete branch after merge

## Local Development

### Environment Setup
```bash
# Start development server
pnpm dev

# Open database studio
pnpm db:studio

# Run tests in watch mode
pnpm test:watch
```

### Database Changes
```bash
# Update schema in db/schema.ts
# Generate migration
pnpm db:generate

# Review generated migration
# Apply migration
pnpm db:push
```

## Code Quality

### Before Committing
- [ ] Code follows TypeScript strict mode
- [ ] Components have proper props interfaces
- [ ] Error handling is implemented
- [ ] Tests are written for new features
- [ ] Code is formatted (`pnpm format`)

### During Development
- Use absolute imports (`@/components/...`)
- Follow naming conventions
- Write descriptive commit messages
- Keep functions small and focused
- Add comments for complex logic

## Debugging

### Common Issues
```bash
# Port already in use
lsof -ti:3000 | xargs kill -9

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
pnpm install

# Reset database
pnpm db:push --force
```

### Cursor Setup
Install recommended extensions:
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense
- ESLint
- Prettier

Configure Cursor for the project:
- Enable AI features and code completion
- Set up rule references with `@rules`
- Configure MCP tools for enhanced testing
- Use Cursor's AI chat for code explanations

## Team Collaboration

### Communication
- Use descriptive PR titles
- Link related issues
- Tag reviewers when ready
- Respond to feedback promptly

### Code Reviews
- Review code thoroughly
- Provide constructive feedback
- Suggest improvements
- Approve when ready

### Best Practices
- Keep PRs focused and small
- Write clear commit messages
- Test your changes thoroughly
- Update documentation when needed

## Deployment

### Staging
- PRs are automatically deployed to staging
- Test your changes in staging environment
- Verify with team before merging

### Production
- Only merge to main after thorough testing
- Production deployments happen automatically
- Monitor for any issues after deployment

## Getting Help

### Quick Questions
- Check existing documentation
- Search codebase for examples
- Ask in team chat

### Bigger Issues
- Create GitHub issue
- Tag relevant team members
- Provide reproduction steps

### Code Reviews
- Ask for specific feedback
- Explain complex changes
- Be open to suggestions

Remember: Good development workflow prevents bugs and makes collaboration easier! 