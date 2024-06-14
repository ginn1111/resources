import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';

import { defaultLocale, localePrefix, locales } from '@/config';

export const middleware = (request: NextRequest) => {
  const handleWithI18n = createMiddleware({
    locales,
    localePrefix,
    defaultLocale,
  });

  const response = handleWithI18n(request);

  console.log(response);

  if (!request.cookies.get('next-auth.session-token')?.value) {
    response.headers.set('url', '/login');
  }

  return response;
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
