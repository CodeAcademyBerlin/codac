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
    Activity
} from 'lucide-react'
import * as React from 'react'
import { auth } from '@/app/auth'

export default async function Dashboard() {
    const session = await auth()
    const userName = session?.user?.name?.split(' ')[0] || 'Student'

    return (
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {/* Welcome Header */}
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, {userName}! 👋</h1>
                    <p className="text-muted-foreground">
                        Continue your learning journey with Code Academy Berlin
                    </p>
                </div>
                <div className="flex items-center space-x-2">
                    <Badge variant="secondary" className="text-sm">
                        <Activity className="w-4 h-4 mr-1" />
                        Online
                    </Badge>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="transition-smooth hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Courses Active</CardTitle>
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">4</div>
                        <p className="text-xs text-muted-foreground">
                            +2 from last month
                        </p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Assignments Due</CardTitle>
                        <Target className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">
                            2 due this week
                        </p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Study Streak</CardTitle>
                        <Award className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                            days in a row
                        </p>
                    </CardContent>
                </Card>

                <Card className="transition-smooth hover:shadow-lg">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Study Hours</CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">28.5</div>
                        <p className="text-xs text-muted-foreground">
                            this week
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Important Alert */}
            <Alert className="border-l-4 border-l-primary">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Upcoming: Web Development Bootcamp</AlertTitle>
                <AlertDescription>
                    Your intensive bootcamp starts Monday, December 9th. Make sure to complete the pre-work assignments.
                </AlertDescription>
            </Alert>

            {/* Main Content Tabs */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="courses">Courses</TabsTrigger>
                    <TabsTrigger value="assignments">Assignments</TabsTrigger>
                    <TabsTrigger value="progress">Progress</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                        {/* Current Courses */}
                        <Card className="col-span-4">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <BookOpen className="h-5 w-5" />
                                    Current Courses
                                </CardTitle>
                                <CardDescription>
                                    Your active learning paths and progress
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Full Stack JavaScript
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Module 3: React & State Management
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Progress value={75} className="w-[100px]" />
                                            <span className="text-sm font-medium">75%</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                Database Design
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Module 2: Advanced SQL Queries
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Progress value={60} className="w-[100px]" />
                                            <span className="text-sm font-medium">60%</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="space-y-1">
                                            <p className="text-sm font-medium leading-none">
                                                DevOps Fundamentals
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                Module 1: Docker & Containerization
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Progress value={30} className="w-[100px]" />
                                            <span className="text-sm font-medium">30%</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="col-span-3">
                            <CardHeader>
                                <CardTitle>Quick Actions</CardTitle>
                                <CardDescription>
                                    Access your most used features
                                </CardDescription>
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
                                <Button className="w-full justify-start" variant="ghost">
                                    <Users className="mr-2 h-4 w-4" />
                                    Join Study Group
                                </Button>
                                <Button className="w-full justify-start" variant="ghost">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Schedule Session
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="courses" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card className="transition-smooth hover:shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Full Stack JavaScript</CardTitle>
                                    <Badge variant="default">Active</Badge>
                                </div>
                                <CardDescription>
                                    Complete web development with modern JavaScript
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Progress value={75} className="w-full" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Module 3 of 5</span>
                                        <span className="text-sm font-medium">75% Complete</span>
                                    </div>
                                    <Button className="w-full" size="sm">Continue Learning</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="transition-smooth hover:shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Database Design</CardTitle>
                                    <Badge variant="secondary">In Progress</Badge>
                                </div>
                                <CardDescription>
                                    Master SQL and NoSQL database concepts
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Progress value={60} className="w-full" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Module 2 of 4</span>
                                        <span className="text-sm font-medium">60% Complete</span>
                                    </div>
                                    <Button className="w-full" size="sm" variant="outline">Continue Learning</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="transition-smooth hover:shadow-lg">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">DevOps Fundamentals</CardTitle>
                                    <Badge variant="outline">Started</Badge>
                                </div>
                                <CardDescription>
                                    Learn deployment and infrastructure basics
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Progress value={30} className="w-full" />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-muted-foreground">Module 1 of 6</span>
                                        <span className="text-sm font-medium">30% Complete</span>
                                    </div>
                                    <Button className="w-full" size="sm" variant="outline">Continue Learning</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="assignments" className="space-y-4">
                    <div className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>Pending Assignments</span>
                                    <Badge variant="destructive">3 Due Soon</Badge>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="space-y-1">
                                            <p className="font-medium">React Component Library Project</p>
                                            <p className="text-sm text-muted-foreground">Full Stack JavaScript</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="destructive">Due Tomorrow</Badge>
                                            <Button size="sm">View</Button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="space-y-1">
                                            <p className="font-medium">Database Schema Design</p>
                                            <p className="text-sm text-muted-foreground">Database Design</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary">Due Dec 10</Badge>
                                            <Button size="sm" variant="outline">View</Button>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 border rounded-lg">
                                        <div className="space-y-1">
                                            <p className="font-medium">Docker Setup Assignment</p>
                                            <p className="text-sm text-muted-foreground">DevOps Fundamentals</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">Due Dec 12</Badge>
                                            <Button size="sm" variant="outline">View</Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="progress" className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <TrendingUp className="h-5 w-5" />
                                    Overall Progress
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium">Course Completion</span>
                                            <span className="text-sm">55%</span>
                                        </div>
                                        <Progress value={55} className="w-full" />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium">Assignment Completion</span>
                                            <span className="text-sm">78%</span>
                                        </div>
                                        <Progress value={78} className="w-full" />
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-sm font-medium">Skill Development</span>
                                            <span className="text-sm">63%</span>
                                        </div>
                                        <Progress value={63} className="w-full" />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Award className="h-5 w-5" />
                                    Recent Achievements
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                                            <Award className="h-4 w-4 text-yellow-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">First Project Complete</p>
                                            <p className="text-xs text-muted-foreground">Completed your first coding project</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                            <CheckCircle className="h-4 w-4 text-green-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Study Streak</p>
                                            <p className="text-xs text-muted-foreground">12 days of consistent learning</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                            <Users className="h-4 w-4 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium">Community Helper</p>
                                            <p className="text-xs text-muted-foreground">Helped 5 fellow students</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
} 