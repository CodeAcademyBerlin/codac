import { SessionProvider } from 'next-auth/react'
import { auth } from '@/app/auth'
import { Search } from './search'
import { UserNav } from './user-nav'
import { Separator } from './ui/separator'
import { SidebarTrigger } from './ui/sidebar'
import { ThemeToggle } from './theme-toggle'
import { Badge } from './ui/badge'
import { DashboardBreadcrumb } from './dashboard-breadcrumb'
import { UserRole } from './user-role-badge'
import { Bell } from 'lucide-react'
import { Button } from './ui/button'

export default async function Header() {
  const session = await auth()
  const userRole = (session?.user as any)?.role as UserRole || 'student'

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <DashboardBreadcrumb items={[
          { title: 'Dashboard', url: '/', isCurrentPage: true }
        ]} />
      </div>

      <div className="flex items-center gap-2 px-4 ml-auto">
        <div className="w-full flex-1 md:w-auto md:flex-none">
          <Search />
        </div>

        {/* Role-based header elements */}
        {session?.user && (
          <>
            {userRole === 'admin' && (
              <Badge variant="secondary" className="text-xs">
                Admin Mode
              </Badge>
            )}

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              <Badge
                variant="destructive"
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
              >
                3
              </Badge>
            </Button>
          </>
        )}

        <ThemeToggle />
        <SessionProvider>
          <UserNav />
        </SessionProvider>
      </div>
    </header>
  )
}
