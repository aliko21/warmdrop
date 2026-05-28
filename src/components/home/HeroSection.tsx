"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Play, ShoppingCart } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const heroText = {
  ar: {
    badge: "السعر الافتتاحي · 449 درهم فقط",
    titleLine1: "حول زاوية",
    titleHighlight: "الماء",
    titleLine3: "إلى قطعة ديكور فاخرة",
    description:
      "ستاند ماء بتصميم دافئ وعصري يضيف لمسة فاخرة لمنزلك مع إضاءة هادئة وتفاصيل أنيقة.",
    orderNow: "اطلب الآن",
    watchVideo: "شاهد الفيديو",
    stats: [
      { value: "+500", label: "عميل سعيد" },
      { value: "⭐ 4.9", label: "تقييم المنتج" },
      { value: "24 ساعة", label: "توصيل سريع" },
    ],
    priceNow: "449 درهم",
    oldPrice: "999 درهم",
    scroll: "اسحب للأسفل",
  },
  en: {
    badge: "Launch Price · AED 449 Only",
    titleLine1: "Turn your",
    titleHighlight: "water",
    titleLine3: "corner into luxury decor",
    description:
      "A warm, modern water stand that adds a premium touch to your home with elegant details and calm lighting.",
    orderNow: "Order Now",
    watchVideo: "Watch Video",
    stats: [
      { value: "+500", label: "Happy Customers" },
      { value: "⭐ 4.9", label: "Product Rating" },
      { value: "24h", label: "Fast Delivery" },
    ],
    priceNow: "AED 449",
    oldPrice: "AED 999",
    scroll: "Scroll Down",
  },
  sv: {
    badge: "Lanseringspris · Endast 449 AED",
    titleLine1: "Gor din",
    titleHighlight: "vatten",
    titleLine3: "horna till lyxig inredning",
    description:
      "Ett varmt och modernt vattenstall som ger ditt hem en premiumkansla med elegant design och lugn belysning.",
    orderNow: "Bestall Nu",
    watchVideo: "Se Video",
    stats: [
      { value: "+500", label: "Nojda kunder" },
      { value: "⭐ 4.9", label: "Produktbetyg" },
      { value: "24h", label: "Snabb leverans" },
    ],
    priceNow: "449 AED",
    oldPrice: "999 AED",
    scroll: "Skrolla ned",
  },
} as const;

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  const { locale } = useLanguage();
  const text = heroText[locale];
  const textAlign = locale === "ar" ? "text-right" : "text-left";
  const justify = locale === "ar" ? "justify-end" : "justify-start";

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative min-h-screen bg-brand overflow-hidden flex items-center">
      {/* ── Background Layers ── */}
      <div className="absolute inset-0">
        {/* Product image (replace src with real image) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
        />
        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-brand/40 via-brand/75 to-brand" />
        {/* Warm ambient glows */}
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-1/2 w-72 h-72 bg-accent/15 rounded-full blur-[100px]" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[85vh]">
          {/* Text */}
          <motion.div
            className={`${textAlign} order-2 lg:order-1`}
            variants={containerVariants}
            initial="hidden"
            animate={isClient ? "visible" : "hidden"}
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2.5 glass-dark rounded-full px-5 py-2 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary text-xs font-semibold tracking-widest uppercase">
                {text.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-7"
            >
              {text.titleLine1}
              <br />
              <span className="text-gradient">{text.titleHighlight}</span>
              {locale === "ar" ? " إلى" : " "}
              <br />
              {text.titleLine3}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-white/65 text-lg leading-relaxed mb-11 max-w-lg"
            >
              {text.description}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={itemVariants} className={`flex flex-wrap gap-4 ${justify}`}>
              <Link
                href="/product"
                className="flex items-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-glow hover:scale-105 text-base"
              >
                <ShoppingCart size={18} />
                {text.orderNow}
              </Link>
              <button className="flex items-center gap-3 glass-dark text-white font-semibold px-6 py-4 rounded-full hover:border-primary/40 transition-all duration-300 hover:scale-105">
                <div className="w-9 h-9 rounded-full bg-primary/25 flex items-center justify-center">
                  <Play size={13} className="text-primary fill-primary translate-x-0.5" />
                </div>
                {text.watchVideo}
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className={`flex gap-10 ${justify} mt-14 pt-10 border-t border-white/10`}
            >
              {text.stats.map((stat) => (
                <div key={stat.label} className="text-right">
                  <div className="text-2xl font-extrabold text-white">{stat.value}</div>
                  <div className="text-white/45 text-xs mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Product Visual */}
          <motion.div
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.92, x: -30 }}
            animate={isClient ? { opacity: 1, scale: 1, x: 0 } : { opacity: 0, scale: 0.92, x: -30 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="relative">
              {/* Glow behind product */}
              <div className="absolute inset-0 scale-90 bg-primary/25 rounded-full blur-[80px]" />

              {/* Product card */}
              <div
                className="relative w-72 h-[420px] md:w-[360px] md:h-[520px] rounded-3xl overflow-hidden warm-glow"
                style={{
                  backgroundImage: "url('/images/product-hero.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#3D2D27",
                }}
              >
                {/* Warm bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand/70 via-transparent to-transparent" />


              </div>

              {/* Floating price badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -right-6 glass-dark rounded-2xl px-5 py-3 shadow-warm-lg z-10"
              >
                <div className="text-primary font-extrabold text-xl">{text.priceNow}</div>
                <div className="text-white/40 text-xs line-through">{text.oldPrice}</div>
              </motion.div>

              {/* Floating rating badge */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.7 }}
                className="absolute -top-5 -left-6 glass-dark rounded-2xl px-4 py-3 shadow-warm-lg z-10"
              >
                <div className="text-yellow-400 text-sm tracking-wider">★★★★★</div>
                <div className="text-white/50 text-xs mt-0.5">4.9 / 5</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-xs tracking-widest">{text.scroll}</span>
        <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
}
