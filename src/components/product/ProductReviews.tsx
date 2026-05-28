"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, ThumbsUp } from "lucide-react";

const reviews = [
  {
    name: "أحمد السعيد",
    rating: 5,
    date: "15 نوفمبر 2024",
    verified: true,
    text: "منتج رائع جداً! يبدو أغلى بكثير من سعره. الإضاءة الليلية تحول المنزل إلى أجواء مريحة جداً. سأشتري قطعة ثانية قريباً.",
    helpful: 24,
  },
  {
    name: "فاطمة محمد",
    rating: 5,
    date: "8 نوفمبر 2024",
    verified: true,
    text: "جودة الخامات ممتازة والتركيب كان سهلاً جداً. أصبح ركن الماء المكان المفضل في غرفة المعيشة. الإضاءة تعطي أجواء هادئة.",
    helpful: 18,
  },
  {
    name: "سارة علي",
    rating: 5,
    date: "2 نوفمبر 2024",
    verified: true,
    text: "أحسن شراء عملته هذا الشهر! كل الضيوف يسألون عنه. الستاند يضيف لمسة فاخرة حقيقية لمنزلي.",
    helpful: 31,
  },
  {
    name: "محمد الحمدان",
    rating: 4,
    date: "28 أكتوبر 2024",
    verified: true,
    text: "منتج ممتاز والجودة عالية. التركيب أخذ وقتاً أكثر من المتوقع لكن النتيجة رائعة. أنصح بالشراء.",
    helpful: 12,
  },
];

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  );
}

export default function ProductReviews() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="py-16 border-t border-accent/30">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <p className="text-brand/40 text-sm mb-1">523 تقييم موثق</p>
          <div className="flex items-center gap-3">
            <Stars rating={5} />
            <span className="text-4xl font-black text-brand">4.9</span>
          </div>
        </div>
        <h2 className="text-2xl font-extrabold text-brand text-right">
          مراجعات العملاء
        </h2>
      </div>

      {/* Reviews */}
      <div className="space-y-5">
        {reviews.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            className="bg-cream rounded-2xl p-6 border border-accent/40
                       hover:border-primary/25 hover:shadow-warm transition-all duration-300"
          >
            {/* Top row */}
            <div className="flex items-start justify-between gap-4 mb-4">
              <span className="text-brand/40 text-xs">{r.date}</span>
              <div className="text-right">
                <div className="flex items-center gap-2 justify-end mb-1.5">
                  {r.verified && (
                    <span className="text-green-600 text-xs bg-green-50 px-2.5 py-0.5 rounded-full font-medium">
                      مشتري موثق ✓
                    </span>
                  )}
                  <span className="font-bold text-brand">{r.name}</span>
                </div>
                <Stars rating={r.rating} />
              </div>
            </div>

            {/* Review text */}
            <p className="text-brand/75 text-sm leading-relaxed text-right mb-4">
              {r.text}
            </p>

            {/* Helpful */}
            <button className="flex items-center gap-1.5 text-brand/35 hover:text-primary text-xs transition-colors">
              <span>{r.helpful}</span>
              <ThumbsUp size={12} />
              <span>مفيد</span>
            </button>
          </motion.div>
        ))}
      </div>

      {/* Load more */}
      <div className="mt-8 text-center">
        <button className="border border-accent text-brand/60 hover:border-primary hover:text-primary text-sm font-medium px-8 py-3 rounded-full transition-all duration-300">
          عرض المزيد من التقييمات
        </button>
      </div>
    </section>
  );
}
