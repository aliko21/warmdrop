"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const specs = [
  { label: "الخامة", value: "خشب طبيعي" },
  { label: "الغطاء", value: "قماش ناعم فاخر" },
  { label: "الإضاءة", value: "LED دافئة" },
  { label: "السعة", value: "5 جالون" },
  { label: "اللون", value: "بيج ونخب طبيعي" },
  { label: "الرف السفلي", value: "للأكواب والديكور" },
  { label: "الاستخدام", value: "للمنازل الحديثة" },
];

const boxContents = [
  { icon: "🪵", name: "الستاند الخشبي", desc: "الهيكل الرئيسي" },
  { icon: "🧣", name: "الغطاء القماشي الفاخر", desc: "قابل للغسيل" },
  { icon: "💡", name: "إضاءة LED دافئة", desc: "USB / مدمجة" },
  { icon: "📦", name: "الرف السفلي", desc: "للأكواب والديكور" },
  { icon: "🔧", name: "أدوات التركيب", desc: "التركيب في 10 دقائق" },
];

export default function ProductSpecs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 py-16 border-t border-accent/30">
      {/* Specs Table */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <h3 className="text-xl font-extrabold text-brand mb-7 text-right">
          المواصفات
        </h3>
        <div className="rounded-2xl overflow-hidden border border-accent/40">
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`flex items-center justify-between px-5 py-4 text-right ${
                i % 2 === 0 ? "bg-cream" : "bg-background"
              }`}
            >
              <span className="text-brand/80 text-sm font-medium">{spec.value}</span>
              <span className="text-brand/45 text-sm">{spec.label}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Box Contents */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h3 className="text-xl font-extrabold text-brand mb-7 text-right">
          ماذا يحتوي الصندوق؟
        </h3>
        <div className="space-y-3">
          {boxContents.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-center gap-4 justify-end p-4 bg-cream rounded-2xl border border-accent/30
                         hover:border-primary/30 hover:shadow-warm transition-all duration-300"
            >
              <div className="text-right">
                <div className="font-semibold text-brand text-sm">{item.name}</div>
                <div className="text-brand/45 text-xs mt-0.5">{item.desc}</div>
              </div>
              <div className="w-11 h-11 bg-accent rounded-xl flex items-center justify-center text-xl flex-shrink-0">
                {item.icon}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
