import { TRPCError } from '@trpc/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

import { ratelimitCheck } from '~/lib/ratelimit'
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc'
import { users } from '~/server/db/schema'
import { api } from '~/trpc/server'

export const tokensRouter = createTRPCRouter({
  readTotal: protectedProcedure.query(async ({ ctx }) => {
    await ratelimitCheck(ctx.session.user.id)

    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id ?? ''),
      columns: {
        token: true
      }
    })

    return user?.token
  }),

  decrease: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ratelimitCheck(ctx.session.user.id)

      if (typeof input === 'undefined') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Token is required'
        })
      }

      const user = await ctx.db.query.users.findFirst({
        where: eq(users.id, ctx.session.user.id ?? ''),
        columns: {
          token: true
        }
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found'
        })
      }

      if (!user.token) {
        throw new TRPCError({
          code: 'PRECONDITION_FAILED',
          message: 'User found but token is not found'
        })
      }

      const updatedToken = user.token - input
      await ctx.db
        .update(users)
        .set({
          token: updatedToken
        })
        .where(eq(users.id, ctx.session.user.id ?? ''))

      return updatedToken
    }),

  testRevalidate: protectedProcedure.query(async ({ ctx }) => {
    await ratelimitCheck(ctx.session.user.id)

    await api.tokens.decrease.mutate(1)

    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session.user.id ?? ''),
      columns: {
        token: true
      }
    })

    await api.tokens.readTotal.revalidate()

    return user?.token
  })
})
