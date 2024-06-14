import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale, localePrefix } from "@/config";
import { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  const handleWithI18n = createMiddleware({
    locales,
    localePrefix,
    defaultLocale,
  });

  const response = handleWithI18n(request);

  return response;
};

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
