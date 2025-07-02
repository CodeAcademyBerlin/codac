'use client'

import {
  Home,
  Settings,
  User,
  GraduationCap,
} from 'lucide-react'
import type * as React from 'react'
import { useSession } from 'next-auth/react'

import { NavMain } from './nav-main'
import { NavProjects } from './nav-projects'
import { NavShortcuts, quickShortcuts } from './nav-shortcuts'
import { NavUser } from './nav-user'
import { TeamSwitcher } from './team-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail, SidebarSeparator } from './ui/sidebar'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()

  // Simplified data for testing sidebar functionality
  const displayUser = {
    name: session?.user?.name || 'User',
    email: session?.user?.email || 'user@example.com',
    avatar: session?.user?.image || '/images/user.png',
  }

  const displayTeam = {
    name: 'Code Academy Berlin',
    logo: GraduationCap,
    plan: 'Student',
  }

  // Simplified navigation data with only implemented routes
  const navMainData = [
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Home,
      isActive: true,
      items: [
        {
          title: 'Overview',
          url: '/dashboard',
        },
      ],
    },
    {
      title: 'Settings',
      url: '/profile',
      icon: Settings,
      items: [
        {
          title: 'Profile',
          url: '/profile',
        },
      ],
    },
  ]

  // Simplified projects data
  const projectsData = [
    {
      name: 'Current Learning Path',
      url: '/dashboard',
      icon: User,
      status: 'active' as const,
      progress: 75,
    },
  ]

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={[displayTeam]} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMainData} />
        <SidebarSeparator />
        <NavProjects projects={projectsData} />
        <SidebarSeparator />
        <NavShortcuts shortcuts={quickShortcuts} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={displayUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
