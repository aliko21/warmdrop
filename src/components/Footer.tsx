"use client";

import Link from "next/link";
import { Phone, Instagram, Mail } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-brand text-white/80" id="contact">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="3" fill="white" stroke="none" />
                </svg>
              </div>
              <span className="text-white font-bold text-xl">
                Warm<span className="text-primary">Drop</span>
              </span>
            </Link>
            <p className="text-sm text-white/55 leading-relaxed mb-6">
              {String(t("footer.brandText"))}
            </p>
            {/* Social Icons */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                {
                  icon: () => (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.14a8.16 8.16 0 004.77 1.52V7.21a4.85 4.85 0 01-1-.52z" />
                    </svg>
                  ),
                  href: "#",
                  label: "TikTok",
                },
                {
                  icon: Phone,
                  href: "https://wa.me/971568685828",
                  label: "WhatsApp",
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center hover:border-primary hover:text-primary transition-all duration-300"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Pages */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">
              {String(t("footer.pages"))}
            </h3>
            <ul className="space-y-3">
              {[
                { label: String(t("footer.home")), href: "/" },
                { label: String(t("footer.product")), href: "/product" },
                { label: String(t("footer.features")), href: "/#features" },
                { label: String(t("footer.reviews")), href: "/#reviews" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/55 hover:text-primary transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">
              {String(t("footer.policies"))}
            </h3>
            <ul className="space-y-3">
              {[
                { label: String(t("footer.privacyPolicy")), href: "/privacy-policy" },
                { label: String(t("footer.refundPolicy")), href: "/refund-policy" },
                { label: String(t("footer.shippingDelivery")), href: "/shipping-delivery" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/55 hover:text-primary transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm tracking-wider uppercase">
              {String(t("footer.contact"))}
            </h3>
            <div className="space-y-4">
              <a
                href="https://wa.me/971568685828"
                className="flex items-center gap-3 text-sm text-white/55 hover:text-primary transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone size={14} />
                </div>
                {String(t("footer.whatsapp"))}: +971568685828
              </a>
              <a
                href="mailto:hello@warmdrop.ae"
                className="flex items-center gap-3 text-sm text-white/55 hover:text-primary transition-colors group"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail size={14} />
                </div>
                hello@warmdrop.ae
              </a>
              <p className="text-xs text-white/35 mt-2">
                {String(t("footer.support247"))}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/35">
            {String(t("footer.rights"))}
          </p>
          <p className="text-xs text-white/35">
            {String(t("footer.tagline"))}
          </p>
        </div>
      </div>
    </footer>
  );
}
