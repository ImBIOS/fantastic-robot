import type { OAuthTokenReq } from "@boxyhq/saml-jackson";
import { NextResponse } from "next/server";
import jackson from "~/lib/jackson";

export async function POST(req: Request) {
	const { oauthController } = await jackson();

	const formData = await req.formData();
	const body = Object.fromEntries(formData.entries());

	const token = await oauthController.token(body as unknown as OAuthTokenReq);

	return NextResponse.json(token);
}
