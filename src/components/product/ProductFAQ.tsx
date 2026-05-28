"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "هل الستاند متوافق مع قنينة 5 جالون؟",
    a: "نعم، الستاند مصمم خصيصاً لاستيعاب قناني المياه بحجم 5 جالون (19 لتر) المستخدمة في المنازل.",
  },
  {
    q: "كيف تعمل الإضاءة LED؟",
    a: "الإضاءة LED دافئة تعمل عبر كابل USB مرفق. يمكن توصيلها بأي منفذ USB أو محول كهربائي عادي.",
  },
  {
    q: "هل الغطاء القماشي قابل للغسيل؟",
    a: "نعم، الغطاء القماشي قابل للغسيل اليدوي بالماء البارد والصابون اللطيف. لا يُنصح بالغسيل الآلي.",
  },
  {
    q: "كم يستغرق التركيب؟",
    a: "التركيب سهل جداً ولا يستغرق أكثر من 10 دقائق. جميع الأدوات اللازمة مرفقة في الصندوق مع دليل مصور.",
  },
  {
    q: "ما هي مدة الضمان؟",
    a: "المنتج يأتي مع ضمان لمدة 6 أشهر على أي عيوب في التصنيع أو الخامات.",
  },
  {
    q: "هل يتوفر الدفع عند الاستلام؟",
    a: "نعم، الدفع عند الاستلام متاح لجميع مناطق الإمارات. كما يمكن الدفع المسبق بالبطاقة البنكية.",
  },
  {
    q: "ما هي مناطق التوصيل؟",
    a: "نوصّل لجميع إمارات الدولة (دبي، أبوظبي، الشارقة، عجمان، رأس الخيمة، الفجيرة، أم القيوين). الشحن مجاني.",
  },
];

export default function ProductFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-16 border-t border-accent/30">
      <h2 className="text-2xl font-extrabold text-brand mb-8 text-right">
        الأسئلة الشائعة
      </h2>
      <div className="space-y-3 max-w-3xl mr-0 ml-auto md:ml-0">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="bg-cream rounded-2xl border border-accent/40 overflow-hidden
                       hover:border-primary/25 transition-colors duration-300"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right"
            >
              <motion.div
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={18} className="text-primary" />
              </motion.div>
              <span className="font-semibold text-brand text-sm flex-1 text-right">
                {faq.q}
              </span>
            </button>

            <AnimatePresence>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-right">
                    <div className="h-px bg-accent/35 mb-4" />
                    <p className="text-brand/65 text-sm leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
