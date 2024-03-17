import { NextResponse } from "next/server";
import type { NextAuthRequest } from "node_modules/next-auth/lib";

import { env } from "~/env";
import { parse } from "~/lib/middleware/_utils";

const AdminMiddleware = (req: NextAuthRequest) => {
	const { path } = parse(req);
	const isAdmin =
		!!req.auth?.user.email && env.ADMIN_EMAILS.includes(req.auth.user.email);

	if (path === "/login" && isAdmin) {
		return NextResponse.redirect(new URL("/", req.url));
	}
	if (path !== "/login" && !isAdmin) {
		return NextResponse.redirect(new URL("/login", req.url));
	}

	return NextResponse.rewrite(
		new URL(`/admin.gitmoji.academy${path === "/" ? "" : path}`, req.url),
	);
};

export default AdminMiddleware;
