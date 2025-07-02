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

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
