"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ShoppingCart, Check, Zap } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const pricingText = {
  ar: {
    badge: "عرض محدود الوقت",
    title: "السعر الافتتاحي",
    subtitle: "احصل على ستاند الماء الفاخر بأفضل سعر الآن",
    oldPrice: "999 درهم",
    currency: "درهم",
    save: "وفر 550 درهم",
    order: "اطلب الآن",
    paymentNote: "ادفع بالبطاقة · شحن مجاني",
    included: [
      "ستاند ماء فاخر كامل",
      "إضاءة LED دافئة مدمجة",
      "غطاء قماش ناعم فاخر",
      "رف ديكوري سفلي",
      "ضمان 6 أشهر على المنتج",
      "شحن مجاني داخل الإمارات",
    ],
  },
  en: {
    badge: "Limited Time Offer",
    title: "Launch Price",
    subtitle: "Get the premium water stand at the best price now",
    oldPrice: "AED 999",
    currency: "AED",
    save: "Save AED 550",
    order: "Order Now",
    paymentNote: "Card payment · Free shipping",
    included: [
      "Complete premium water stand",
      "Integrated warm LED lighting",
      "Soft premium fabric cover",
      "Lower decorative shelf",
      "6-month product warranty",
      "Free shipping inside UAE",
    ],
  },
  sv: {
    badge: "Begransat erbjudande",
    title: "Lanseringspris",
    subtitle: "Fa premium-vattenstallet till basta pris just nu",
    oldPrice: "999 AED",
    currency: "AED",
    save: "Spara 550 AED",
    order: "Bestall Nu",
    paymentNote: "Kortbetalning · Fri frakt",
    included: [
      "Komplett premium-vattenstall",
      "Integrerad varm LED-belysning",
      "Mjukt premiumtyg",
      "Nedre dekorhylla",
      "6 manaders garanti",
      "Fri frakt inom FAE",
    ],
  },
} as const;

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { locale } = useLanguage();
  const text = pricingText[locale];

  return (
    <section ref={ref} className="py-28 bg-brand relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: "url('/images/price-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-brand/80" />
      <div className="absolute bottom-0 right-1/3 w-[500px] h-[500px] bg-primary/12 rounded-full blur-[160px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/25 rounded-full px-5 py-2 mb-8">
            <Zap size={13} className="text-primary" />
            <span className="text-primary text-xs font-bold tracking-wider">
              {text.badge}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            {text.title}
          </h2>
          <p className="text-white/50 mb-14 text-base">
            {text.subtitle}
          </p>

          {/* Price Card */}
          <div className="glass-dark rounded-3xl p-10 md:p-14 max-w-md mx-auto border border-primary/20 shadow-glow">
            {/* Price */}
            <div className="mb-8">
              <p className="text-white/40 text-sm line-through mb-1">
                {text.oldPrice}
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-7xl font-black text-primary leading-none">
                  449
                </span>
                <span className="text-white/70 text-2xl">{text.currency}</span>
              </div>
              <div className="inline-block bg-primary/20 text-primary text-xs font-bold px-4 py-1.5 rounded-full mt-4">
                {text.save} 🎉
              </div>
            </div>

            {/* Features list */}
            <ul className="space-y-3.5 mb-10 text-right">
              {text.included.map((item) => (
                <li key={item} className="flex items-center gap-3 justify-end">
                  <span className="text-white/75 text-sm">{item}</span>
                  <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-primary" />
                  </div>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/product"
                className="w-full flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:shadow-glow text-base"
              >
                <ShoppingCart size={19} />
                {text.order}
              </Link>
            </motion.div>

            <p className="text-white/35 text-xs mt-4">
              💳 {text.paymentNote}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
