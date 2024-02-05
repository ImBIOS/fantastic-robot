import { type Config } from 'drizzle-kit'

import { env } from '~/env.js'

export default {
  out: './src/server/db/migrations',
  schema: './src/server/db/schema.ts',
  driver: 'mysql2',
  dbCredentials: {
    uri: env.DATABASE_URL
  },
  tablesFilter: ['fantastic-robot_*']
} satisfies Config
