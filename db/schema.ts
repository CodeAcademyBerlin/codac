import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
} from 'drizzle-orm/pg-core'
import { drizzle } from 'drizzle-orm/postgres-js'
import type { AdapterAccountType } from 'next-auth/adapters'
import postgres from 'postgres'

const connectionString = `${process.env.POSTGRES_URL || 'postgresql://localhost:5432/codac'}?sslmode=require`
const pool = postgres(connectionString, { max: 1 })

export const db = drizzle(pool)

// Enums
export const userRoleEnum = pgEnum('user_role', [
  'student',
  'alumni',
  'mentor',
  'admin',
])
export const postStatusEnum = pgEnum('post_status', ['draft', 'published', 'archived'])
export const courseStatusEnum = pgEnum('course_status', ['draft', 'published', 'archived'])
export const assignmentStatusEnum = pgEnum('assignment_status', [
  'pending',
  'submitted',
  'graded',
  'returned',
])

// Auth tables (keeping existing NextAuth structure)
export const users = pgTable('user', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name'),
  password: text('password'),
  email: text('email').unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  image: text('image'),
  role: userRoleEnum('role').default('student'),
  bio: text('bio'),
  github: text('github'),
  linkedin: text('linkedin'),
  portfolio: text('portfolio'),
  cohortId: text('cohort_id'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
})

export const accounts = pgTable(
  'account',
  {
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    type: text('type').$type<AdapterAccountType>().notNull(),
    provider: text('provider').notNull(),
    providerAccountId: text('providerAccountId').notNull(),
    refresh_token: text('refresh_token'),
    access_token: text('access_token'),
    expires_at: integer('expires_at'),
    token_type: text('token_type'),
    scope: text('scope'),
    id_token: text('id_token'),
    session_state: text('session_state'),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  })
)

export const sessions = pgTable('session', {
  sessionToken: text('sessionToken').primaryKey(),
  userId: text('userId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  expires: timestamp('expires', { mode: 'date' }).notNull(),
})

export const verificationTokens = pgTable(
  'verificationToken',
  {
    identifier: text('identifier').notNull(),
    token: text('token').notNull(),
    expires: timestamp('expires', { mode: 'date' }).notNull(),
  },
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  })
)

export const authenticators = pgTable(
  'authenticator',
  {
    credentialID: text('credentialID').notNull().unique(),
    userId: text('userId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    providerAccountId: text('providerAccountId').notNull(),
    credentialPublicKey: text('credentialPublicKey').notNull(),
    counter: integer('counter').notNull(),
    credentialDeviceType: text('credentialDeviceType').notNull(),
    credentialBackedUp: boolean('credentialBackedUp').notNull(),
    transports: text('transports'),
  },
  (authenticator) => ({
    compositePK: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  })
)

// Codac-specific tables
export const cohorts = pgTable('cohort', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  description: text('description'),
  startDate: timestamp('start_date', { mode: 'date' }),
  endDate: timestamp('end_date', { mode: 'date' }),
  isActive: boolean('is_active').default(true),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
})

export const courses = pgTable('course', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  description: text('description'),
  content: jsonb('content'), // Rich content from Plate.js
  status: courseStatusEnum('status').default('draft'),
  instructorId: text('instructor_id').references(() => users.id, { onDelete: 'set null' }),
  cohortId: text('cohort_id').references(() => cohorts.id, { onDelete: 'cascade' }),
  orderIndex: integer('order_index').default(0),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
})

export const assignments = pgTable('assignment', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  description: text('description'),
  content: jsonb('content'), // Rich content from Plate.js
  courseId: text('course_id').references(() => courses.id, { onDelete: 'cascade' }),
  dueDate: timestamp('due_date', { mode: 'date' }),
  maxPoints: integer('max_points').default(100),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
})

export const submissions = pgTable('submission', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  assignmentId: text('assignment_id').references(() => assignments.id, { onDelete: 'cascade' }),
  studentId: text('student_id').references(() => users.id, { onDelete: 'cascade' }),
  content: jsonb('content'), // Rich content from Plate.js
  status: assignmentStatusEnum('status').default('pending'),
  grade: integer('grade'),
  feedback: text('feedback'),
  submittedAt: timestamp('submitted_at', { mode: 'date' }),
  gradedAt: timestamp('graded_at', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
})

export const posts = pgTable('post', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text('title').notNull(),
  content: jsonb('content'), // Rich content from Plate.js
  authorId: text('author_id').references(() => users.id, { onDelete: 'cascade' }),
  status: postStatusEnum('status').default('draft'),
  tags: text('tags').array(),
  likesCount: integer('likes_count').default(0),
  commentsCount: integer('comments_count').default(0),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
})

export const comments = pgTable('comment', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  postId: text('post_id').references(() => posts.id, { onDelete: 'cascade' }),
  authorId: text('author_id').references(() => users.id, { onDelete: 'cascade' }),
  content: text('content').notNull(),
  parentId: text('parent_id'), // For nested comments
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow(),
})

export const achievements = pgTable('achievement', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text('name').notNull(),
  description: text('description'),
  icon: text('icon'),
  points: integer('points').default(0),
  category: text('category'),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
})

export const userAchievements = pgTable('user_achievement', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text('user_id').references(() => users.id, { onDelete: 'cascade' }),
  achievementId: text('achievement_id').references(() => achievements.id, { onDelete: 'cascade' }),
  earnedAt: timestamp('earned_at', { mode: 'date' }).defaultNow(),
})

export const mentorships = pgTable('mentorship', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  mentorId: text('mentor_id').references(() => users.id, { onDelete: 'cascade' }),
  menteeId: text('mentee_id').references(() => users.id, { onDelete: 'cascade' }),
  status: text('status').default('active'), // active, completed, paused
  startDate: timestamp('start_date', { mode: 'date' }).defaultNow(),
  endDate: timestamp('end_date', { mode: 'date' }),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
})
