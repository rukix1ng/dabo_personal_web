import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, locales, type Locale } from "./lib/i18n";

const PUBLIC_FILE = /\.(.*)$/;

function getBrowserLocale(request: NextRequest): Locale {
  const acceptLanguage = request.headers.get("accept-language");
  if (!acceptLanguage) return defaultLocale;

  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(",")
    .map((lang) => {
      const [locale, q = "q=1"] = lang.trim().split(";");
      const quality = parseFloat(q.replace("q=", "")) || 1;
      return { locale: locale.toLowerCase().split("-")[0], quality };
    })
    .sort((a, b) => b.quality - a.quality);

  // Find matching locale
  for (const { locale } of languages) {
    if (locale === "zh" || locale === "ja" || locale === "en") {
      return locale as Locale;
    }
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );

  if (!hasLocale) {
    // Check cookie first, then browser language, then default
    const cookieLocale = request.cookies.get("locale")?.value as Locale | undefined;
    const browserLocale = cookieLocale || getBrowserLocale(request);
    const locale = locales.includes(browserLocale) ? browserLocale : defaultLocale;
    
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(url);
  }

  const locale = pathname.split("/")[1] ?? defaultLocale;
  const response = NextResponse.next();
  response.cookies.set("locale", locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });
  return response;
}

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
