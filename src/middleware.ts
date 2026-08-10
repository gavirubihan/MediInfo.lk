import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextResponse } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export async function middleware(request: any) {
  const { pathname } = request.nextUrl;

  // 1. Let API routes pass through — never apply i18n or auth logic to them
  if (pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  // 2. Protect /admin routes — check for the auth cookie
  if (pathname.startsWith('/admin')) {
    const authToken = request.cookies.get('AuthToken');
    if (!authToken?.value) {
      // Not logged in — redirect to the localised login page
      const loginUrl = new URL('/en/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    // Cookie present — allow through
    return NextResponse.next();
  }

  // 3. All other routes — apply i18n routing
  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    '/',
    '/(si|ta|en)/:path*',
    '/admin/:path*',
    '/api/:path*',
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
