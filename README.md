# WarmDrop — ستاند ماء فاخر

متجر إلكتروني احترافي لمنتج ستاند الماء الفاخر، مبني بـ Next.js 15 + Tailwind CSS + Framer Motion.

## 🚀 البدء السريع

### المتطلبات

- Node.js 18+
- npm

### التثبيت

```bash
# 1. تثبيت الحزم
npm install

# 2. تشغيل بيئة التطوير
npm run dev
```

ثم افتح: [http://localhost:3000](http://localhost:3000)

---

## 📁 هيكل المشروع

```
src/
├── app/
│   ├── layout.tsx          # Root layout (RTL, fonts, metadata)
│   ├── page.tsx            # الصفحة الرئيسية
│   ├── globals.css         # Global styles + Tailwind
│   └── product/
│       └── page.tsx        # صفحة المنتج
├── components/
│   ├── Navbar.tsx          # شريط التنقل
│   ├── Footer.tsx          # الفوتر
│   ├── ui/
│   │   └── AnimatedSection.tsx   # مكون الأنيميشن
│   ├── home/
│   │   ├── HeroSection.tsx       # قسم الهيرو
│   │   ├── FeaturesSection.tsx   # قسم المميزات
│   │   ├── VideoSection.tsx      # قسم الفيديو
│   │   ├── ReviewsSection.tsx    # آراء العملاء
│   │   └── PricingSection.tsx    # قسم السعر
│   └── product/
│       ├── ProductGallery.tsx    # معرض الصور
│       ├── ProductInfo.tsx       # معلومات المنتج
│       ├── ProductSpecs.tsx      # المواصفات
│       ├── ProductFAQ.tsx        # الأسئلة الشائعة
│       └── ProductReviews.tsx    # مراجعات المنتج
└── lib/
    └── utils.ts            # Tailwind merge utility
```

---

## 🖼️ إضافة الصور

ضع صور المنتج في مجلد `public/images/`:

| الملف                              | الوصف                  |
| ---------------------------------- | ---------------------- |
| `hero-bg.jpg`                      | خلفية قسم الهيرو       |
| `product-hero.jpg`                 | الصورة الرئيسية للمنتج |
| `product-1.jpg` تو `product-4.jpg` | معرض صفحة المنتج       |
| `video-thumb.jpg`                  | صورة مصغرة للفيديو     |

وضع الفيديو في: `public/videos/product-demo.mp4`

---

## 🎨 الألوان والهوية

| المتغير      | اللون     | الاستخدام                |
| ------------ | --------- | ------------------------ |
| `primary`    | `#C8A97E` | الأزرار، الإبراز         |
| `brand`      | `#2B1F1A` | النصوص الداكنة           |
| `background` | `#F7F3EE` | الخلفية الرئيسية         |
| `accent`     | `#E7D3B5` | الحدود والخلفيات الفاتحة |
| `cream`      | `#FAF7F2` | خلفيات البطاقات          |

---

## 📦 البناء للإنتاج

```bash
npm run build
npm start
```

---

## 🛠️ التقنيات المستخدمة

- **Next.js 15** — App Router, Server Components, SEO
- **Tailwind CSS 3** — Utility-first styling, RTL support
- **Framer Motion 11** — Scroll animations, transitions
- **Lucide React** — Icons
- **Cairo Font** — Arabic typography (Google Fonts)
