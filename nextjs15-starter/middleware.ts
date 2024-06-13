import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale, getLocale } from "@/i18n";
import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  const pathNameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathNameHasLocale) return;

  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  console.log("redirect");

  return NextResponse.redirect(request.nextUrl);
};

export const config = {
  matchers: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
    "/(en|vi)/:path*",
  ],
};
