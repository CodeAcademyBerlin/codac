import { genSaltSync, hashSync } from 'bcrypt-ts'
import { eq } from 'drizzle-orm'

// Import the database connection and schema from db/schema.ts
import { db, users } from '../db/schema'

export { db }

export async function getUser(email: string) {
  return await db.select().from(users).where(eq(users.email, email))
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10)
  const hash = hashSync(password, salt)

  return await db.insert(users).values({ email: email, password: hash })
}
