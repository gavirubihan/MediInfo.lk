import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest } from 'next/server';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: any) {
  const { pathname } = request.nextUrl;
  
  // Bypass i18n localization for pure English admin panel routes (/admin, /admin/*)
  if (pathname.startsWith('/admin')) {
    return;
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    '/', 
    '/(si|ta|en)/:path*', 
    '/((?!_next|_vercel|admin|.*\\..*).*)'
  ]
};
