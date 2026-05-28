"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { t } = useLanguage();

  const navLinks = [
    { label: String(t("nav.home")), href: "/" },
    { label: String(t("nav.product")), href: "/product" },
    { label: String(t("nav.features")), href: "/#features" },
    { label: String(t("nav.reviews")), href: "/#reviews" },
    { label: String(t("nav.contact")), href: "/#contact" },
  ];

  // الصفحة الرئيسية لها Hero داكن → نص أبيض عند الأعلى
  // باقي الصفحات لها خلفية فاتحة → نص داكن دائماً
  const isHomePage = pathname === "/";
  const useDarkText = scrolled || !isHomePage;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-warm py-3" : "bg-transparent py-5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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
              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10" />
              <path d="M12 2c0 0 4 4 4 8" />
              <circle cx="12" cy="12" r="3" fill="white" stroke="none" />
            </svg>
          </div>
          <span
            className={`font-bold text-xl tracking-wide transition-colors duration-300 ${
              useDarkText ? "text-brand" : "text-white"
            }`}
          >
            Warm<span className="text-primary">Drop</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium transition-colors duration-300 relative group ${
                  useDarkText
                    ? "text-brand/70 hover:text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <Link
            href="/product"
            className="hidden md:flex items-center gap-2 bg-primary hover:bg-primary-dark text-white text-sm font-bold px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-glow hover:scale-105"
          >
            <ShoppingCart size={15} />
            {String(t("nav.orderNow"))}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 transition-colors ${
              useDarkText ? "text-brand" : "text-white"
            }`}
            aria-label={String(t("nav.menu"))}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden glass border-t border-primary/10"
          >
            <ul className="px-6 py-5 space-y-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-brand/80 hover:text-primary font-medium py-1 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/product"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center gap-2 bg-primary text-white font-bold py-3 rounded-full mt-2"
                >
                  <ShoppingCart size={16} />
                  {String(t("nav.orderNow"))}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
