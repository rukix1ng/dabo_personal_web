"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { content, type Locale } from "@/lib/i18n";
import { LanguageSwitcher } from "./language-switcher";

interface NavbarProps {
  locale: Locale;
}

export function Navbar({ locale }: NavbarProps) {
  const pathname = usePathname();
  const t = content[locale];

  const navItems = [
    { key: "home", href: `/${locale}` },
    { key: "forum", href: `/${locale}/forum` },
    { key: "achievements", href: `/${locale}/achievements` },
    { key: "papers", href: `/${locale}/papers` },
  ] as const;

  const isActive = (href: string) => {
    if (href === `/${locale}`) {
      // For home page, match exactly or with trailing slash
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-border/50 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo/Brand */}
        <div className="flex items-center">
          <Link
            href={`/${locale}`}
            className="text-xl font-bold tracking-tight text-foreground transition-colors hover:text-primary"
          >
            {t.hero.name}
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="hidden items-center gap-0.5 sm:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive(item.href)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
            >
              {t.navigation[item.key]}
              {isActive(item.href) && (
                <span className="absolute bottom-0 left-1/2 h-0.5 w-8 -translate-x-1/2 rounded-full bg-primary" />
              )}
            </Link>
          ))}
        </div>

        {/* Language Switcher */}
        <LanguageSwitcher currentLocale={locale} />
      </div>

      {/* Mobile Navigation */}
      <div className="border-t border-border/50 bg-background/80 px-4 py-3 sm:hidden">
        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${isActive(item.href)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
            >
              {t.navigation[item.key]}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
