"use client"

import * as React from "react"
import {
  BarChart3,
  User,
  GraduationCap,
  type LucideIcon,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { UserRole } from "@/lib/user-roles"

interface NavItem {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
  items?: {
    title: string
    url: string
  }[]
}

// Get navigation data - only for existing pages
const getNavData = () => {
  const navMain: NavItem[] = [
    {
      title: "Dashboard",
      url: "/",
      icon: BarChart3,
      isActive: true,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: User,
    },
  ]

  return {
    navMain,
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navData = getNavData()

  // Default user data - in real app, this would come from session
  const defaultUser = {
    name: "Student",
    email: "student@codeacademy.berlin",
    avatar: "/images/user.png",
    role: 'student' as UserRole,
  }

  // Organization data for Code Academy Berlin
  const organization = {
    name: "Code Academy Berlin",
    logo: GraduationCap,
    plan: "Education",
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={[organization]} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={defaultUser} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
