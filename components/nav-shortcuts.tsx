'use client'

import { Bell, Calendar, type LucideIcon, MessageSquare } from 'lucide-react'

import { Badge } from './ui/badge'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from './ui/sidebar'

export function NavShortcuts({
  shortcuts,
}: {
  shortcuts: {
    name: string
    url: string
    icon: LucideIcon
    badge?: {
      text: string
      variant?: 'default' | 'secondary' | 'destructive' | 'outline'
    }
  }[]
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupContent>
        <SidebarMenu>
          {shortcuts.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton
                asChild
                className="hover:bg-sidebar-accent/50 transition-colors"
                tooltip={item.name}
              >
                <a href={item.url} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{item.name}</span>
                  {item.badge && (
                    <Badge
                      variant={item.badge.variant || 'secondary'}
                      className="ml-auto text-xs px-1.5 py-0.5 h-5"
                    >
                      {item.badge.text}
                    </Badge>
                  )}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

// Quick shortcuts data
export const quickShortcuts = [
  {
    name: 'Schedule',
    url: '/schedule',
    icon: Calendar,
    badge: { text: '2', variant: 'default' as const },
  },
  {
    name: 'Messages',
    url: '/messages',
    icon: MessageSquare,
    badge: { text: '5', variant: 'destructive' as const },
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: Bell,
    badge: { text: '3', variant: 'secondary' as const },
  },
]
