import { type NextRequest, NextResponse } from "next/server";

import { HOME_DOMAIN } from "../constant";
import { parse } from "./_utils";

export default function ApiMiddleware(req: NextRequest) {
	const { fullPath, domain } = parse(req);
	if (fullPath === "/" && domain === "api.gitmoji.academy") {
		return NextResponse.redirect(HOME_DOMAIN, {
			status: 307,
		});
	}
	// NOTE: we don't have to account for paths starting with `/api`
	// since they're automatically excluded via our middleware matcher
	return NextResponse.rewrite(new URL(`/api${fullPath}`, req.url));
}
