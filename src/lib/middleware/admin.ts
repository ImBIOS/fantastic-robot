import { NextResponse } from 'next/server';
import { type NextAuthRequest } from 'node_modules/next-auth/lib';

import { parse } from '~/lib/middleware/_utils';
import { env } from '~/env';

const AdminMiddleware = (req: NextAuthRequest) => {
  const { path } = parse(req);
  const isAdmin =
    !!req.auth?.user.email && env.ADMIN_EMAILS.includes(req.auth.user.email);

  if (path === '/login' && isAdmin) {
    return NextResponse.redirect(new URL('/', req.url));
  } else if (path !== '/login' && !isAdmin) {
    return NextResponse.redirect(new URL(`/login`, req.url));
  }

  return NextResponse.rewrite(
    new URL(`/admin.gitmoji.academy${path === '/' ? '' : path}`, req.url),
  );
};

export default AdminMiddleware;
