import { auth } from '@/app/auth'
import type { UserRole } from '@/lib/user-roles'
import {
  Activity,
  AlertCircle,
  Award,
  BookOpen,
  Calendar,
  Clock,
  Heart,
  MessageSquare,
  Target,
  Users,
} from 'lucide-react'
import * as React from 'react'

export default async function Dashboard() {
  const session = await auth()
  const userName = session?.user?.name?.split(' ')[0] || 'User'
  // Type assertion for user role - this is safe because we control the user object structure
  const userRole = (session?.user as { role?: UserRole })?.role || 'student'

  // Role-based greeting and description
  const getRoleBasedWelcome = () => {
    switch (userRole) {
      case 'student':
        return {
          greeting: `Welcome back, ${userName}! 📚`,
          description: 'Continue your learning journey with Code Academy Berlin',
        }
      case 'alumni':
        return {
          greeting: `Hello ${userName}! 🎓`,
          description: 'Stay connected with the Code Academy Berlin community',
        }
      case 'mentor':
        return {
          greeting: `Welcome back, ${userName}! 💡`,
          description: 'Guide and inspire the next generation of developers',
        }
      case 'admin':
        return {
          greeting: `Dashboard Overview, ${userName} ⚡`,
          description: 'Monitor and manage the Code Academy Berlin platform',
        }
    }
  }

  // Role-based stats
  const getRoleBasedStats = () => {
    switch (userRole) {
      case 'student':
        return [
          { title: 'Active Courses', value: '4', change: '+2 from last month', icon: BookOpen },
          { title: 'Assignments Due', value: '3', change: '2 due this week', icon: Target },
          { title: 'Study Streak', value: '12', change: 'days in a row', icon: Award },
          { title: 'Study Hours', value: '28.5', change: 'this week', icon: Clock },
        ]
      case 'alumni':
        return [
          { title: 'Community Posts', value: '8', change: '+3 this month', icon: MessageSquare },
          { title: 'Mentoring Sessions', value: '2', change: 'upcoming', icon: Heart },
          { title: 'Network Connections', value: '45', change: '+5 new', icon: Users },
          { title: 'Profile Views', value: '124', change: 'this month', icon: Activity },
        ]
      case 'mentor':
        return [
          { title: 'Active Mentees', value: '6', change: '+1 this month', icon: Users },
          { title: 'Sessions This Week', value: '8', change: '2 pending', icon: Calendar },
          { title: 'Success Rate', value: '94%', change: 'student completion', icon: Award },
          { title: 'Hours Mentored', value: '32', change: 'this month', icon: Clock },
        ]
      case 'admin':
        return [
          { title: 'Total Users', value: '1,247', change: '+23 this week', icon: Users },
          { title: 'Active Courses', value: '18', change: '3 new courses', icon: BookOpen },
          { title: 'System Health', value: '98%', change: 'uptime', icon: Activity },
          { title: 'Support Tickets', value: '4', change: '2 resolved today', icon: AlertCircle },
        ]
    }
  }

  // Role-based alert
  const getRoleBasedAlert = () => {
    switch (userRole) {
      case 'student':
        return {
          title: 'Upcoming: Web Development Bootcamp',
          description:
            'Your intensive bootcamp starts Monday, December 9th. Make sure to complete the pre-work assignments.',
        }
      case 'alumni':
        return {
          title: 'Alumni Networking Event',
          description:
            'Join us for the monthly alumni meetup on December 15th. Connect with fellow graduates and share your experiences.',
        }
      case 'mentor':
        return {
          title: 'New Mentee Assignment',
          description:
            'You have been assigned 2 new mentees for the upcoming cohort. Please review their profiles and schedule initial meetings.',
        }
      case 'admin':
        return {
          title: 'System Maintenance Scheduled',
          description:
            'Planned maintenance on December 10th from 2-4 AM UTC. All users have been notified via email.',
        }
    }
  }

  // Suppress unused variable warnings for development - these will be used when implementing the UI
  console.log({ getRoleBasedWelcome, getRoleBasedStats, getRoleBasedAlert })

  return <div className="flex flex-1 flex-col gap-4 p-4 pt-0" />
}
