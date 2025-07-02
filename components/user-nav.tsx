'use client'

import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
// import { signOut } from "@/app/auth"
// import { SignOut } from "./auth-components"
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Button } from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Badge } from './ui/badge'
import { UserRole } from '@/lib/user-roles'
import { UserRoleBadge } from './user-role-badge'
import {
  User,
  Settings,
  Bell,
  HelpCircle,
  LogOut
} from 'lucide-react'

export function UserNav() {
  const { data: session } = useSession()

  if (!session?.user) {
    return null
  }

  const userRole = (session.user as any)?.role as UserRole || 'student'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session.user.image ?? '/images/user.png'}
              alt={session.user.name ?? ''}
            />
            <AvatarFallback>
              {session.user.name?.split(' ').map(n => n[0]).join('') ?? session.user.email?.[0]}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{session.user.name}</p>
            <div className="flex items-center gap-2">
              <p className="text-xs leading-none text-muted-foreground">{session.user.email}</p>
              <UserRoleBadge role={userRole} showIcon={false} className="text-xs" />
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/profile">
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/settings">
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <Link href="/notifications">
            <DropdownMenuItem className="cursor-pointer">
              <Bell className="mr-2 h-4 w-4" />
              Notifications
              <Badge variant="destructive" className="ml-auto text-xs">
                3
              </Badge>
            </DropdownMenuItem>
          </Link>
          <Link href="/help">
            <DropdownMenuItem className="cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="cursor-pointer text-red-600 dark:text-red-400"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
