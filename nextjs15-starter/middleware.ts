import createMiddleware from 'next-intl/middleware';
import { NextFetchEvent, NextResponse } from 'next/server';

import { defaultLocale, localePrefix, locales } from '@/config';
import { getToken } from 'next-auth/jwt';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import authOptions from './app/api/auth/[...nextauth]/options';

const publicPages = ['/login'];

const i18nMiddleware = createMiddleware({
  locales,
  localePrefix,
  defaultLocale,
});

const protectedMiddleware = withAuth((req) => i18nMiddleware(req), {
  callbacks: {
    authorized({ token }) {
      if (token) return true;

      return false;
    },
  },
  pages: authOptions.pages,
});

export const middleware = async (
  request: NextRequestWithAuth,
  event: NextFetchEvent
) => {
  const publicPathRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})`,
    'i'
  );

  const loginPathRegex = RegExp(`^(/(${locales.join('|')}))?(/login)$`, 'i');

  const { pathname } = request.nextUrl;
  const isPublicPage = publicPathRegex.test(request.nextUrl.pathname);

  if (loginPathRegex.test(pathname)) {
    const token = await getToken({ req: request, secret: authOptions.secret });
    const locale = request.cookies.get('NEXT_LOCALE')?.value ?? defaultLocale;

    if (token) {
      return NextResponse.redirect(new URL(`/${locale}/`, request.url));
    }
  }

  if (isPublicPage) {
    return i18nMiddleware(request);
  }

  return protectedMiddleware(request, event);
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
