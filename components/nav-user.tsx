'use client'

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from './ui/sidebar'
import {
    ChevronsUpDown,
    LogOut,
    Settings,
    User,
    Zap,
    Crown
} from 'lucide-react'

export function NavUser({
    user,
}: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const { isMobile } = useSidebar()

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-sidebar-accent/50 transition-colors"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.name}</span>
                                <span className="truncate text-xs text-muted-foreground">
                                    {user.email}
                                </span>
                            </div>
                            <div className="flex items-center gap-1">
                                <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                                    <Crown className="h-3 w-3 mr-1" />
                                    Pro
                                </Badge>
                                <ChevronsUpDown className="ml-1 h-4 w-4" />
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? 'bottom' : 'right'}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs text-muted-foreground">
                                        {user.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="gap-2">
                                <User className="h-4 w-4" />
                                <span>Account</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                                <Settings className="h-4 w-4" />
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                                <Zap className="h-4 w-4" />
                                <span>Upgrade Plan</span>
                                <Badge variant="outline" className="ml-auto text-xs">
                                    New
                                </Badge>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="gap-2 text-red-600 dark:text-red-400">
                            <LogOut className="h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
} 