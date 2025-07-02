import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import '@/app/globals.css'

import { AppSidebar } from '@/components/app-sidebar'
import Header from '@/components/header'

const title = 'Dashboard'
const description = ''

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  },
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
