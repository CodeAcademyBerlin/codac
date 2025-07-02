# codac

**codac** is the comprehensive learning management system and community platform designed specifically for students and alumni of Code Academy Berlin. Beyond facilitating learning and community building, codac serves as a practical training ground for beginner developers to learn open source development practices and contribute to real-world projects.

## 🎯 Mission

codac empowers Code Academy Berlin students and alumni to learn, collaborate, and grow together through a modern, integrated platform that combines educational content delivery with vibrant community features. **Additionally, codac provides hands-on experience in open source development**, teaching students how to contribute to collaborative projects, use version control effectively, and participate in the global developer community.

## 📋 Table of Contents

- [🎓 Learning Open Source Development](#-learning-open-source-development)
- [✅ Implemented Features](#-implemented-features)
- [🚧 Work in Progress](#-work-in-progress)
- [🗺️ Roadmap](#️-roadmap)
- [🛠 Tech Stack](#-tech-stack)
- [🚀 Quick Start](#-quick-start)
- [🤝 Contributing](#-contributing)
- [🔄 How to Fork & Contribute](#-how-to-fork--contribute)

## 🎓 Learning Open Source Development

codac is designed to be a beginner-friendly project where students can learn essential open source development skills:

### What You'll Learn

- **Git & GitHub Workflow** - Master version control, branching, and collaboration
- **Code Review Process** - Learn how to give and receive constructive feedback
- **Issue Management** - Understand how open source projects are organized and tracked
- **Documentation** - Practice writing clear, helpful documentation
- **Testing** - Learn to write and run tests for your contributions
- **Community Collaboration** - Experience working with a diverse group of developers

### Why codac is Perfect for Learning

- **Real-world codebase** with modern technologies and best practices
- **Welcoming community** that supports beginners and celebrates learning
- **Well-documented issues** with clear requirements and guidance
- **Mentorship opportunities** from experienced contributors
- **Gradual complexity** - start small and work up to larger features
- **Educational mission** - everyone understands you're here to learn

### Getting Started with Open Source

Never contributed to open source before? That's exactly why we're here! Check out our [detailed contribution guide](#-how-to-fork--contribute) below to learn the complete workflow step by step.

## ✅ Implemented Features

### 🏗️ Foundation & Infrastructure

- **Project Structure** - Next.js 15 with App Router, TypeScript, and modern tooling
- **Authentication System** - NextAuth.js integration with email/password and database sessions
- **Database Schema** - Complete Drizzle ORM schema with PostgreSQL for all domain entities
- **Admin Dashboard** - Basic admin interface with metrics, activity feed, and quick actions
- **Rich Content Editor** - Plate.js integration for creating and editing educational content
- **UI Components** - Shadcn/UI component library with Tailwind CSS styling
- **Navigation Structure** - Sidebar navigation with role-based menu items
- **TypeScript Types** - Comprehensive type definitions for all domain objects
- **Testing Setup** - Jest for unit testing and Playwright for end-to-end testing
- **Code Quality** - Biome for formatting and linting with modern standards

### 👤 User Management (Basic)

- **User Roles** - Database support for Students, Alumni, Mentors, Instructors, and Admins
- **User Profiles** - Database schema for comprehensive user profiles with social links
- **Authentication** - Secure login/logout with session management

### 📊 Database Foundation

- **Cohort Management** - Database tables for organizing student groups
- **Course Structure** - Database schema for courses, lessons, and educational content
- **Assignment System** - Database tables for assignments, submissions, and grading
- **Community Posts** - Database schema for posts, comments, and discussions
- **Achievement System** - Database tables for badges, points, and gamification
- **Mentorship Framework** - Database schema for mentor-mentee relationships

## 🚧 Work in Progress

### 📚 Learning Management System

- **Course Creation** - Interface for instructors to create and manage courses
- **Assignment Management** - Tools for creating, distributing, and grading assignments
- **Progress Tracking** - Student dashboard showing learning progress and completion rates
- **Resource Library** - File upload and management for learning materials

### 👥 Community Platform

- **User Directory** - Browse and search functionality for students and alumni
- **Discussion System** - Threaded discussions with real-time updates
- **Community Posts** - Create, edit, and interact with community content
- **Profile Management** - Complete user profile editing and customization

### 🔐 Role-Based Features

- **Instructor Tools** - Course management and student progress monitoring
- **Student Dashboard** - Personalized learning dashboard with assignments and progress
- **Admin Panel** - Complete administration tools for managing users, courses, and content

## 🗺️ Roadmap

### 🤝 Mentorship & Career Support

- **Mentor Matching Algorithm** - AI-powered matching between students and alumni mentors
- **Job Board Integration** - Partner company job postings and application tracking
- **Career Resources** - Interview preparation materials and resume building tools
- **Portfolio Management** - Showcase student work and track career progression
- **Networking Events** - Event management and RSVP system for community meetups

### 🏆 Advanced Features

- **Gamification Engine** - Points, leaderboards, and achievement notifications
- **Learning Analytics** - Advanced insights into learning patterns and performance
- **Mobile Application** - React Native app for iOS and Android
- **Video Integration** - Live streaming and recorded video lessons
- **Certificate System** - Digital certificates and blockchain verification
- **API Integration** - Third-party integrations (GitHub, LinkedIn, Slack)

### 🌐 Platform Enhancements

- **Multi-language Support** - Internationalization for German and English
- **Advanced Search** - Full-text search across all content types
- **Notification System** - Real-time notifications via email, push, and in-app
- **Advanced Permissions** - Fine-grained access control and content permissions
- **Export Tools** - Data export for portfolios and academic records
- **Advanced Analytics** - Comprehensive reporting and data visualization

## 🛠 Tech Stack

- **[Next.js 15](https://nextjs.org/)** for performance and scalability.
- **[Auth.js](https://auth.js.org/)** for authentication.
- **[Drizzle ORM](https://orm.drizzle.team/)** for type-safe database management.
- **[PostgreSQL](https://www.postgresql.org/)** for reliable and scalable database solutions.
- **[Shadcn/UI](https://ui.shadcn.com/)** for beautiful, customizable components.
- **[Biome](https://biomejs.dev/)** for **Formatting and Linting**
- **[Jest](https://jestjs.io/)** A testing framework for ensuring your app works as expected.
- **Playwright** End to end A testing framework for ensuring your app works as expected.
- **React Hook Form**: A library for managing form state and validation in React applications
- **Zod**: A TypeScript-first schema declaration and validation library
- **Nuqs**: Type-safe URL state management
- **[Platejs](https://platejs.org) Rich Content Editor** - for creating engaging educational content with advanced formatting, media embedding, and collaborative editing capabilities
- **Document Management** - Comprehensive document creation, editing, and sharing system with version control and real-time collaboration

## 🚀 Quick Start

### Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v20 or higher) - [Download here](https://nodejs.org/)
- **pnpm** - Install with `npm install -g pnpm`
- **Git** - [Download here](https://git-scm.com/)
- **PostgreSQL** - [Download here](https://www.postgresql.org/download/)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/CodeAcademyBerlin/codac.git
   cd codac
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Then edit `.env.local` with your configuration:
   ```
   # Database
   POSTGRES_URL="postgresql://username:password@localhost:5432/codac"
   
   # NextAuth
   NEXTAUTH_SECRET="your-nextauth-secret"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Set up the database**

   ```bash
   pnpm db:push
   ```

5. **Start the development server**

   ```bash
   pnpm dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000` to see the application running!

## 🤝 Contributing

We welcome contributions from developers of all skill levels! Whether you're a complete beginner or experienced developer, there are many ways to help improve codac while learning valuable skills.

### For Beginners 👋

**First time contributing to open source?** You're in the right place! codac is specifically designed to help you learn:

- **📝 Start with documentation** - Fix typos, improve explanations, or add examples
- **🐛 Report bugs** - Found something that doesn't work? Create an issue!
- **💡 Suggest features** - Have ideas for improvements? We'd love to hear them!
- **🔍 Review code** - Read through pull requests and ask questions
- **❓ Ask questions** - Use GitHub Discussions or issues - no question is too basic!

### Learning Path for New Contributors

1. **Week 1-2**: Read the codebase, set it up locally, report any issues you encounter
2. **Week 3-4**: Fix documentation, typos, or small UI improvements
3. **Week 5-8**: Take on "good first issue" labeled tasks
4. **Month 2+**: Contribute features, review others' code, help newer contributors

## 🔄 How to Fork & Contribute

This section provides a complete, step-by-step guide for contributing to codac. Perfect for beginners learning open source development!

### Step 1: Fork the Repository

**Forking creates your own copy of the project where you can make changes safely.**

1. **Go to the codac repository**: Navigate to `https://github.com/CodeAcademyBerlin/codac`
2. **Click the "Fork" button**: Located in the top-right corner of the page
3. **Choose your account**: Select where you want to fork the repository (usually your personal GitHub account)
4. **Wait for the fork**: GitHub will create a copy of the repository in your account

**What just happened?** You now have your own copy of codac at `https://github.com/YOUR-USERNAME/codac`

### Step 2: Clone Your Fork

**Cloning downloads your fork to your computer so you can work on it.**

```bash
# Replace YOUR-USERNAME with your actual GitHub username
git clone https://github.com/YOUR-USERNAME/codac.git
cd codac
```

### Step 3: Add the Original Repository as "Upstream"

**This lets you get updates from the main project.**

```bash
git remote add upstream https://github.com/CodeAcademyBerlin/codac.git
git remote -v  # Verify you have both 'origin' (your fork) and 'upstream' (original)
```

### Step 4: Create a Branch for Your Changes

**Never work directly on the main branch! Always create a feature branch.**

```bash
# Get the latest changes from the main project
git fetch upstream
git checkout main
git merge upstream/main

# Create and switch to a new branch
git checkout -b feature/your-feature-name
```

**Branch naming conventions:**
- `feature/add-user-profile` - for new features
- `fix/login-bug` - for bug fixes
- `docs/update-readme` - for documentation
- `refactor/cleanup-components` - for code improvements

### Step 5: Make Your Changes

1. **Set up the development environment** (follow the [Quick Start](#-quick-start) guide)
2. **Make your changes** - edit files, add features, fix bugs
3. **Test your changes** - make sure everything still works
4. **Follow the code style** - we use Biome for formatting

```bash
# Format your code
pnpm format

# Lint your code
pnpm lint

# Run tests
pnpm test
```

### Step 6: Commit Your Changes

**Write clear commit messages that explain what you did.**

```bash
# Add your changes to staging
git add .

# Commit with a descriptive message
git commit -m "Add user profile editing functionality

- Add ProfileForm component with validation
- Update user API endpoint to handle PATCH requests
- Add tests for profile update functionality
- Update documentation for new feature"
```

**Good commit message format:**
- **First line**: Brief summary (50 characters or less)
- **Blank line**
- **Description**: Explain what and why, not how (if needed)

### Step 7: Push Your Branch

**Upload your changes to your fork on GitHub.**

```bash
git push origin feature/your-feature-name
```

### Step 8: Create a Pull Request

**A pull request asks the maintainers to review and merge your changes.**

1. **Go to your fork on GitHub**: `https://github.com/YOUR-USERNAME/codac`
2. **Click "Compare & pull request"**: GitHub usually shows this button automatically
3. **Fill out the PR template**:
   - **Title**: Clear, descriptive summary of your changes
   - **Description**: Explain what you did, why, and how to test it
   - **Link any related issues**: Use "Closes #123" if your PR fixes an issue
4. **Click "Create pull request"**

### Step 9: Respond to Feedback

**Code review is a collaborative process - don't take feedback personally!**

- **Address comments promptly**: Make requested changes or ask for clarification
- **Update your branch**: Push new commits to address feedback
- **Engage in discussion**: Ask questions, explain your approach, learn from others

```bash
# Make changes based on feedback
git add .
git commit -m "Address code review feedback

- Extract validation logic into separate function
- Add error handling for edge cases
- Update tests to cover new scenarios"
git push origin feature/your-feature-name
```

### Step 10: Keep Your Fork Updated

**Regularly sync with the main project to avoid conflicts.**

```bash
# Switch to main branch
git checkout main

# Pull latest changes from upstream
git fetch upstream
git merge upstream/main

# Push updates to your fork
git push origin main
```

### 🎉 Congratulations!

You've just learned the complete open source contribution workflow! This process is used by millions of developers worldwide for collaborating on software projects.

### Common Git Commands Cheat Sheet

```bash
# Check status of your changes
git status

# See what files have changed
git diff

# View commit history
git log --oneline

# Switch between branches
git checkout branch-name

# Create and switch to new branch
git checkout -b new-branch-name

# Undo unstaged changes
git checkout -- filename

# Undo last commit (keep changes)
git reset --soft HEAD~1
```

### Getting Help

- **GitHub Discussions**: Ask questions about contributing
- **Issues**: Report bugs or request features
- **Discord/Slack**: Real-time chat with the community
- **Documentation**: Check our [Contributing Guide](CONTRIBUTING.md)

Remember: **Everyone was a beginner once!** The codac community is here to help you learn and grow as a developer.

### Good First Issues

Look for issues labeled `good first issue` - these are perfect for newcomers! They're typically:

- **Well-documented** with clear requirements and context
- **Small in scope** and easier to tackle (usually 1-3 hours of work)
- **Great learning opportunities** that teach important concepts
- **Mentored** by experienced contributors who will guide you

### Types of Contributions We Need

- **🐛 Bug fixes**: Solve problems and improve user experience
- **✨ New features**: Add functionality that users have requested
- **📚 Documentation**: Help others understand the codebase
- **🎨 UI/UX improvements**: Make the interface more beautiful and usable
- **🧪 Tests**: Improve code reliability and prevent regressions
- **♻️ Refactoring**: Clean up code while maintaining functionality
- **🌐 Accessibility**: Make the app usable for everyone
- **📱 Responsive design**: Ensure the app works on all devices

## 🌟 Community

Join our growing community of learners and contributors:

- **GitHub Discussions** - Ask questions and share ideas
- **Issues** - Report bugs or request features
- **Pull Requests** - Contribute code improvements

### Recognition

All contributors are recognized in our project! No matter how small your contribution, it matters and helps make codac better for everyone.

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please read our [Code of Conduct](CODE_OF_CONDUCT.md) to understand our community standards.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
