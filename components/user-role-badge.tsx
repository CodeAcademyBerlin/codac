'use client'

import { Badge } from '@/components/ui/badge'
import { type UserRole, getRoleConfig } from '@/lib/user-roles'
import { cn } from '@/lib/utils'
import { GraduationCap, Heart, Shield, User } from 'lucide-react'

interface UserRoleBadgeProps {
  role: UserRole
  variant?: 'default' | 'outline' | 'secondary' | 'destructive'
  showIcon?: boolean
  className?: string
}

const roleIcons = {
  student: GraduationCap,
  alumni: User,
  mentor: Heart,
  admin: Shield,
}

const roleVariants = {
  student: 'default' as const,
  alumni: 'secondary' as const,
  mentor: 'outline' as const,
  admin: 'destructive' as const,
}

export function UserRoleBadge({ role, variant, showIcon = true, className }: UserRoleBadgeProps) {
  const config = getRoleConfig(role)
  const Icon = roleIcons[role]

  return (
    <Badge
      variant={variant || roleVariants[role]}
      className={cn('text-xs font-medium', config.className, className)}
    >
      {showIcon && <Icon className="h-3 w-3 mr-1" />}
      {config.label}
    </Badge>
  )
}

// Re-export types and functions for convenience
export type { UserRole }
export { getRoleColor, getRolePermissions } from '@/lib/user-roles'
