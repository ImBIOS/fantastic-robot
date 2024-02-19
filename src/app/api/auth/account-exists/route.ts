import { ipAddress } from "@vercel/edge";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "~/env";
import { LOCALHOST_IP } from "~/lib/constant";
import { ratelimit } from "~/lib/ratelimit";
import { auth } from "~/server/auth";

export const runtime = "edge";

export async function POST(req: NextRequest) {
	const ip = ipAddress(req) ?? LOCALHOST_IP;
	const { success } = await ratelimit(5, "1 m").limit(ip);
	if (!success) {
		return new Response("Don't DDoS me pls 🥺", { status: 429 });
	}

	const { email } = (await req.json()) as { email: string };

	if (!env.DATABASE_URL) {
		return new Response("Database connection not established", {
			status: 500,
		});
	}

	if (env.NODE_ENV !== "production") {
		return NextResponse.json({ exists: true });
	}

	const session = await auth();
	if (session?.user.email === email) {
		return NextResponse.json({ exists: true });
	}

	return NextResponse.json({ exists: false });
}
