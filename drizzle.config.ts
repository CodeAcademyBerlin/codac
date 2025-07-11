import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

// Load environment variables from .env.local
config({ path: '.env.local' })

export default defineConfig({
  out: './drizzle',
  schema: './db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: `${process.env.POSTGRES_URL}?sslmode=require`,
  },
})
