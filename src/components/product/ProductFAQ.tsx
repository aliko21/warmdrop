"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const faqText = {
  ar: {
    title: "الاسئلة الشائعة",
    items: [
      {
        q: "هل الستاند متوافق مع قنينة 5 جالون؟",
        a: "نعم، الستاند مصمم خصيصا لاستيعاب قناني المياه بحجم 5 جالون (19 لتر) المستخدمة في المنازل.",
      },
      {
        q: "كيف تعمل الاضاءة LED؟",
        a: "الاضاءة LED دافئة تعمل عبر كابل USB مرفق. يمكن توصيلها باي منفذ USB او محول كهربائي عادي.",
      },
      {
        q: "هل الغطاء القماشي قابل للغسيل؟",
        a: "نعم، الغطاء القماشي قابل للغسيل اليدوي بالماء البارد والصابون اللطيف. لا ينصح بالغسيل الالي.",
      },
      {
        q: "كم يستغرق التركيب؟",
        a: "التركيب سهل جدا ولا يستغرق اكثر من 10 دقائق. جميع الادوات اللازمة مرفقة في الصندوق مع دليل مصور.",
      },
      {
        q: "ما هي مدة الضمان؟",
        a: "المنتج ياتي مع ضمان لمدة 6 اشهر على اي عيوب في التصنيع او الخامات.",
      },
      {
        q: "هل يتوفر الدفع عند الاستلام؟",
        a: "نعم، الدفع عند الاستلام متاح لجميع مناطق الامارات. كما يمكن الدفع المسبق بالبطاقة البنكية.",
      },
      {
        q: "ما هي مناطق التوصيل؟",
        a: "نوصل لجميع امارات الدولة (دبي، ابوظبي، الشارقة، عجمان، راس الخيمة، الفجيرة، ام القيوين). الشحن مجاني.",
      },
    ],
  },
  en: {
    title: "Frequently Asked Questions",
    items: [
      {
        q: "Is the stand compatible with 5-gallon bottles?",
        a: "Yes, the stand is specifically designed for 5-gallon (19L) home water bottles.",
      },
      {
        q: "How does the LED light work?",
        a: "The warm LED light runs through an included USB cable. You can connect it to any USB port or power adapter.",
      },
      {
        q: "Is the fabric cover washable?",
        a: "Yes, it is hand-washable with cold water and mild soap. Machine washing is not recommended.",
      },
      {
        q: "How long does assembly take?",
        a: "Assembly is easy and takes about 10 minutes. All required tools are included.",
      },
      {
        q: "What is the warranty period?",
        a: "The product includes a 6-month warranty against manufacturing defects.",
      },
      {
        q: "Is cash on delivery available?",
        a: "Card payment is available online. Some delivery payment options may vary by area.",
      },
      {
        q: "Where do you deliver?",
        a: "We deliver to all UAE emirates (Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain).",
      },
    ],
  },
  sv: {
    title: "Vanliga fragor",
    items: [
      {
        q: "Ar stallet kompatibelt med 5-gallonflaskor?",
        a: "Ja, stallet ar designat for 5-gallon (19L) vattenflaskor i hemmet.",
      },
      {
        q: "Hur fungerar LED-belysningen?",
        a: "Den varma LED-belysningen drivs via medfoljande USB-kabel och kan anslutas till USB-port eller adapter.",
      },
      {
        q: "Kan tygoverdraget tvattas?",
        a: "Ja, det kan handtvattas med kallt vatten och mild tval. Maskintvatt rekommenderas inte.",
      },
      {
        q: "Hur lang tid tar monteringen?",
        a: "Monteringen ar enkel och tar cirka 10 minuter. Alla verktyg medfoljer.",
      },
      {
        q: "Hur lang ar garantin?",
        a: "Produkten har 6 manaders garanti mot tillverkningsfel.",
      },
      {
        q: "Finns betalning vid leverans?",
        a: "Kortbetalning finns online. Vissa leveransbetalningar kan variera beroende pa omrade.",
      },
      {
        q: "Vilka omraden levererar ni till?",
        a: "Vi levererar till alla emirat i FAE (Dubai, Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, Umm Al Quwain).",
      },
    ],
  },
} as const;

export default function ProductFAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { locale } = useLanguage();
  const text = faqText[locale];
  const align = locale === "ar" ? "text-right" : "text-left";

  return (
    <section className="py-16 border-t border-accent/30">
      <h2 className={`text-2xl font-extrabold text-brand mb-8 ${align}`}>
        {text.title}
      </h2>
      <div className="space-y-3 max-w-3xl mr-0 ml-auto md:ml-0">
        {text.items.map((faq, i) => (
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
