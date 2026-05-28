"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ShoppingCart, Check, Zap } from "lucide-react";

const included = [
  "ستاند ماء فاخر كامل",
  "إضاءة LED دافئة مدمجة",
  "غطاء قماش ناعم فاخر",
  "رف ديكوري سفلي",
  "ضمان 6 أشهر على المنتج",
  "شحن مجاني داخل الإمارات",
];

export default function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
              عرض محدود الوقت
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
            السعر الافتتاحي
          </h2>
          <p className="text-white/50 mb-14 text-base">
            احصل على ستاند الماء الفاخر بأفضل سعر الآن
          </p>

          {/* Price Card */}
          <div className="glass-dark rounded-3xl p-10 md:p-14 max-w-md mx-auto border border-primary/20 shadow-glow">
            {/* Price */}
            <div className="mb-8">
              <p className="text-white/40 text-sm line-through mb-1">
                999 درهم
              </p>
              <div className="flex items-baseline justify-center gap-2">
                <span className="text-7xl font-black text-primary leading-none">
                  449
                </span>
                <span className="text-white/70 text-2xl">درهم</span>
              </div>
              <div className="inline-block bg-primary/20 text-primary text-xs font-bold px-4 py-1.5 rounded-full mt-4">
                وفّر 550 درهم 🎉
              </div>
            </div>

            {/* Features list */}
            <ul className="space-y-3.5 mb-10 text-right">
              {included.map((item) => (
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
                اطلب الآن
              </Link>
            </motion.div>

            <p className="text-white/35 text-xs mt-4">
              💳 ادفع عند الاستلام · شحن مجاني
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
