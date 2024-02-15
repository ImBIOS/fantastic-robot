import { NextResponse } from 'next/server';
import { type NextAuthRequest } from 'node_modules/next-auth/lib';

import { parse } from './_utils';

const AppMiddleware = (req: NextAuthRequest) => {
  const { path, fullPath } = parse(req);
  // if there's no session and the path isn't /login or /register, redirect to /login
  if (
    !req.auth?.user.email &&
    path !== '/login' &&
    path !== '/register' &&
    path !== '/auth/saml'
  ) {
    return NextResponse.redirect(
      new URL(
        `/login${path === '/' ? '' : `?next=${encodeURIComponent(fullPath)}`}`,
        req.url,
      ),
    );

    // if there's a session
  } else if (req.auth?.user.email) {
    // if the user was created in the last 10s
    // (this is a workaround because the `isNewUser` flag is triggered when a user does `dangerousEmailAccountLinking`)
    if (
      req.auth.user.createdAt &&
      new Date(req.auth.user.createdAt).getTime() > Date.now() - 10_000 &&
      path === '/'
    ) {
      // redirect to /welcome flow
      return NextResponse.redirect(new URL('/welcome', req.url));

      // if the path is /login or /register, redirect to "/"
    } else if (path === '/login' || path === '/register') {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // otherwise, rewrite the path to /app
  return NextResponse.rewrite(
    new URL(`/app.gitmoji.academy${fullPath === '/' ? '' : fullPath}`, req.url),
  );
};

export default AppMiddleware;
