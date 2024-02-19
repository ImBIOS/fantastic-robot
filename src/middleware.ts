import { NextResponse, type NextRequest } from "next/server";

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

export default function middleware(req: NextRequest) {
	// // TODO: Remove these console.log after development complete
	// console.log("MIDDLEWARE: STARTED");
	const { domain } = parse(req);
	// console.log("middleware: checking for domain", domain);

	// NOTE for App
	if (APP_HOSTNAMES.has(domain)) {
		// console.log("middleware: checking for app");
		return auth(AppMiddleware);
	}

	// NOTE for API
	if (API_HOSTNAMES.has(domain)) {
		// console.log("middleware: checking for api");
		return ApiMiddleware(req);
	}

	// NOTE for Admin
	if (ADMIN_HOSTNAMES.has(domain)) {
		// console.log("middleware: checking for admin");
		return auth(AdminMiddleware);
	}

	// console.log("middleware: passing the response");
	// console.log("MIDDLEWARE: ENDED");
	return NextResponse.next();
}
