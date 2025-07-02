import { SessionProvider } from 'next-auth/react'
// import { auth } from '@/app/auth';
import { Search } from './search'
import { SidebarTrigger } from './ui/sidebar'
import { UserNav } from './user-nav'

export default function Header() {
  return (
    <header className="sticky flex justify-center border-b">
      <div className="flex items-center justify-between w-full h-16 px-4 mx-auto sm:px-6">
        <SidebarTrigger />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <SessionProvider>
            <UserNav />
          </SessionProvider>
        </div>
      </div>
    </header>
  )
}
