import './globals.css'

import { GeistSans } from 'geist/font/sans'

import { Toaster } from '@/components/ui/toaster'
import { SessionProvider } from 'next-auth/react'

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
  },
  metadataBase: new URL('https://codac.vercel.app'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={GeistSans.variable}>
        <SessionProvider>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  )
}
