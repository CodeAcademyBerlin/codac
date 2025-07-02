# Project Structure Guide

This document explains how the Codac project is organized and where to find different types of code.

## Overview

Codac is a Next.js 15 application using the App Router, TypeScript, and modern web development practices. Here's the high-level structure:

```
codac/
├── app/                    # Next.js App Router pages and API routes
├── components/             # Reusable React components
├── actions/               # Server actions for data mutations
├── db/                   # Database schema and configuration
├── lib/                  # Shared utility functions
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── public/               # Static assets
├── e2e/                  # End-to-end tests
├── __tests__/            # Unit tests
└── docs/                 # Documentation
```

## Detailed Structure

### `/app` - Next.js App Router
This is where pages and API routes live. Next.js uses file-based routing.

```
app/
├── (admin)/              # Admin-only pages (route group)
│   ├── layout.tsx        # Admin layout wrapper
│   └── page.tsx          # Admin dashboard
├── api/                  # API route handlers
│   ├── auth/             # Authentication endpoints
│   └── user/             # User management endpoints
├── login/                # Login page
├── register/             # Registration page
├── profile/              # User profile page
├── layout.tsx            # Root layout (applies to all pages)
├── page.tsx              # Home page
├── globals.css           # Global styles
└── auth.ts               # NextAuth configuration
```

**Key Concepts:**
- **Route Groups** `(admin)` - Groups routes without affecting URL structure
- **Layouts** - Shared UI that wraps multiple pages
- **Pages** - The actual page components users see

### `/components` - React Components
Organized by feature and reusability level.

```
components/
├── ui/                   # Basic UI components (buttons, inputs, etc.)
│   ├── button.tsx
│   ├── input.tsx
│   └── card.tsx
├── editor/               # Rich text editor components
│   └── plate-editor.tsx
├── providers/            # React context providers
│   └── session-provider.tsx
├── forms/                # Form components
│   ├── login-form.tsx
│   └── register-form.tsx
└── layout/               # Layout-related components
    ├── header.tsx
    ├── sidebar.tsx
    └── nav-main.tsx
```

**Component Types:**
- **UI Components** - Basic, reusable building blocks
- **Feature Components** - Specific to particular features
- **Layout Components** - Structure and navigation
- **Form Components** - Handle user input and validation

### `/actions` - Server Actions
Server-side functions that handle data mutations (create, update, delete).

```
actions/
├── auth.ts               # Authentication actions
└── user.ts               # User management actions
```

**Example Server Action:**
```typescript
'use server'

export async function createUser(data: CreateUserInput) {
  // Server-side logic here
  return { success: true, data: user }
}
```

### `/db` - Database Layer
Database schema and configuration using Drizzle ORM.

```
db/
└── schema.ts             # Database table definitions
```

**Database Migration Files:**
```
drizzle/
├── 0000_initial.sql      # Migration files
└── meta/                 # Migration metadata
```

### `/lib` - Shared Utilities
Common functions and configurations used throughout the app.

```
lib/
├── utils.ts              # Utility functions (cn, formatting, etc.)
├── constants.ts          # App-wide constants
└── validations.ts        # Zod schemas for validation
```

### `/hooks` - Custom React Hooks
Reusable logic for React components.

```
hooks/
├── use-mobile.tsx        # Mobile detection
└── use-toast.ts          # Toast notifications
```

### `/types` - TypeScript Types
Shared type definitions.

```
types/
└── codac.ts              # App-specific types
```

## File Naming Conventions

### Components
- **Files**: kebab-case (e.g., `user-profile.tsx`)
- **Components**: PascalCase (e.g., `UserProfile`)
- **Hooks**: camelCase starting with "use" (e.g., `useUserProfile`)

### Pages (App Router)
- **Folders**: kebab-case (e.g., `user-settings/`)
- **Files**: specific names (`page.tsx`, `layout.tsx`, `loading.tsx`)

### Other Files
- **Actions**: kebab-case (e.g., `create-user.ts`)
- **Utils**: kebab-case (e.g., `format-date.ts`)
- **Types**: kebab-case (e.g., `user-types.ts`)

## Import Patterns

### Absolute Imports
We use absolute imports from the project root:

```typescript
// ✅ Good
import { Button } from '@/components/ui/button'
import { createUser } from '@/actions/user'
import { UserProfile } from '@/types/codac'

// ❌ Avoid
import { Button } from '../../../components/ui/button'
```

### Import Order
1. React and Next.js imports
2. Third-party libraries
3. Internal components and utilities
4. Types (import type)

```typescript
import React from 'react'
import { NextPage } from 'next'
import { Button } from 'antd'

import { UserCard } from '@/components/user-card'
import { formatDate } from '@/lib/utils'

import type { User } from '@/types/codac'
```

## Where to Put New Code

### Adding a New Page
1. Create folder in `/app` (e.g., `/app/courses/`)
2. Add `page.tsx` for the main content
3. Add `layout.tsx` if you need page-specific layout
4. Add `loading.tsx` for loading states

### Adding a New Component
1. **UI Component**: Put in `/components/ui/`
2. **Feature Component**: Create feature folder in `/components/`
3. **Form**: Put in `/components/` with descriptive name

### Adding Business Logic
1. **Server Actions**: Add to `/actions/`
2. **Client Utils**: Add to `/lib/`
3. **React Logic**: Create custom hook in `/hooks/`

### Adding Database Changes
1. Update schema in `/db/schema.ts`
2. Generate migration: `pnpm db:generate`
3. Apply migration: `pnpm db:push`

## Common Patterns

### Server Components vs Client Components
- **Server Components** (default): Render on server, can access database
- **Client Components** (`'use client'`): Interactive, use hooks and events

### Data Fetching
- Use Server Components for initial data
- Use Server Actions for mutations
- Use React Query for complex client-side data needs

### Styling
- Use Tailwind CSS for styling
- Use `cn()` utility for conditional classes
- Follow established component patterns from shadcn/ui

## Questions?

If you're unsure where to put something:
1. Look for similar existing code
2. Follow the principle of "closest to where it's used"
3. Ask in code review or team chat
4. Check the coding standards documentation 