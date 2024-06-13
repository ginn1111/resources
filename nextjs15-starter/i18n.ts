import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { NextRequest } from "next/server";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

export const locales = ["vi", "en"];
export const defaultLocale = "en";

export const getLocale = (request: NextRequest) => {
  let headers = {
    "accept-language": request.headers.get("accept-language"),
  } as Negotiator.Headers;

  let languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
};

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale)) notFound();

  return {
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
