import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
    BookOpen,
    TrendingUp,
    Users,
    Calendar,
    Target,
    Award,
    Clock,
    AlertCircle,
    CheckCircle,
    Activity,
    Heart,
    Shield,
    BarChart3,
    MessageSquare
} from 'lucide-react'
import * as React from 'react'
import { auth } from '@/app/auth'
import { UserRole, getRolePermissions } from '@/lib/user-roles'
import { UserRoleBadge } from '@/components/user-role-badge'

export default async function Dashboard() {
    const session = await auth()
    const userName = session?.user?.name?.split(' ')[0] || 'User'
    const userRole = (session?.user as any)?.role as UserRole || 'student'
    const permissions = getRolePermissions(userRole)

    // Role-based greeting and description
    const getRoleBasedWelcome = () => {
        switch (userRole) {
            case 'student':
                return {
                    greeting: `Welcome back, ${userName}! 📚`,
                    description: 'Continue your learning journey with Code Academy Berlin'
                }
            case 'alumni':
                return {
                    greeting: `Hello ${userName}! 🎓`,
                    description: 'Stay connected with the Code Academy Berlin community'
                }
            case 'mentor':
                return {
                    greeting: `Welcome back, ${userName}! 💡`,
                    description: 'Guide and inspire the next generation of developers'
                }
            case 'admin':
                return {
                    greeting: `Dashboard Overview, ${userName} ⚡`,
                    description: 'Monitor and manage the Code Academy Berlin platform'
                }
        }
    }

    const welcome = getRoleBasedWelcome()

    // Role-based stats
    const getRoleBasedStats = () => {
        switch (userRole) {
            case 'student':
                return [
                    { title: 'Active Courses', value: '4', change: '+2 from last month', icon: BookOpen },
                    { title: 'Assignments Due', value: '3', change: '2 due this week', icon: Target },
                    { title: 'Study Streak', value: '12', change: 'days in a row', icon: Award },
                    { title: 'Study Hours', value: '28.5', change: 'this week', icon: Clock }
                ]
            case 'alumni':
                return [
                    { title: 'Community Posts', value: '8', change: '+3 this month', icon: MessageSquare },
                    { title: 'Mentoring Sessions', value: '2', change: 'upcoming', icon: Heart },
                    { title: 'Network Connections', value: '45', change: '+5 new', icon: Users },
                    { title: 'Profile Views', value: '124', change: 'this month', icon: Activity }
                ]
            case 'mentor':
                return [
                    { title: 'Active Mentees', value: '6', change: '+1 this month', icon: Users },
                    { title: 'Sessions This Week', value: '8', change: '2 pending', icon: Calendar },
                    { title: 'Success Rate', value: '94%', change: 'student completion', icon: Award },
                    { title: 'Hours Mentored', value: '32', change: 'this month', icon: Clock }
                ]
            case 'admin':
                return [
                    { title: 'Total Users', value: '1,247', change: '+23 this week', icon: Users },
                    { title: 'Active Courses', value: '18', change: '3 new courses', icon: BookOpen },
                    { title: 'System Health', value: '98%', change: 'uptime', icon: Activity },
                    { title: 'Support Tickets', value: '4', change: '2 resolved today', icon: AlertCircle }
                ]
        }
    }

    const stats = getRoleBasedStats()

    // Role-based alert
    const getRoleBasedAlert = () => {
        switch (userRole) {
            case 'student':
                return {
                    title: 'Upcoming: Web Development Bootcamp',
                    description: 'Your intensive bootcamp starts Monday, December 9th. Make sure to complete the pre-work assignments.'
                }
            case 'alumni':
                return {
                    title: 'Alumni Networking Event',
                    description: 'Join us for the monthly alumni meetup on December 15th. Connect with fellow graduates and share your experiences.'
                }
            case 'mentor':
                return {
                    title: 'New Mentee Assignment',
                    description: 'You have been assigned 2 new mentees for the upcoming cohort. Please review their profiles and schedule initial meetings.'
                }
            case 'admin':
                return {
                    title: 'System Maintenance Scheduled',
                    description: 'Planned maintenance on December 10th from 2-4 AM UTC. All users have been notified via email.'
                }
        }
    }

    const alertInfo = getRoleBasedAlert()

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* Welcome Header */}
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{welcome.greeting}</h1>
                    <p className="text-muted-foreground">
                        {welcome.description}
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <UserRoleBadge role={userRole} />
                    <Badge variant="secondary" className="text-sm">
                        <Activity className="w-4 h-4 mr-1" />
                        Online
                    </Badge>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {stat.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Role-based Alert */}
            <Alert className="border-l-4 border-l-primary">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{alertInfo.title}</AlertTitle>
                <AlertDescription>
                    {alertInfo.description}
                </AlertDescription>
            </Alert>

            {/* Main Content Tabs - Role-based */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    {permissions.canViewCourses && <TabsTrigger value="courses">Courses</TabsTrigger>}
                    {userRole === 'mentor' && <TabsTrigger value="mentoring">Mentoring</TabsTrigger>}
                    {userRole === 'admin' && <TabsTrigger value="admin">Admin</TabsTrigger>}
                    {(userRole === 'student' || userRole === 'alumni') && <TabsTrigger value="progress">Progress</TabsTrigger>}
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    {/* Role-based overview content */}
                    {userRole === 'student' && (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BookOpen className="h-5 w-5" />
                                        Current Courses
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <p className="text-sm font-medium">Full Stack JavaScript</p>
                                                <p className="text-sm text-muted-foreground">Module 3: React & State Management</p>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Progress value={75} className="w-[100px]" />
                                                <span className="text-sm font-medium">75%</span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Quick Actions</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-2">
                                    <Button className="w-full justify-start" variant="ghost">
                                        <BookOpen className="mr-2 h-4 w-4" />
                                        Continue Learning
                                    </Button>
                                    <Button className="w-full justify-start" variant="ghost">
                                        <Target className="mr-2 h-4 w-4" />
                                        View Assignments
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {userRole === 'mentor' && (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Users className="h-5 w-5" />
                                        Active Mentees
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">6</div>
                                    <p className="text-xs text-muted-foreground">Across 3 cohorts</p>
                                </CardContent>
                            </Card>
                        </div>
                    )}

                    {userRole === 'admin' && (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <BarChart3 className="h-5 w-5" />
                                        Platform Analytics
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">98.5%</div>
                                    <p className="text-xs text-muted-foreground">User satisfaction</p>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </TabsContent>

                {/* Additional tab contents would go here based on role */}
            </Tabs>
        </div>
    )
} 