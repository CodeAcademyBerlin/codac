import './globals.css'

import { GeistSans } from 'geist/font'

import { Toaster } from '@/components/ui/toaster'
import AuthProvider from '@/components/providers/session-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

const title = 'codac - Learning Management System'
const description =
  'Comprehensive learning management system and community platform designed specifically for students and alumni of Code Academy Berlin. codac facilitates learning, collaboration, and community building.'

export const metadata = {
  title,
  description,
  twitter: {
    card: 'summary_large_image',
    title,
    description,
  }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={GeistSans.variable}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider session={null}>{children}</AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
