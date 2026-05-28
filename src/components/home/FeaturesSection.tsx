"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Sparkles, Lightbulb, Leaf, BookOpen, Droplets } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const icons = [Sparkles, Lightbulb, Leaf, BookOpen, Droplets];

const featuresText = {
  ar: {
    eyebrow: "المميزات",
    title: "لماذا هذا المنتج؟",
    items: [
      { title: "تصميم فاخر", desc: "قماش ناعم وخشب طبيعي يمنحك لمسة راقية" },
      { title: "إضاءة LED", desc: "إضاءة سفلية دافئة تضيف أجواء مريحة" },
      { title: "خامات طبيعية", desc: "هيكل خشبي متين بتصميم عصري" },
      { title: "رف ديكوري سفلي", desc: "مكان للأكواب والورود والإكسسوارات" },
      { title: "متوافق مع 5 جالون", desc: "يدعم أغلب قناني المياه المنزلية" },
    ],
  },
  en: {
    eyebrow: "FEATURES",
    title: "Why this product?",
    items: [
      { title: "Premium Design", desc: "Soft fabric and natural wood for an elegant touch" },
      { title: "LED Lighting", desc: "Warm under-glow lighting for a cozy atmosphere" },
      { title: "Natural Materials", desc: "Solid wooden structure with modern styling" },
      { title: "Lower Decor Shelf", desc: "Space for cups, flowers, and accessories" },
      { title: "Fits 5 Gallon", desc: "Compatible with most household water bottles" },
    ],
  },
  sv: {
    eyebrow: "FUNKTIONER",
    title: "Varfor denna produkt?",
    items: [
      { title: "Premiumdesign", desc: "Mjukt tyg och naturligt tra for en elegant kansla" },
      { title: "LED-belysning", desc: "Varm underbelysning som skapar lugn atmosfar" },
      { title: "Naturliga material", desc: "Stabil traram med modern design" },
      { title: "Nedre dekorhylla", desc: "Plats for muggar, blommor och tillbehor" },
      { title: "Passar 5 gallon", desc: "Kompatibel med de flesta vattenflaskor i hemmet" },
    ],
  },
} as const;

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { locale } = useLanguage();
  const text = featuresText[locale];

  return (
    <section id="features" className="py-28 bg-background" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-18"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">
            {text.eyebrow}
          </p>
          <div className="w-10 h-0.5 bg-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand">
            {text.title}
          </h2>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {text.items.map((feat, i) => {
            const Icon = icons[i];
            return (
            <motion.div
              key={feat.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="group relative bg-cream rounded-2xl p-6 text-center cursor-default
                         border border-accent/40 hover:border-primary/20
                         hover:bg-brand hover:shadow-warm-lg
                         transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-accent group-hover:bg-primary/20 flex items-center justify-center mx-auto mb-5 transition-colors duration-500">
                <Icon
                  size={24}
                  className="text-primary transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="font-bold text-brand group-hover:text-white text-sm mb-2 transition-colors duration-500">
                {feat.title}
              </h3>
              <p className="text-brand/55 group-hover:text-white/55 text-xs leading-relaxed transition-colors duration-500">
                {feat.desc}
              </p>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
