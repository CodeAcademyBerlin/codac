import { SessionProvider } from 'next-auth/react'
// import { auth } from '@/app/auth';
import { Search } from './search'
import { UserNav } from './user-nav'
import { Separator } from './ui/separator'
import { SidebarTrigger } from './ui/sidebar'
import { ThemeToggle } from './theme-toggle'

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger
          className="-ml-1"
        />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>

      <div className="flex items-center gap-2 px-4 ml-auto">
        <div className="w-full flex-1 md:w-auto md:flex-none">
          <Search />
        </div>
        <ThemeToggle />
        <SessionProvider>
          <UserNav />
        </SessionProvider>
      </div>
    </header>
  )
}
