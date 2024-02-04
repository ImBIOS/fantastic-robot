import { DrizzleAdapter } from '@auth/drizzle-adapter'
import NextAuth, { type DefaultSession } from 'next-auth'
import Discord, { type DiscordProfile } from 'next-auth/providers/discord'
import Google from 'next-auth/providers/google'

import { db } from './db'
import { mysqlTable, type UserRole } from './db/schema'

declare module 'next-auth' {
  interface Session {
    user: {
      /** The user's id. */
      id: string
      /** The user's role. */
      role: UserRole
    } & DefaultSession['user']
  }

  interface User {
    /** The user's role. */
    role: UserRole
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signOut,
  signIn
} = NextAuth({
  providers: [
    Discord({
      profile: (profile: DiscordProfile) => ({
        role: 'user',
        ...profile
      })
    }),
    Google
  ],
  // TODO: Remove this when the types are fixed
  // @ts-expect-error - The types are wrong @see https://github.com/nextauthjs/next-auth/issues/9493#issuecomment-1913353082
  adapter: DrizzleAdapter(db, mysqlTable),
  callbacks: {
    jwt({ token, profile, user }) {
      if (profile) {
        token.id = profile.id
        token.image = profile.avatar_url ?? profile.picture
      }
      if (user) {
        token.role = user.role
      }
      return token
    },
    session({ session, user }) {
      session.user.id = user.id
      session.user.role = user.role
      return session
    },
    authorized({ auth }) {
      return !!auth?.user // this ensures there is a logged in user for -every- request
    }
  },
  pages: {
    signIn: '/sign-in', // overrides the next-auth default signin page https://authjs.dev/guides/basics/pages
    error: '/sign-in'
  }
})
