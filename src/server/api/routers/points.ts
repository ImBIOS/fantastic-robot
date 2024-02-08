import { eq } from 'drizzle-orm';
import { z } from 'zod';

import { ratelimitCheck } from '~/lib/ratelimit';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import { points } from '~/server/db/schema';

export const pointsRouter = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    await ratelimitCheck(ctx.session.user.id);
    // api.tokens.readTotal.revalidate()
    const currentUserPoints = await ctx.db.query.points.findFirst({
      where: (fields, operator) =>
        operator.eq(fields.userId, ctx.session.user.id),
    });

    if (!currentUserPoints) {
      await ctx.db.insert(points).values({
        id: `points-${ctx.session.user.id}`,
        exp: 0,
        userId: ctx.session.user.id,
      });

      return await ctx.db.query.points.findFirst({
        where: (fields, operator) =>
          operator.eq(fields.userId, ctx.session.user.id),
      });
    }

    return currentUserPoints;
  }),
  incrementBy: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ratelimitCheck(ctx.session.user.id);
      // api.tokens.readTotal.revalidate()
      const currentUserPoints = await ctx.db.query.points.findFirst({
        where: (fields, operator) =>
          operator.eq(fields.userId, ctx.session.user.id),
      });

      if (!currentUserPoints) {
        await ctx.db.insert(points).values({
          id: `points-${ctx.session.user.id}`,
          exp: input,
          userId: ctx.session.user.id,
        });
      }

      await ctx.db
        .update(points)
        .set({
          exp: (currentUserPoints?.exp ?? 0) + input,
        })
        .where(eq(points.userId, ctx.session.user.id));

      return await ctx.db.query.points.findFirst({
        where: (fields, operator) =>
          operator.eq(fields.userId, ctx.session.user.id),
      });
    }),
  decrementBy: protectedProcedure
    .input(z.number())
    .mutation(async ({ ctx, input }) => {
      await ratelimitCheck(ctx.session.user.id);
      // api.tokens.readTotal.revalidate()
      const currentUserPoints = await ctx.db.query.points.findFirst({
        where: (fields, operator) =>
          operator.eq(fields.userId, ctx.session.user.id),
      });

      if (!currentUserPoints) {
        await ctx.db.insert(points).values({
          id: `points-${ctx.session.user.id}`,
          exp: 0,
          userId: ctx.session.user.id,
        });
      }

      await ctx.db
        .update(points)
        .set({
          exp: (currentUserPoints?.exp ?? 0) - input,
        })
        .where(eq(points.userId, ctx.session.user.id));

      return await ctx.db.query.points.findFirst({
        where: (fields, operator) =>
          operator.eq(fields.userId, ctx.session.user.id),
      });
    }),
});
