import type { OAuthReq } from "@boxyhq/saml-jackson";
import { NextResponse } from "next/server";
import jackson from "~/lib/jackson";
import { getSearchParams } from "~/lib/utils";

const handler = async (req: Request) => {
	const { oauthController } = await jackson();

	const requestParams = (
		req.method === "GET" ? getSearchParams(req.url) : await req.json()
	) as OAuthReq;

	const { redirect_url, authorize_form } =
		await oauthController.authorize(requestParams);

	if (redirect_url) {
		return NextResponse.redirect(redirect_url, {
			status: 302,
		});
	}

	return new Response(authorize_form, {
		headers: {
			"Content-Type": "text/html; charset=utf-8",
		},
	});
};

export { handler as GET, handler as POST };
