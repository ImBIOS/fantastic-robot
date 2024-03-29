import { NextResponse } from "next/server";

import { ADMIN_HOSTNAMES, API_HOSTNAMES, APP_HOSTNAMES } from "./lib/constant";
import {
	AdminMiddleware,
	ApiMiddleware,
	AppMiddleware,
} from "./lib/middleware";
import { parse } from "./lib/middleware/_utils";
import { auth } from "./server/auth";

export const config = {
	matcher: [
		/*
		 * Match all paths except for:
		 * 1. /api/ routes
		 * 2. /_next/ (Next.js internals)
		 * 3. /_proxy/ (special page for OG tags proxying)
		 * 4. /_static (inside /public)
		 * 5. /_vercel (Vercel internals)
		 * 6. Static files (e.g. /favicon.ico, /sitemap.xml, /robots.txt, etc.)
		 */
		"/((?!api/|_next/|_proxy/|_static|_vercel|[\\w-]+\\.\\w+).*)",
	],
};

export default auth((req) => {
	const { domain } = parse(req);

	// NOTE for App
	if (APP_HOSTNAMES.has(domain)) {
		return AppMiddleware(req);
	}

	// NOTE for API
	if (API_HOSTNAMES.has(domain)) {
		return ApiMiddleware(req);
	}

	// NOTE for Admin
	if (ADMIN_HOSTNAMES.has(domain)) {
		return AdminMiddleware(req);
	}

	return NextResponse.next();
});
