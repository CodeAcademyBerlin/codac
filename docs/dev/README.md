# Developer Documentation

Welcome to the Codac developer documentation! This directory contains comprehensive guides to help you contribute to our learning management system.

## 📚 Documentation Index

### Getting Started
- **[Getting Started Guide](./getting-started.md)** - Set up your development environment and start contributing
- **[Project Structure](./project-structure.md)** - Understand how the codebase is organized
- **[Development Workflow](./development-workflow.md)** - Learn our day-to-day development process

### Standards & Guidelines
- **[Coding Standards](./coding-standards.md)** - Coding conventions and best practices
- **[Testing Guide](./testing-guide.md)** - How to write and run tests
- **[Contributing Guidelines](./contributing.md)** - How to contribute to the project

### Reference & Help
- **[Troubleshooting](./troubleshooting.md)** - Solutions to common development issues

## 🚀 Quick Start

New to the project? Follow these steps:

1. **Setup** - Follow the [Getting Started Guide](./getting-started.md)
2. **Explore** - Read the [Project Structure](./project-structure.md) guide
3. **Learn Standards** - Review our [Coding Standards](./coding-standards.md)
4. **Start Contributing** - Check the [Contributing Guidelines](./contributing.md)

## 🛠 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Shadcn/UI
- **Database**: Drizzle ORM with PostgreSQL
- **Authentication**: NextAuth.js v5
- **Testing**: Jest + React Testing Library + Playwright
- **Package Manager**: pnpm

## 📖 Key Concepts

### Architecture
- **Server Components** - Default, can access database directly
- **Client Components** - Interactive, use React hooks
- **Server Actions** - Handle form submissions and mutations
- **Route Groups** - Organize pages without affecting URLs

### Development
- **Absolute Imports** - Use `@/` prefix for imports
- **Conventional Commits** - Structured commit messages
- **Feature Branches** - Each feature gets its own branch
- **Pull Request Reviews** - All code is reviewed before merge

## 🧪 Testing Strategy

- **Unit Tests** - Individual component and function testing
- **Integration Tests** - Component interaction testing
- **E2E Tests** - Full user workflow testing
- **Manual Testing** - Cross-browser validation

## 🔧 Common Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run E2E tests |
| `pnpm format` | Format code |
| `pnpm db:studio` | Open database studio |

## 🆘 Getting Help

- **Documentation Issues**: Check [Troubleshooting](./troubleshooting.md)
- **Development Questions**: Create [GitHub issues](https://github.com/CodeAcademyBerlin/codac/issues)
- **Code Reviews**: Ask in pull request comments
- **Community**: Join our [discussions](https://github.com/CodeAcademyBerlin/codac/discussions)
- **AI Assistance**: Use Cursor AI with `@rules` for project-specific guidance

## 📝 Contributing

We welcome contributions! Please:

1. Read our [Contributing Guidelines](./contributing.md)
2. Follow our [Coding Standards](./coding-standards.md)
3. Write tests for your changes
4. Submit a pull request

## 📋 Project Status

- ✅ **Authentication** - NextAuth.js v5 setup
- ✅ **Database** - Drizzle ORM with PostgreSQL
- ✅ **UI Components** - Shadcn/UI components
- ✅ **Testing** - Jest and Playwright with MCP tools
- 🚧 **Core Features** - In development
- 🚧 **Admin Dashboard** - In development

## 🎯 Focus Areas

Current development priorities:
- User management and profiles
- Course creation and management
- Learning progress tracking
- Community features
- Mobile responsiveness

---

**Need help?** Start with the [Getting Started Guide](./getting-started.md) or create an issue on GitHub.

Happy coding! 🎉 