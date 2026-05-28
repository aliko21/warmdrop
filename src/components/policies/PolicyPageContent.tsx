"use client";

import { useLanguage } from "@/components/LanguageProvider";

type PolicyType = "refund" | "shipping" | "privacy";

export default function PolicyPageContent({ type }: { type: PolicyType }) {
  const { locale, t } = useLanguage();

  const title = String(t(`policies.${type}.title`));
  const paragraphs = t(`policies.${type}.paragraphs`) as string[];
  const isArabic = locale === "ar";

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <section className="max-w-3xl mx-auto px-6">
        <h1
          className={`text-3xl md:text-4xl font-extrabold text-brand mb-8 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          {title}
        </h1>

        <div
          className={`space-y-5 text-brand/80 leading-8 bg-white rounded-3xl border border-accent/40 p-6 md:p-8 ${
            isArabic ? "text-right" : "text-left"
          }`}
        >
          {paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}

          <div className="pt-2">
            <p className="font-bold text-brand">{String(t("policies.inquiry"))}</p>
            {(type === "refund" || type === "shipping") && (
              <p>
                {String(t("policies.whatsapp"))}: 0568685828
              </p>
            )}
            {(type === "refund" || type === "privacy") && (
              <p>
                {String(t("policies.email"))}: rootone048@gmail.com
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
