"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Quote } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const reviewsText = {
  ar: {
    eyebrow: "التقييمات",
    title: "آراء عملائنا",
    score: "4.9 من 5",
    count: "· +500 تقييم",
    cta: "شاهد جميع التقييمات",
    reviews: [
      {
        name: "أحمد السعيد",
        location: "دبي، الإمارات",
        rating: 5,
        text: "أفضل من شكل قناني الماء التقليدية. المنتج يضيف جمالاً حقيقياً للمنزل والإضاءة رائعة جداً.",
        date: "منذ أسبوع",
      },
      {
        name: "فاطمة محمد",
        location: "أبوظبي، الإمارات",
        rating: 5,
        text: "الإضاءة الليلية جميلة ومريحة جداً. أصبح ركن الماء في منزلي المكان المفضل.",
        date: "منذ أسبوعين",
      },
      {
        name: "سارة علي",
        location: "الشارقة، الإمارات",
        rating: 5,
        text: "أصبح شكل زاوية الماء عندي قطعة فنية فخمة جداً. جودة الخامات أفضل من المتوقع.",
        date: "منذ شهر",
      },
    ],
  },
  en: {
    eyebrow: "REVIEWS",
    title: "What our customers say",
    score: "4.9 out of 5",
    count: "· +500 reviews",
    cta: "See all reviews",
    reviews: [
      {
        name: "Ahmed Alsaeed",
        location: "Dubai, UAE",
        rating: 5,
        text: "Much better than traditional water bottles. It adds real beauty to the home and the lighting is amazing.",
        date: "1 week ago",
      },
      {
        name: "Fatima Mohammed",
        location: "Abu Dhabi, UAE",
        rating: 5,
        text: "The night lighting is beautiful and calming. The water corner became my favorite spot at home.",
        date: "2 weeks ago",
      },
      {
        name: "Sara Ali",
        location: "Sharjah, UAE",
        rating: 5,
        text: "My water corner now looks like a luxury art piece. The material quality exceeded expectations.",
        date: "1 month ago",
      },
    ],
  },
  sv: {
    eyebrow: "OMDOMEN",
    title: "Vad vara kunder sager",
    score: "4.9 av 5",
    count: "· +500 omdomen",
    cta: "Se alla omdomen",
    reviews: [
      {
        name: "Ahmed Alsaeed",
        location: "Dubai, FAE",
        rating: 5,
        text: "Mycket battre an traditionella vattenflaskor. Produkten gor hemmet vackrare och belysningen ar fantastisk.",
        date: "for 1 vecka sedan",
      },
      {
        name: "Fatima Mohammed",
        location: "Abu Dhabi, FAE",
        rating: 5,
        text: "Kvallsbelysningen ar vacker och lugnande. Vattenhornan blev min favoritplats hemma.",
        date: "for 2 veckor sedan",
      },
      {
        name: "Sara Ali",
        location: "Sharjah, FAE",
        rating: 5,
        text: "Min vattenhorna ser nu ut som en exklusiv inredningsdetalj. Materialkvaliteten var battre an forvantat.",
        date: "for 1 manad sedan",
      },
    ],
  },
} as const;

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 justify-end">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

export default function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { locale } = useLanguage();
  const text = reviewsText[locale];

  return (
    <section id="reviews" ref={ref} className="py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">
            {text.eyebrow}
          </p>
          <div className="w-10 h-0.5 bg-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-brand mb-5">
            {text.title}
          </h2>
          <div className="flex items-center justify-center gap-2 text-brand/50">
            <span className="text-sm">{text.score}</span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={15} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm">{text.count}</span>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {text.reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, delay: i * 0.15 }}
              className="relative bg-cream rounded-3xl p-8 border border-accent/40
                         hover:border-primary/30 hover:shadow-warm-lg
                         transition-all duration-500 group overflow-hidden"
            >
              {/* Background quote */}
              <div className="absolute top-5 left-5 opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-500">
                <Quote size={52} className="text-primary" />
              </div>

              {/* Stars */}
              <div className="mb-5">
                <Stars rating={r.rating} />
              </div>

              {/* Text */}
              <p className="text-brand/80 text-sm leading-relaxed mb-6 text-right relative z-10">
                &ldquo;{r.text}&rdquo;
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between pt-5 border-t border-accent/35">
                <span className="text-brand/35 text-xs">{r.date}</span>
                <div className="text-right">
                  <div className="font-bold text-brand text-sm">{r.name}</div>
                  <div className="text-brand/45 text-xs">{r.location}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <button className="border border-primary/40 text-primary hover:bg-primary hover:text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-glow-sm text-sm">
            {text.cta}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
