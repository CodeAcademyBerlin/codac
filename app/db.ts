import { genSaltSync, hashSync } from 'bcrypt-ts'
import { eq } from 'drizzle-orm'

// Import the database connection and schema from db/schema.ts
import { db, users, cohorts } from '../db/schema'

export { db }

export async function getUser(email: string) {
  return await db.select().from(users).where(eq(users.email, email))
}

export async function createUser(email: string, password: string) {
  const salt = genSaltSync(10)
  const hash = hashSync(password, salt)

  return await db.insert(users).values({ email: email, password: hash })
}

export async function getUserWithCohort(userId: string) {
  const result = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      image: users.image,
      role: users.role,
      bio: users.bio,
      github: users.github,
      linkedin: users.linkedin,
      portfolio: users.portfolio,
      cohortId: users.cohortId,
      cohortName: cohorts.name,
      cohortDescription: cohorts.description,
    })
    .from(users)
    .leftJoin(cohorts, eq(users.cohortId, cohorts.id))
    .where(eq(users.id, userId))
    .limit(1)

  return result[0] || null
}
