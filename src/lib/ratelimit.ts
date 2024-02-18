import { TRPCError } from "@trpc/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const cache = new Map(); // must be outside of your serverless function handler

const ratelimit = (
	requests = 10,
	duration:
		| `${number}ms`
		| `${number}s`
		| `${number}m`
		| `${number}h`
		| `${number}d` = "10s",
) =>
	new Ratelimit({
		redis: Redis.fromEnv(),
		analytics: true,
		limiter: Ratelimit.slidingWindow(requests, duration),
		ephemeralCache: cache,
		prefix: "fantastic-robot",
	});

export const apiRatelimitCheck = async (
	identifier: string | null | undefined,
): Promise<NextResponse | undefined> => {
	const { success } = await ratelimit(10, "1s").limit(
		identifier ?? "anonymous",
	);

	if (!success) {
		return NextResponse.json({
			code: "TOO_MANY_REQUESTS",
			message: "Kamu terlalu cepat, coba lagi nanti",
		});
	}
};

export const trpcRatelimitCheck = async (
	identifier: string | null | undefined,
) => {
	const { success } = await ratelimit(5, "1s").limit(identifier ?? "anonymous");

	if (!success) {
		throw new TRPCError({
			code: "TOO_MANY_REQUESTS",
			message: "Kamu terlalu cepat, coba lagi nanti",
		});
	}
};
