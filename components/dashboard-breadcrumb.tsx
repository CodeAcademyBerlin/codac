'use client'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from './ui/breadcrumb'
import { Separator } from './ui/separator'
import { SidebarTrigger } from './ui/sidebar'

export function DashboardBreadcrumb({
    items
}: {
    items: Array<{
        title: string
        url?: string
        isCurrentPage?: boolean
    }>
}) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                    <BreadcrumbList>
                        {items.map((item, index) => (
                            <div key={item.title} className="flex items-center gap-2">
                                <BreadcrumbItem className="hidden md:block">
                                    {item.isCurrentPage ? (
                                        <BreadcrumbPage className="font-semibold">
                                            {item.title}
                                        </BreadcrumbPage>
                                    ) : (
                                        <BreadcrumbLink
                                            href={item.url}
                                            className="text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {item.title}
                                        </BreadcrumbLink>
                                    )}
                                </BreadcrumbItem>
                                {index < items.length - 1 && (
                                    <BreadcrumbSeparator className="hidden md:block" />
                                )}
                            </div>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </header>
    )
}

// Common breadcrumb patterns for the app
export const dashboardBreadcrumbs = [
    { title: 'Dashboard', url: '/dashboard', isCurrentPage: true }
]

export const learningBreadcrumbs = [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Learning', url: '/learning', isCurrentPage: true }
]

export const coursesBreadcrumbs = [
    { title: 'Dashboard', url: '/dashboard' },
    { title: 'Learning', url: '/learning' },
    { title: 'Courses', url: '/learning/courses', isCurrentPage: true }
] 