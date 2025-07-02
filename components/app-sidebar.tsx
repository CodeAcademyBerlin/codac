'use client'

import { BookOpen, GraduationCap, Home, Settings, TrendingUp, UserCheck, Users } from 'lucide-react'
import type * as React from 'react'

import { NavMain } from './nav-main'
import { TeamSwitcher } from './team-switcher'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from './ui/sidebar'

// Codac-specific navigation data
const data = {
  user: {
    name: 'Student',
    email: 'student@codeacademy.berlin',
    avatar: '/images/user.png',
  },
  teams: [
    {
      name: 'Code Academy Berlin',
      logo: GraduationCap,
      plan: 'Premium',
    },
  ],
  navMain: [
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
        {
          title: 'Progress',
          url: '/dashboard/progress',
        },
        {
          title: 'Achievements',
          url: '/dashboard/achievements',
        },
      ],
    },
    {
      title: 'Learning',
      url: '/learning',
      icon: BookOpen,
      items: [
        {
          title: 'Courses',
          url: '/learning/courses',
        },
        {
          title: 'Assignments',
          url: '/learning/assignments',
        },
        {
          title: 'Resources',
          url: '/learning/resources',
        },
        {
          title: 'Schedule',
          url: '/learning/schedule',
        },
      ],
    },
    {
      title: 'Community',
      url: '/community',
      icon: Users,
      items: [
        {
          title: 'Posts',
          url: '/community/posts',
        },
        {
          title: 'Discussions',
          url: '/community/discussions',
        },
        {
          title: 'Student Directory',
          url: '/community/directory',
        },
        {
          title: 'Alumni Network',
          url: '/community/alumni',
        },
      ],
    },
    {
      title: 'Mentorship',
      url: '/mentorship',
      icon: UserCheck,
      items: [
        {
          title: 'Find a Mentor',
          url: '/mentorship/find',
        },
        {
          title: 'My Mentors',
          url: '/mentorship/mentors',
        },
        {
          title: 'Mentoring',
          url: '/mentorship/mentoring',
        },
        {
          title: 'Sessions',
          url: '/mentorship/sessions',
        },
      ],
    },
    {
      title: 'Career',
      url: '/career',
      icon: TrendingUp,
      items: [
        {
          title: 'Job Board',
          url: '/career/jobs',
        },
        {
          title: 'Portfolio',
          url: '/career/portfolio',
        },
        {
          title: 'Interview Prep',
          url: '/career/interview-prep',
        },
        {
          title: 'Resources',
          url: '/career/resources',
        },
      ],
    },
    {
      title: 'Settings',
      url: '/settings',
      icon: Settings,
      items: [
        {
          title: 'Profile',
          url: '/settings/profile',
        },
        {
          title: 'Notifications',
          url: '/settings/notifications',
        },
        {
          title: 'Privacy',
          url: '/settings/privacy',
        },
        {
          title: 'Account',
          url: '/settings/account',
        },
      ],
    },
  ],
  projects: [
    {
      name: 'Full Stack Development',
      url: '/projects/full-stack',
      icon: BookOpen,
    },
    {
      name: 'Data Science',
      url: '/projects/data-science',
      icon: TrendingUp,
    },
    {
      name: 'Web Development',
      url: '/projects/web-dev',
      icon: GraduationCap,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
