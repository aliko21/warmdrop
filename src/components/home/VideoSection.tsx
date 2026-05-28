"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const videoText = {
  ar: {
    eyebrow: "شاهد الفرق",
    title: "شاهد التجربة",
    description:
      "خطوات بسيطة لتحويل قنينة الماء إلى قطعة ديكور أنيقة. شاهد كيف يتحول المنتج إلى تحفة فنية في منزلك.",
    points: [
      "تصميم يجمع بين الجمال والوظيفة",
      "إضاءة LED دافئة تخلق أجواء هادئة",
      "سهل الاستخدام والتركيب في دقائق",
      "يناسب جميع أنواع ديكورات المنازل",
    ],
    watch: "شاهد الفيديو",
  },
  en: {
    eyebrow: "SEE THE DIFFERENCE",
    title: "Watch the experience",
    description:
      "Simple steps to transform your water bottle into an elegant decor piece. See how it upgrades your home corner.",
    points: [
      "A design that balances beauty and function",
      "Warm LED glow for a calm atmosphere",
      "Easy setup in just minutes",
      "Fits all modern home styles",
    ],
    watch: "Watch Video",
  },
  sv: {
    eyebrow: "SE SKILLNADEN",
    title: "Se upplevelsen",
    description:
      "Enkla steg som forvandlar vattenflaskan till en elegant inredningsdetalj i ditt hem.",
    points: [
      "Design som kombinerar estetik och funktion",
      "Varm LED-belysning for lugn atmosfar",
      "Enkel installation pa nagra minuter",
      "Passar olika typer av heminredning",
    ],
    watch: "Se Video",
  },
} as const;

export default function VideoSection() {
  const [playing, setPlaying] = useState(false);
  const sectionRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { locale } = useLanguage();
  const text = videoText[locale];
  const textAlign = locale === "ar" ? "text-right" : "text-left";

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <section
      ref={sectionRef}
      className="py-28 bg-brand relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-secondary/60 to-brand" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/8 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Video Thumbnail */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9 }}
            className="relative rounded-3xl overflow-hidden bg-brand-secondary cursor-pointer group mx-auto"
            style={{ aspectRatio: "9/16", maxWidth: "320px", width: "100%" }}
            onClick={togglePlay}
          >
            {/* Video element */}
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              poster="/images/video-thumb.jpg"
              onEnded={() => setPlaying(false)}
            >
              <source src="/videos/product-demo.mp4" type="video/mp4" />
            </video>

            {/* Poster gradient */}
            {!playing && (
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: "url('/images/video-thumb.jpg')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#3D2D27",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-brand/80 via-brand/20 to-transparent" />
              </div>
            )}

            {/* Dark overlay */}
            <div
              className={`absolute inset-0 bg-brand/30 transition-opacity duration-300 ${
                playing ? "opacity-0 group-hover:opacity-20" : ""
              }`}
            />

            {/* Play / Pause button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                className={`w-20 h-20 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-glow transition-opacity duration-300 ${
                  playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
                }`}
              >
                {playing ? (
                  <Pause size={26} className="text-white" />
                ) : (
                  <Play size={26} className="text-white fill-white translate-x-0.5" />
                )}
              </motion.div>
            </div>
          </motion.div>

          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className={textAlign}
          >
            <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-4">
              {text.eyebrow}
            </p>
            <div className="w-10 h-0.5 bg-primary mr-0 mb-6" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-6 leading-tight">
              {text.title}
            </h2>
            <p className="text-white/60 text-base leading-relaxed mb-10">
              {text.description}
            </p>

            <ul className="space-y-4 mb-10">
              {text.points.map((point, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className="flex items-center gap-3 justify-end"
                >
                  <span className="text-white/70 text-sm">{point}</span>
                  <div className="w-6 h-6 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                  </div>
                </motion.li>
              ))}
            </ul>

            <button
              onClick={togglePlay}
              className="flex items-center gap-3 bg-primary/15 hover:bg-primary/25 border border-primary/30 text-primary font-semibold px-6 py-3 rounded-full transition-all duration-300 mr-auto"
            >
              <Play size={15} className="fill-primary" />
              {text.watch}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
