export { auth as default } from './server/auth'

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Anything with an extension (static files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)'
  ]
}
