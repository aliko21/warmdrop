"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ZoomIn, Play, X } from "lucide-react";

type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string };

const VIDEO: MediaItem = {
  type: "video",
  src: "/videos/product-demo.mp4",
  poster: "/images/video-thumb.jpg",
  alt: "فيديو المنتج",
};

const mediaByColor: Record<string, MediaItem[]> = {
  wooden: [
    { type: "image", src: "/images/product-1.jpg", alt: "خشبي - المنظر الأمامي" },
    { type: "image", src: "/images/product-2.jpg", alt: "خشبي - مع الإضاءة" },
    { type: "image", src: "/images/product-3.jpg", alt: "خشبي - المنظر الجانبي" },
    { type: "image", src: "/images/product-4.jpg", alt: "خشبي - الرف السفلي" },
    { type: "image", src: "/images/product-5.jpg", alt: "خشبي - تفاصيل الخشب" },
    { type: "image", src: "/images/product-6.jpg", alt: "خشبي - الإضاءة الليلية" },
    { type: "image", src: "/images/product-7.jpg", alt: "خشبي - في الديكور" },
    VIDEO,
  ],
  white: [
    { type: "image", src: "/images/product-white-1.jpg", alt: "أبيض - المنظر الأمامي" },
    { type: "image", src: "/images/product-white-2.jpg", alt: "أبيض - مع الإضاءة" },
    { type: "image", src: "/images/product-white-3.jpg", alt: "أبيض - المنظر الجانبي" },
    { type: "image", src: "/images/product-white-4.jpg", alt: "أبيض - الرف السفلي" },
    { type: "image", src: "/images/product-white-5.jpg", alt: "أبيض - تفاصيل" },
    { type: "image", src: "/images/product-white-6.jpg", alt: "أبيض - الإضاءة الليلية" },
    { type: "image", src: "/images/product-white-7.jpg", alt: "أبيض - في الديكور" },
    VIDEO,
  ],
  black: [
    { type: "image", src: "/images/product-black-1.jpg", alt: "أسود - المنظر الأمامي" },
    { type: "image", src: "/images/product-black-2.jpg", alt: "أسود - مع الإضاءة" },
    { type: "image", src: "/images/product-black-3.jpg", alt: "أسود - المنظر الجانبي" },
    { type: "image", src: "/images/product-black-4.jpg", alt: "أسود - الرف السفلي" },
    { type: "image", src: "/images/product-black-5.jpg", alt: "أسود - تفاصيل" },
    { type: "image", src: "/images/product-black-6.jpg", alt: "أسود - الإضاءة الليلية" },
    { type: "image", src: "/images/product-black-7.jpg", alt: "أسود - في الديكور" },
    VIDEO,
  ],
};

interface ProductGalleryProps {
  selectedColor: string;
}

export default function ProductGallery({ selectedColor }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Reset to first image when color changes
  useEffect(() => {
    setActive(0);
    if (videoRef.current) videoRef.current.pause();
  }, [selectedColor]);

  const media = mediaByColor[selectedColor] ?? mediaByColor.wooden;
  const totalItems = media.length;
  const activeItem = media[active];

  const prev = () => setActive((i) => (i - 1 + totalItems) % totalItems);
  const next = () => setActive((i) => (i + 1) % totalItems);

  return (
    <div className="space-y-4">
      {/* Main media */}
      <div className="relative aspect-square bg-cream rounded-3xl overflow-hidden border border-accent/30 group">
        <AnimatePresence mode="wait">
          {activeItem.type === "image" ? (
            <motion.div
              key={`img-${active}`}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38 }}
              className="absolute inset-0 cursor-zoom-in"
              onClick={() => setLightbox(true)}
              style={{
                backgroundImage: `url('${activeItem.src}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#3D2D27",
              }}
            />
          ) : (
            <motion.div
              key={`vid-${active}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.38 }}
              className="absolute inset-0 bg-brand flex items-center justify-center"
            >
              <video
                ref={videoRef}
                src={activeItem.src}
                poster={activeItem.poster}
                controls
                className="w-full h-full object-contain"
                playsInline
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Warm vignette (images only) */}
        {activeItem.type === "image" && (
          <div className="absolute inset-0 bg-gradient-to-t from-brand/15 via-transparent to-transparent pointer-events-none" />
        )}

        {/* Navigation */}
        <button
          onClick={prev}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/20 z-10"
          aria-label="السابق"
        >
          <ChevronRight size={16} className="text-brand" />
        </button>
        <button
          onClick={next}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/20 z-10"
          aria-label="التالي"
        >
          <ChevronLeft size={16} className="text-brand" />
        </button>

        {/* Zoom (images only) */}
        {activeItem.type === "image" && (
          <button
            onClick={() => setLightbox(true)}
            className="absolute top-4 left-4 w-9 h-9 rounded-full glass flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-primary/20 z-10"
            aria-label="تكبير"
          >
            <ZoomIn size={15} className="text-brand" />
          </button>
        )}

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {media.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === active ? "bg-primary w-6" : "bg-brand/30 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails - single row, smaller */}
      <div className="grid grid-cols-8 gap-1.5">
        {media.map((item, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 relative ${
              i === active
                ? "border-primary shadow-warm"
                : "border-transparent opacity-50 hover:opacity-90 hover:border-accent"
            }`}
          >
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url('${item.type === "image" ? item.src : item.poster}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#4E3C35",
              }}
            />
            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-brand/40">
                <div className="w-5 h-5 rounded-full bg-primary/90 flex items-center justify-center">
                  <Play size={8} className="text-white fill-white translate-x-px" />
                </div>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && activeItem.type === "image" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(false)}
            className="fixed inset-0 bg-brand/95 z-50 flex items-center justify-center p-6 cursor-zoom-out"
          >
            <button
              onClick={(e) => { e.stopPropagation(); setLightbox(false); }}
              className="absolute top-6 right-6 w-10 h-10 rounded-full glass-dark flex items-center justify-center text-white hover:bg-white/10 transition z-10"
              aria-label="إغلاق"
            >
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl max-h-[85vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                className="max-w-full max-h-[85vh] w-auto h-auto rounded-2xl object-contain shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
