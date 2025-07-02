'use client'

import { ChevronRight, type LucideIcon } from 'lucide-react'
import { Badge } from './ui/badge'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from './ui/sidebar'

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    badge?: {
      text: string
      variant?: 'default' | 'secondary' | 'destructive' | 'outline'
    }
    items?: {
      title: string
      url: string
      isNew?: boolean
      badge?: {
        text: string
        variant?: 'default' | 'secondary' | 'destructive' | 'outline'
      }
    }[]
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">
        Learning Platform
      </SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  className="hover:bg-sidebar-accent/50 transition-colors data-[state=open]:bg-sidebar-accent/30"
                >
                  {item.icon && (
                    <item.icon className={`h-4 w-4 ${item.isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  )}
                  <span className={`font-medium ${item.isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {item.title}
                  </span>
                  {item.badge && (
                    <Badge
                      variant={item.badge.variant || 'secondary'}
                      className="ml-auto text-xs px-1.5 py-0.5 h-5"
                    >
                      {item.badge.text}
                    </Badge>
                  )}
                  <ChevronRight className="ml-auto h-4 w-4 opacity-60 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton
                        asChild
                        className="hover:bg-sidebar-accent/30 transition-colors"
                      >
                        <a href={subItem.url} className="flex items-center justify-between w-full">
                          <span className="text-sm">{subItem.title}</span>
                          <div className="flex items-center gap-1">
                            {subItem.isNew && (
                              <Badge variant="default" className="text-xs px-1.5 py-0 h-4 bg-blue-500">
                                New
                              </Badge>
                            )}
                            {subItem.badge && (
                              <Badge
                                variant={subItem.badge.variant || 'outline'}
                                className="text-xs px-1.5 py-0 h-4"
                              >
                                {subItem.badge.text}
                              </Badge>
                            )}
                          </div>
                        </a>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
