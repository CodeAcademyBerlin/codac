import { UserNav } from './user-nav'
import { Separator } from './ui/separator'
import { SidebarTrigger } from './ui/sidebar'
import { ThemeToggle } from './theme-toggle'

export default async function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
      </div>

      <div className="flex items-center gap-2 px-4 ml-auto">
        <ThemeToggle />
        <UserNav />
      </div>
    </header>
  )
}
