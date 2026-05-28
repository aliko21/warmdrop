"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import type { Locale } from "@/lib/i18n";

const languageItems: Array<{ locale: Locale; flag: string; nameKey: string }> = [
  { locale: "ar", flag: "🇦🇪", nameKey: "language.arabic" },
  { locale: "en", flag: "🇬🇧", nameKey: "language.english" },
  { locale: "sv", flag: "🇸🇪", nameKey: "language.swedish" },
];

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const current = languageItems.find((item) => item.locale === locale) ?? languageItems[0];

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-2 bg-white/80 border border-primary/25 hover:border-primary/60 text-brand rounded-full px-3 py-2 text-sm font-semibold shadow-sm transition-all"
        aria-label={String(t("language.label"))}
      >
        <span>{current.flag}</span>
        <span>{String(t(current.nameKey))}</span>
        <ChevronDown size={15} className={`transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute mt-2 right-0 min-w-[180px] rounded-2xl border border-primary/20 bg-white shadow-warm p-2 z-50">
          {languageItems.map((item) => (
            <button
              type="button"
              key={item.locale}
              onClick={() => {
                setLocale(item.locale);
                setOpen(false);
              }}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                item.locale === locale
                  ? "bg-primary/15 text-brand font-bold"
                  : "text-brand/80 hover:bg-primary/10"
              }`}
            >
              <span>{item.flag}</span>
              <span>{String(t(item.nameKey))}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
