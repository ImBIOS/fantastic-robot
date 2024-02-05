import { pointsRouter } from '~/server/api/routers/points'
import { tokensRouter } from '~/server/api/routers/tokens'
import { createTRPCRouter } from '~/server/api/trpc'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  points: pointsRouter,
  tokens: tokensRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
