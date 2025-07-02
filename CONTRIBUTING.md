# Contributing to codac

Thank you for your interest in contributing to codac! This project is designed to help beginners learn open source development, so we welcome contributors of all skill levels.

## 🚀 Quick Start

**New to open source?** Check out our [detailed forking and contribution guide](README.md#-how-to-fork--contribute) in the README for step-by-step instructions.

## 📋 Before You Contribute

1. **Read our [Code of Conduct](CODE_OF_CONDUCT.md)** - Help us maintain a welcoming community
2. **Check existing issues** - Someone might already be working on your idea
3. **Start small** - Look for `good first issue` labels if you're new

## 🛠 Development Setup

```bash
# Fork and clone the repository
git clone https://github.com/YOUR-USERNAME/codac.git
cd codac

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your database configuration

# Set up database
pnpm db:push

# Start development server
pnpm dev
```

## 🎯 How to Contribute

### Reporting Bugs
- Use the issue template
- Include steps to reproduce
- Add screenshots if applicable

### Suggesting Features
- Check if it aligns with our mission
- Provide clear use cases
- Start with a discussion issue

### Submitting Code
- Follow our [Git workflow](README.md#step-4-create-a-branch-for-your-changes)
- Write clear commit messages
- Add tests for new features
- Update documentation if needed

## ✅ Code Standards

```bash
# Format your code
pnpm format

# Lint your code  
pnpm lint

# Run tests
pnpm test
```

**Key Guidelines:**
- Use TypeScript for all new code
- Follow existing code patterns
- Write descriptive variable and function names
- Add comments for complex logic
- Keep components small and focused

## 🔄 Pull Request Process

1. **Create a feature branch** from `main`
2. **Make your changes** and test thoroughly
3. **Update documentation** if needed
4. **Submit a pull request** with a clear description
5. **Respond to feedback** promptly and constructively

## 🎓 Learning Resources

**First time contributing?** These resources will help:
- [GitHub's Open Source Guide](https://opensource.guide/)
- [First Contributions](https://firstcontributions.github.io/)
- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)

## 🤝 Getting Help

- **GitHub Discussions** - Ask questions and share ideas
- **Issues** - Report problems or request features  
- **Pull Request Comments** - Get help with your contributions

## 🏷 Issue Labels

- `good first issue` - Perfect for beginners
- `help wanted` - We'd love community help
- `bug` - Something isn't working
- `enhancement` - New feature or improvement
- `documentation` - Documentation improvements

## 📝 Commit Message Format

```
type: brief description

Optional longer description explaining what and why
```

**Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

**Example:**
```
feat: add user profile editing

Add ProfileForm component with validation and API integration.
Users can now update their personal information and profile picture.
```

---

**Remember:** Everyone was a beginner once! Don't hesitate to ask questions, and thank you for helping make codac better for everyone. 🚀 