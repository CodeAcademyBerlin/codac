// Application constants for codac learning management system

// User roles and permissions
export const USER_ROLES = {
  STUDENT: 'student',
  ALUMNI: 'alumni',
  MENTOR: 'mentor',
  ADMIN: 'admin',
} as const

// Post and content statuses
export const POST_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const

export const COURSE_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const

export const ASSIGNMENT_STATUS = {
  PENDING: 'pending',
  SUBMITTED: 'submitted',
  GRADED: 'graded',
  RETURNED: 'returned',
} as const

// File upload limits
export const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB in bytes
export const MAX_IMAGE_SIZE = 2 * 1024 * 1024 // 2MB in bytes

// Default values
export const DEFAULT_AVATAR_URL = '/images/user.png'
export const DEFAULT_PAGE_SIZE = 20
export const DEFAULT_ASSIGNMENT_POINTS = 100

// Application limits
export const MAX_COURSE_TITLE_LENGTH = 100
export const MAX_POST_TITLE_LENGTH = 200
export const MAX_BIO_LENGTH = 500
export const MAX_COMMENT_LENGTH = 1000

// Time constants
export const SESSION_DURATION = 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
export const ASSIGNMENT_REMINDER_DAYS = 3

// Navigation menu items
export const MAIN_NAVIGATION = [
  { title: 'Dashboard', href: '/dashboard', icon: 'Home' },
  { title: 'Learning', href: '/learning', icon: 'BookOpen' },
  { title: 'Community', href: '/community', icon: 'Users' },
  { title: 'Mentorship', href: '/mentorship', icon: 'UserCheck' },
  { title: 'Career', href: '/career', icon: 'TrendingUp' },
  { title: 'Settings', href: '/settings', icon: 'Settings' },
] as const

// Achievement categories
export const ACHIEVEMENT_CATEGORIES = {
  LEARNING: 'learning',
  COMMUNITY: 'community',
  MENTORSHIP: 'mentorship',
  CAREER: 'career',
  SPECIAL: 'special',
} as const

// Email templates
export const EMAIL_TEMPLATES = {
  WELCOME: 'welcome',
  ASSIGNMENT_DUE: 'assignment_due',
  MENTOR_REQUEST: 'mentor_request',
  ACHIEVEMENT_EARNED: 'achievement_earned',
} as const

// API endpoints
export const API_ENDPOINTS = {
  USERS: '/api/users',
  COURSES: '/api/courses',
  ASSIGNMENTS: '/api/assignments',
  POSTS: '/api/posts',
  ACHIEVEMENTS: '/api/achievements',
  MENTORSHIPS: '/api/mentorships',
} as const

// Database table names (for consistency with schema)
export const TABLES = {
  USERS: 'user',
  COHORTS: 'cohort',
  COURSES: 'course',
  ASSIGNMENTS: 'assignment',
  SUBMISSIONS: 'submission',
  POSTS: 'post',
  COMMENTS: 'comment',
  ACHIEVEMENTS: 'achievement',
  USER_ACHIEVEMENTS: 'user_achievement',
  MENTORSHIPS: 'mentorship',
} as const
