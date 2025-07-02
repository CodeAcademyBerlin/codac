'use client'

import { type LucideIcon, MoreHorizontal, Plus } from 'lucide-react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from './ui/sidebar'
import { Badge } from './ui/badge'

export function NavProjects({
    projects,
}: {
    projects: {
        name: string
        url: string
        icon: LucideIcon
        status?: 'active' | 'completed' | 'upcoming'
        progress?: number
    }[]
}) {
    const { isMobile } = useSidebar()

    const getStatusBadge = (status?: string) => {
        switch (status) {
            case 'active':
                return <Badge variant="default" className="text-xs">Active</Badge>
            case 'completed':
                return <Badge variant="secondary" className="text-xs">Done</Badge>
            case 'upcoming':
                return <Badge variant="outline" className="text-xs">Soon</Badge>
            default:
                return null
        }
    }

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel className="flex items-center justify-between">
                Current Projects
                <Plus className="h-4 w-4 opacity-60 hover:opacity-100 cursor-pointer transition-opacity" />
            </SidebarGroupLabel>
            <SidebarMenu>
                {projects.map((item) => (
                    <SidebarMenuItem key={item.name}>
                        <SidebarMenuButton asChild>
                            <a href={item.url} className="flex items-center gap-2">
                                <item.icon className="h-4 w-4" />
                                <span className="flex-1 truncate">{item.name}</span>
                                {getStatusBadge(item.status)}
                            </a>
                        </SidebarMenuButton>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuAction showOnHover>
                                    <MoreHorizontal />
                                    <span className="sr-only">More</span>
                                </SidebarMenuAction>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-48 rounded-lg"
                                side={isMobile ? 'bottom' : 'right'}
                                align={isMobile ? 'end' : 'start'}
                            >
                                <DropdownMenuItem>
                                    <span>View Details</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Share Project</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-600 dark:text-red-400">
                                    <span>Archive Project</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
} 