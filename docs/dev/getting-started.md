# Getting Started - Developer Guide

Welcome to the Codac project! This guide will help you set up your development environment and get started with contributing to our learning management system.

## Prerequisites

Before you begin, make sure you have the following installed:

### Required Software
- **Node.js** (v18 or later) - [Download here](https://nodejs.org/)
- **Git** - [Download here](https://git-scm.com/)
- **pnpm** (Package manager) - Install with: `npm install -g pnpm`
- **Cursor** (Recommended) - [Download here](https://cursor.sh/)

### Why Cursor?
Cursor is an AI-powered code editor built on VS Code that's specifically designed for modern development workflows. We recommend it for this project because:

- **AI-Powered Coding** - Built-in AI assistance for faster development
- **MCP Tools Integration** - Works seamlessly with our Playwright MCP setup
- **Rule-Based Context** - Can reference our project rules with `@rules`
- **Codebase Understanding** - AI can understand the entire project context
- **TypeScript Optimization** - Enhanced TypeScript support and suggestions

### Recommended Cursor Extensions
- **TypeScript and JavaScript Language Features** (built-in)
- **Tailwind CSS IntelliSense**
- **ES7+ React/Redux/React-Native snippets**
- **Prettier - Code formatter**
- **ESLint**
- **Auto Rename Tag**

## Project Setup

### 1. Clone the Repository
```bash
git clone https://github.com/CodeAcademyBerlin/codac.git
cd codac
```

### 2. Install Dependencies
```bash
pnpm install
```

### 3. Environment Setup
```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the .env.local file with your settings
# You'll need to configure PostgreSQL database and authentication settings
```

### 4. Database Setup
```bash
# Generate database schema
pnpm db:generate

# Push schema to database
pnpm db:push
```

### 5. Start Development Server
```bash
pnpm dev
```

Your application should now be running at `http://localhost:3000`

## First Steps

### Explore the Application
1. Open `http://localhost:3000` in your browser
2. Try registering a new account
3. Navigate through different pages
4. Check the admin dashboard (if you have admin access)

### Understand the Codebase
1. Read through `/docs/dev/project-structure.md`
2. Look at existing components in `/components`
3. Check out the database schema in `/db/schema.ts`
4. Review the authentication setup in `/app/auth.ts`

## Development Workflow

### 1. Create a Feature Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Follow our coding standards (see `/docs/dev/coding-standards.md`)
- Write tests for new functionality
- Update documentation if needed

### 3. Test Your Changes
```bash
# Run unit tests
pnpm test

# Run E2E tests
pnpm test:e2e

# Check code formatting
pnpm format
pnpm check
```

### 4. Commit and Push
```bash
git add .
git commit -m "feat: add your feature description"
git push origin feature/your-feature-name
```

### 5. Create Pull Request
- Go to GitHub and create a pull request
- Fill out the PR template
- Wait for code review

## Common Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm test` | Run unit tests |
| `pnpm test:e2e` | Run E2E tests |
| `pnpm lint` | Check code for issues |
| `pnpm format` | Format code with Biome |
| `pnpm db:studio` | Open database studio |

## Getting Help

### Documentation
- Read all files in `/docs/dev/`
- Check the main README.md
- Look at existing code examples

### Ask Questions
- Create an issue on GitHub
- Ask in team chat
- Comment on relevant pull requests

### Troubleshooting
- Check `/docs/dev/troubleshooting.md`
- Search existing issues on GitHub
- Clear `node_modules` and reinstall: `rm -rf node_modules && pnpm install`

## Next Steps

1. **Read Project Structure** - Understanding how the codebase is organized
2. **Learn Our Standards** - Familiarize yourself with our coding conventions
3. **Write Your First Feature** - Start with a small, well-defined task
4. **Add Tests** - Learn our testing approach and add coverage
5. **Get Code Review** - Submit your first PR and learn from feedback

Welcome to the team! 🎉 