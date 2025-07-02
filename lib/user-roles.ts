export type UserRole = 'student' | 'alumni' | 'mentor' | 'admin'

export function getRoleColor(role: UserRole): string {
  const colors = {
    student: 'blue',
    alumni: 'green',
    mentor: 'purple',
    admin: 'red',
  }
  return colors[role]
}

export function getRolePermissions(role: UserRole) {
  const permissions = {
    student: {
      canViewCourses: true,
      canSubmitAssignments: true,
      canViewPosts: true,
      canCreatePosts: false,
      canManageUsers: false,
      canManageCourses: false,
    },
    alumni: {
      canViewCourses: true,
      canSubmitAssignments: false,
      canViewPosts: true,
      canCreatePosts: true,
      canManageUsers: false,
      canManageCourses: false,
    },
    mentor: {
      canViewCourses: true,
      canSubmitAssignments: false,
      canViewPosts: true,
      canCreatePosts: true,
      canManageUsers: false,
      canManageCourses: true,
    },
    admin: {
      canViewCourses: true,
      canSubmitAssignments: false,
      canViewPosts: true,
      canCreatePosts: true,
      canManageUsers: true,
      canManageCourses: true,
    },
  }
  return permissions[role]
}

export function getRoleConfig(role: UserRole) {
  const configs = {
    student: {
      label: 'Student',
      className:
        'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border-blue-200 dark:border-blue-800',
    },
    alumni: {
      label: 'Alumni',
      className:
        'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 border-green-200 dark:border-green-800',
    },
    mentor: {
      label: 'Mentor',
      className:
        'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 border-purple-200 dark:border-purple-800',
    },
    admin: {
      label: 'Admin',
      className:
        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 border-red-200 dark:border-red-800',
    },
  }
  return configs[role]
}
