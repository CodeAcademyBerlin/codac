import { auth } from '@/app/auth'
import ProfileForm from '@/components/profile-form'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default async function ProfilePage() {
  const session = await auth()

  if (!session?.user) {
    return null
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-12">
      <Card className="w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl text-center">My Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={session.user.image ?? undefined} />
              <AvatarFallback>{session.user.name?.[0] ?? session.user.email?.[0]}</AvatarFallback>
            </Avatar>
          </div>

          <ProfileForm user={session.user} />
        </CardContent>
      </Card>
    </div>
  )
}
