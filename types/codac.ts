// Core domain types for codac learning management system

import type { Value } from 'platejs'

export type UserRole = 'student' | 'alumni' | 'mentor' | 'instructor' | 'admin'

export type PostStatus = 'draft' | 'published' | 'archived'

export type CourseStatus = 'draft' | 'published' | 'archived'

export type AssignmentStatus = 'pending' | 'submitted' | 'graded' | 'returned'

export type MentorshipStatus = 'active' | 'completed' | 'paused'

export interface User {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  role: UserRole
  bio: string | null
  github: string | null
  linkedin: string | null
  portfolio: string | null
  cohortId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Cohort {
  id: string
  name: string
  description: string | null
  startDate: Date | null
  endDate: Date | null
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Course {
  id: string
  title: string
  description: string | null
  content: Value | null // JSON content from Plate.js
  status: CourseStatus
  instructorId: string | null
  cohortId: string | null
  orderIndex: number
  createdAt: Date
  updatedAt: Date
}

export interface Assignment {
  id: string
  title: string
  description: string | null
  content: Value | null // JSON content from Plate.js
  courseId: string | null
  dueDate: Date | null
  maxPoints: number
  createdAt: Date
  updatedAt: Date
}

export interface Submission {
  id: string
  assignmentId: string | null
  studentId: string | null
  content: Value | null // JSON content from Plate.js
  status: AssignmentStatus
  grade: number | null
  feedback: string | null
  submittedAt: Date | null
  gradedAt: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  title: string
  content: Value | null // JSON content from Plate.js
  authorId: string | null
  status: PostStatus
  tags: string[] | null
  likesCount: number
  commentsCount: number
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  postId: string | null
  authorId: string | null
  content: string
  parentId: string | null
  createdAt: Date
  updatedAt: Date
}

export interface Achievement {
  id: string
  name: string
  description: string | null
  icon: string | null
  points: number
  category: string | null
  createdAt: Date
}

export interface UserAchievement {
  id: string
  userId: string | null
  achievementId: string | null
  earnedAt: Date
}

export interface Mentorship {
  id: string
  mentorId: string | null
  menteeId: string | null
  status: MentorshipStatus
  startDate: Date
  endDate: Date | null
  createdAt: Date
}

// API Response types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

// Form input types
export interface CreateUserInput {
  name: string
  email: string
  password: string
  role?: UserRole
  cohortId?: string
}

export interface UpdateUserInput {
  name?: string
  bio?: string
  github?: string
  linkedin?: string
  portfolio?: string
}

export interface CreateCourseInput {
  title: string
  description?: string
  content?: Value
  cohortId?: string
  instructorId?: string
}

export interface CreatePostInput {
  title: string
  content?: Value
  tags?: string[]
  status?: PostStatus
}

// Dashboard and analytics types
export interface DashboardStats {
  totalStudents: number
  totalCourses: number
  totalAlumni: number
  completionRate: number
  activeUsers: number
  recentActivity: ActivityItem[]
}

export interface ActivityItem {
  id: string
  type: 'enrollment' | 'course_update' | 'assignment_submitted' | 'achievement_earned'
  description: string
  timestamp: Date
  userId?: string
  userName?: string
}
