import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function DashboardSkeleton() {
  return (
    <div className="flex-1 space-y-6 p-6 pt-6">
      {/* Header Skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-[300px]" />
        <Skeleton className="h-4 w-[250px]" />
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={`stats-card-${i}`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-7 w-8 mb-1" />
              <Skeleton className="h-3 w-[90px]" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert Skeleton */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Skeleton className="h-4 w-4 mt-1" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs Skeleton */}
      <div className="space-y-4">
        <div className="flex space-x-1">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={`tab-${i}`} className="h-8 w-20" />
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <Skeleton className="h-5 w-[150px]" />
              <Skeleton className="h-3 w-[200px]" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={`content-item-${i}`} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton className="h-4 w-[120px]" />
                    <Skeleton className="h-3 w-[160px]" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-2 w-[100px]" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <Skeleton className="h-5 w-[120px]" />
              <Skeleton className="h-3 w-[180px]" />
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(4)].map((_, i) => (
                <div key={`activity-item-${i}`} className="flex items-start gap-3">
                  <Skeleton className="h-2 w-2 rounded-full mt-2" />
                  <div className="space-y-1">
                    <Skeleton className="h-3 w-[100px]" />
                    <Skeleton className="h-3 w-[80px]" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export function CourseSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={`course-card-${i}`}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <Skeleton className="h-5 w-[150px]" />
              <Skeleton className="h-5 w-12" />
            </div>
            <Skeleton className="h-3 w-full" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Skeleton className="h-2 w-full" />
              <div className="flex justify-between items-center">
                <Skeleton className="h-3 w-[80px]" />
                <Skeleton className="h-3 w-[60px]" />
              </div>
              <Skeleton className="h-8 w-full" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
