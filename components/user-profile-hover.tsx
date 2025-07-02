'use client'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { Badge } from './ui/badge'
import { UserRole, getRolePermissions } from '@/lib/user-roles'
import { UserRoleBadge } from './user-role-badge'
import { Calendar, Clock, Award, Users } from 'lucide-react'
import { Button } from './ui/button'

interface UserProfileHoverProps {
    user: {
        name: string
        email: string
        avatar: string
        role?: UserRole
        joinedAt?: string
        stats?: {
            courses?: number
            projects?: number
            mentees?: number
            hours?: number
        }
    }
    children: React.ReactNode
}

export function UserProfileHover({ user, children }: UserProfileHoverProps) {
    const permissions = getRolePermissions(user.role || 'student')

    const getRoleDescription = (role: UserRole) => {
        switch (role) {
            case 'student':
                return 'Learning and building amazing projects'
            case 'alumni':
                return 'Graduate and community contributor'
            case 'mentor':
                return 'Guiding the next generation of developers'
            case 'admin':
                return 'Managing the Code Academy Berlin platform'
            default:
                return 'Member of Code Academy Berlin'
        }
    }

    return (
        <HoverCard>
            <HoverCardTrigger asChild>
                {children}
            </HoverCardTrigger>
            <HoverCardContent className="w-80" side="right" align="start">
                <div className="flex justify-between space-x-4">
                    <Avatar className="h-12 w-12">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-2">
                            <h4 className="text-sm font-semibold">{user.name}</h4>
                            {user.role && <UserRoleBadge role={user.role} showIcon={false} />}
                        </div>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                        <p className="text-xs text-muted-foreground">
                            {user.role && getRoleDescription(user.role)}
                        </p>
                        {user.joinedAt && (
                            <div className="flex items-center pt-2">
                                <Calendar className="mr-2 h-3 w-3 opacity-70" />
                                <span className="text-xs text-muted-foreground">
                                    Joined {user.joinedAt}
                                </span>
                            </div>
                        )}

                        {/* Role-based stats */}
                        {user.stats && (
                            <div className="pt-2 space-y-1">
                                {user.role === 'student' && (
                                    <>
                                        {user.stats.courses && (
                                            <div className="flex items-center text-xs">
                                                <Award className="mr-2 h-3 w-3 opacity-70" />
                                                <span>{user.stats.courses} courses completed</span>
                                            </div>
                                        )}
                                        {user.stats.projects && (
                                            <div className="flex items-center text-xs">
                                                <Users className="mr-2 h-3 w-3 opacity-70" />
                                                <span>{user.stats.projects} projects built</span>
                                            </div>
                                        )}
                                    </>
                                )}

                                {user.role === 'mentor' && (
                                    <>
                                        {user.stats.mentees && (
                                            <div className="flex items-center text-xs">
                                                <Users className="mr-2 h-3 w-3 opacity-70" />
                                                <span>{user.stats.mentees} mentees guided</span>
                                            </div>
                                        )}
                                        {user.stats.hours && (
                                            <div className="flex items-center text-xs">
                                                <Clock className="mr-2 h-3 w-3 opacity-70" />
                                                <span>{user.stats.hours} hours mentoring</span>
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        )}

                        {/* Quick actions based on role */}
                        <div className="pt-3 flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs h-7">
                                View Profile
                            </Button>
                            {permissions.canCreatePosts && (
                                <Button size="sm" variant="outline" className="text-xs h-7">
                                    Message
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </HoverCardContent>
        </HoverCard>
    )
} 