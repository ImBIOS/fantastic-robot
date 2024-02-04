import { NextResponse } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const cache = new Map() // must be outside of your serverless function handler

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  analytics: true,
  limiter: Ratelimit.slidingWindow(1_000, '60s'),
  ephemeralCache: cache,
  prefix: 'alpaca-bison-crude'
})

export const ratelimitCheck = async (
  identifier: string | null | undefined
): Promise<NextResponse | void> => {
  const { success } = await ratelimit.limit(identifier ?? 'anonymous')

  if (!success) {
    return NextResponse.json({
      code: 'TOO_MANY_REQUESTS',
      message: 'Kamu terlalu cepat, coba lagi nanti'
    })
  }
}
