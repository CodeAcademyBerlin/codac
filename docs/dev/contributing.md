# Contributing to Codac

Thank you for your interest in contributing to Codac! This guide will help you get started with contributing to our learning management system.

## Code of Conduct

Please read and follow our [Code of Conduct](../../CODE_OF_CONDUCT.md). We expect all contributors to be respectful and professional.

## Getting Started

1. **Fork the repository** on GitHub: [https://github.com/CodeAcademyBerlin/codac](https://github.com/CodeAcademyBerlin/codac)
2. **Clone your fork** locally
3. **Set up the development environment** (see [Getting Started Guide](./getting-started.md))
4. **Create a feature branch** for your changes
5. **Make your changes** following our coding standards (use Cursor AI with `@rules`)
6. **Test your changes** thoroughly
7. **Submit a pull request**

## Types of Contributions

### Bug Reports
- Use the bug report template
- Include reproduction steps
- Provide error messages and logs
- Test in different browsers/environments

### Feature Requests
- Use the feature request template
- Explain the use case and benefits
- Provide mockups or examples if helpful
- Consider starting with a discussion

### Code Contributions
- Bug fixes
- New features
- Performance improvements
- Documentation updates
- Test coverage improvements

### Documentation
- Fix typos and grammar
- Improve clarity and examples
- Add missing documentation
- Update outdated information

## Development Guidelines

### Before You Start
1. **Check existing issues** - Someone might already be working on it
2. **Create an issue** - Discuss your idea before starting work
3. **Get assignment** - Wait for maintainer approval
4. **Start small** - Begin with good first issues

### Coding Standards
Follow our [Coding Standards](./coding-standards.md):
- Use TypeScript strict mode
- Follow naming conventions
- Write comprehensive tests
- Add proper error handling
- Use existing patterns and components

### Testing Requirements
- **Unit tests** for new functions and components
- **Integration tests** for complex features
- **E2E tests** for critical user flows
- **Manual testing** in different browsers

## Pull Request Process

### 1. Prepare Your PR
```bash
# Create feature branch
git checkout -b feature/your-feature-name

# Make your changes
# ... development work ...

# Run tests
pnpm test
pnpm test:e2e

# Format code
pnpm format
pnpm check
```

### 2. Commit Your Changes
Use [conventional commits](https://www.conventionalcommits.org/):
```bash
git commit -m "feat: add user profile validation"
git commit -m "fix: resolve login form issue"
git commit -m "docs: update API documentation"
```

### 3. Push and Create PR
```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub.

### 4. PR Template
Use our PR template:
```markdown
## What
Brief description of changes

## Why
Explain the motivation

## How
Describe the approach

## Testing
- [ ] Unit tests added/updated
- [ ] E2E tests added/updated
- [ ] Manual testing completed

## Breaking Changes
- [ ] None
- [ ] Minor (backward compatible)
- [ ] Major (breaking changes)

## Screenshots
(For UI changes)
```

### 5. Code Review Process
- **Automated checks** must pass
- **Peer review** from at least one maintainer
- **Address feedback** promptly
- **Update documentation** if needed

## Issue Guidelines

### Bug Reports
```markdown
**Describe the bug**
Clear description of what went wrong

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
What you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- OS: [e.g. iOS]
- Browser: [e.g. chrome, safari]
- Version: [e.g. 22]
```

### Feature Requests
```markdown
**Is your feature request related to a problem?**
Clear description of the problem

**Describe the solution you'd like**
Clear description of what you want to happen

**Describe alternatives you've considered**
Other solutions you've considered

**Additional context**
Mockups, examples, or other context
```

## Coding Guidelines

### TypeScript
- Use strict mode
- Prefer interfaces over types for objects
- Use proper typing instead of `any`
- Add JSDoc comments for complex functions

### React
- Use functional components
- Follow hooks rules
- Use proper dependency arrays
- Implement error boundaries

### Styling
- Use Tailwind CSS
- Follow component design system
- Ensure responsive design
- Test in different browsers

### Database
- Use Drizzle ORM patterns
- Write migrations for schema changes
- Test database operations
- Handle errors properly

## Testing Guidelines

### Unit Tests
```typescript
// Test component behavior
describe('UserCard', () => {
  it('should display user information', () => {
    render(<UserCard user={mockUser} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
```

### E2E Tests
```typescript
// Test user workflows
test('user can complete registration', async ({ page }) => {
  await page.goto('/register')
  // ... test registration flow
})
```

## Documentation

### Code Documentation
- Add JSDoc comments for functions
- Document complex algorithms
- Explain business logic
- Include usage examples

### README Updates
- Update installation instructions
- Add new features to feature list
- Update API documentation
- Include screenshots for UI changes

## Community Guidelines

### Communication
- Be respectful and professional
- Provide constructive feedback
- Help newcomers get started
- Share knowledge and best practices

### Code Reviews
- Review code thoroughly
- Provide specific feedback
- Suggest improvements
- Approve when ready

### Issue Discussions
- Stay on topic
- Provide relevant information
- Be patient with responses
- Help reproduce issues

## Release Process

### Versioning
We use [Semantic Versioning](https://semver.org/):
- **Major** (1.0.0) - Breaking changes
- **Minor** (0.1.0) - New features
- **Patch** (0.0.1) - Bug fixes

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Breaking changes documented
- [ ] Migration guide provided
- [ ] Changelog updated

## Getting Help

### Documentation
- Read all developer guides in `/docs/dev/`
- Check existing code examples
- Review pull requests for patterns

### Community Support
- Ask questions in GitHub discussions
- Comment on relevant issues
- Join our community chat
- Attend community meetings

### Mentorship
- Look for "good first issue" labels
- Ask for help in pull requests
- Pair with experienced contributors
- Share your learning journey

## Recognition

### Contributors
- All contributors are listed in our README
- Significant contributions get special recognition
- Regular contributors may be invited as maintainers

### Hacktoberfest
- We participate in Hacktoberfest
- Look for "hacktoberfest" labels
- Follow event guidelines

## License

By contributing to Codac, you agree that your contributions will be licensed under the same license as the project. See the [LICENSE](../../LICENSE) file for details.

## Questions?

If you have questions about contributing:
1. Check existing documentation
2. Search closed issues
3. Ask in GitHub discussions
4. Reach out to maintainers

Thank you for contributing to Codac! 🎉 