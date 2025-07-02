'use server'

import { createUser, getUser } from '@/app/db'
import { redirect } from 'next/navigation'

interface RegisterData {
  email: string
  password: string
}

export async function register(data: RegisterData) {
  const user = await getUser(data.email)

  if (user.length > 0) {
    return { message: 'A user with this identifier already exists' }
  }

  await createUser(data.email, data.password)
  redirect('/login')
}
