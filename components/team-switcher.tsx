'use client'

import { ChevronsUpDown, Plus, Sparkles } from 'lucide-react'
import * as React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from './ui/sidebar'
import { Badge } from './ui/badge'

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string
    logo: React.ElementType
    plan: string
  }[]
}) {
  const { isMobile } = useSidebar()
  const [activeTeam, setActiveTeam] = React.useState(teams[0])

  const getPlanBadge = (plan: string) => {
    switch (plan.toLowerCase()) {
      case 'premium':
        return (
          <Badge variant="default" className="text-xs bg-gradient-to-r from-blue-600 to-purple-600 border-0">
            <Sparkles className="h-3 w-3 mr-1" />
            Premium
          </Badge>
        )
      case 'pro':
        return <Badge variant="secondary" className="text-xs">Pro</Badge>
      case 'free':
        return <Badge variant="outline" className="text-xs">Free</Badge>
      default:
        return <Badge variant="outline" className="text-xs">{plan}</Badge>
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-all duration-200"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground shadow-sm">
                <activeTeam.logo className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-foreground">{activeTeam.name}</span>
                <div className="flex items-center gap-1 mt-0.5">
                  {getPlanBadge(activeTeam.plan)}
                </div>
              </div>
              <ChevronsUpDown className="ml-auto h-4 w-4 opacity-60" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
            align="start"
            side={isMobile ? 'bottom' : 'right'}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground font-medium">
              Organizations
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                key={team.name}
                onClick={() => setActiveTeam(team)}
                className="gap-3 p-2.5 cursor-pointer hover:bg-accent/50 transition-colors"
              >
                <div className="flex size-6 items-center justify-center rounded-md border bg-gradient-to-br from-primary/10 to-primary/5">
                  <team.logo className="size-4 shrink-0 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{team.name}</div>
                  <div className="flex items-center gap-1 mt-0.5">
                    {getPlanBadge(team.plan)}
                  </div>
                </div>
                <DropdownMenuShortcut className="opacity-60">⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-3 p-2.5 text-muted-foreground hover:text-foreground transition-colors">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background hover:bg-accent/50 transition-colors">
                <Plus className="size-4" />
              </div>
              <span className="font-medium">Join Organization</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
