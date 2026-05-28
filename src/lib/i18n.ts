export type Locale = "ar" | "en" | "sv";

export const RTL_LOCALES: Locale[] = ["ar"];

export type TranslationValue = string | string[];

export type TranslationTree = {
  [key: string]: TranslationValue | TranslationTree;
};

export const translations: Record<Locale, TranslationTree> = {
  ar: {
    language: {
      label: "اللغة",
      arabic: "العربية",
      english: "English",
      swedish: "Svenska",
    },
    nav: {
      home: "الرئيسية",
      product: "المنتج",
      features: "المميزات",
      reviews: "آراء العملاء",
      contact: "اتصل بنا",
      orderNow: "اطلب الآن",
      menu: "القائمة",
    },
    footer: {
      brandText: "تصميم عصري فاخر يحول زاوية الماء في منزلك إلى قطعة ديكور أنيقة.",
      pages: "الصفحات",
      policies: "السياسات",
      contact: "تواصل معنا",
      home: "الرئيسية",
      product: "المنتج",
      features: "المميزات",
      reviews: "آراء العملاء",
      privacyPolicy: "سياسة الخصوصية",
      refundPolicy: "سياسة الاسترجاع",
      shippingDelivery: "الشحن والتوصيل",
      whatsapp: "واتساب",
      support247: "الدعم متاح 24/7 عبر واتساب",
      rights: "© 2024 WarmDrop. جميع الحقوق محفوظة.",
      tagline: "تصميم دافئ وفاخر لكل منزل",
    },
    policies: {
      inquiry: "للاستفسارات:",
      whatsapp: "واتساب",
      email: "البريد الإلكتروني",
      refund: {
        title: "سياسة الاسترجاع - WarmDrop",
        paragraphs: [
          "نحن نسعى لتقديم أفضل جودة ممكنة لجميع منتجات WarmDrop.",
          "يمكن طلب الاسترجاع أو الاستبدال خلال 3 أيام من استلام المنتج في حال وجود عيب مصنعي أو تلف أثناء الشحن.",
          "يشترط أن يكون المنتج بحالته الأصلية وغير مستخدم.",
        ],
      },
      shipping: {
        title: "الشحن والتوصيل - WarmDrop",
        paragraphs: [
          "نقوم بتوصيل الطلبات داخل دولة الإمارات العربية المتحدة خلال 1 إلى 3 أيام عمل حسب المنطقة.",
          "قد تختلف مدة التوصيل خلال العطل الرسمية أو أوقات الضغط.",
          "سيتم التواصل مع العميل لتأكيد الطلب قبل الشحن.",
        ],
      },
      privacy: {
        title: "سياسة الخصوصية - WarmDrop",
        paragraphs: [
          "نحن نحترم خصوصية عملائنا، ويتم استخدام المعلومات المدخلة فقط لمعالجة الطلبات وتحسين تجربة المستخدم.",
          "لا نقوم ببيع أو مشاركة بيانات العملاء مع أي طرف ثالث.",
          "يتم تأمين عمليات الدفع بواسطة Stripe بشكل آمن ومشفر.",
        ],
      },
    },
  },
  en: {
    language: {
      label: "Language",
      arabic: "Arabic",
      english: "English",
      swedish: "Swedish",
    },
    nav: {
      home: "Home",
      product: "Product",
      features: "Features",
      reviews: "Reviews",
      contact: "Contact",
      orderNow: "Order Now",
      menu: "Menu",
    },
    footer: {
      brandText: "A premium modern design that turns your water corner into an elegant decor piece.",
      pages: "Pages",
      policies: "Policies",
      contact: "Contact Us",
      home: "Home",
      product: "Product",
      features: "Features",
      reviews: "Reviews",
      privacyPolicy: "Privacy Policy",
      refundPolicy: "Refund Policy",
      shippingDelivery: "Shipping & Delivery",
      whatsapp: "WhatsApp",
      support247: "Support is available 24/7 via WhatsApp",
      rights: "© 2024 WarmDrop. All rights reserved.",
      tagline: "Warm luxury design for every home",
    },
    policies: {
      inquiry: "For inquiries:",
      whatsapp: "WhatsApp",
      email: "Email",
      refund: {
        title: "Refund Policy - WarmDrop",
        paragraphs: [
          "We strive to provide the best possible quality for all WarmDrop products.",
          "You can request a return or replacement within 3 days of receiving the product in case of manufacturing defects or shipping damage.",
          "The product must remain in its original condition and unused.",
        ],
      },
      shipping: {
        title: "Shipping & Delivery - WarmDrop",
        paragraphs: [
          "We deliver orders within the United Arab Emirates in 1 to 3 business days depending on the area.",
          "Delivery times may vary during public holidays or peak periods.",
          "The customer will be contacted to confirm the order before shipping.",
        ],
      },
      privacy: {
        title: "Privacy Policy - WarmDrop",
        paragraphs: [
          "We respect our customers' privacy. Information entered is used only to process orders and improve user experience.",
          "We do not sell or share customer data with any third party.",
          "Payments are secured through Stripe using safe and encrypted processing.",
        ],
      },
    },
  },
  sv: {
    language: {
      label: "Sprak",
      arabic: "Arabiska",
      english: "Engelska",
      swedish: "Svenska",
    },
    nav: {
      home: "Hem",
      product: "Produkt",
      features: "Funktioner",
      reviews: "Kundomdomen",
      contact: "Kontakta oss",
      orderNow: "Bestall nu",
      menu: "Meny",
    },
    footer: {
      brandText: "En premium modern design som forvandlar din vattenhorna till en elegant inredningsdetalj.",
      pages: "Sidor",
      policies: "Policyer",
      contact: "Kontakta oss",
      home: "Hem",
      product: "Produkt",
      features: "Funktioner",
      reviews: "Kundomdomen",
      privacyPolicy: "Integritetspolicy",
      refundPolicy: "Returpolicy",
      shippingDelivery: "Frakt och leverans",
      whatsapp: "WhatsApp",
      support247: "Support ar tillganglig 24/7 via WhatsApp",
      rights: "© 2024 WarmDrop. Alla rattigheter forbehallna.",
      tagline: "Varm lyxdesign for varje hem",
    },
    policies: {
      inquiry: "For fragor:",
      whatsapp: "WhatsApp",
      email: "E-post",
      refund: {
        title: "Returpolicy - WarmDrop",
        paragraphs: [
          "Vi stravar efter att leverera hogsta mojliga kvalitet for alla WarmDrop-produkter.",
          "Du kan begara retur eller byte inom 3 dagar efter mottagandet om det finns fabrikationsfel eller transportskada.",
          "Produkten maste vara i originalskick och oanvand.",
        ],
      },
      shipping: {
        title: "Frakt och leverans - WarmDrop",
        paragraphs: [
          "Vi levererar bestallningar inom FAE inom 1 till 3 arbetsdagar beroende pa omrade.",
          "Leveranstid kan variera under helgdagar eller perioder med hog belastning.",
          "Kunden kontaktas for att bekrfta bestallningen innan leverans.",
        ],
      },
      privacy: {
        title: "Integritetspolicy - WarmDrop",
        paragraphs: [
          "Vi respekterar vara kunders integritet. Uppgifter som anges anvands endast for orderhantering och for att forbattra anvandarupplevelsen.",
          "Vi saljer eller delar inte kunddata med tredje part.",
          "Betalningar skyddas via Stripe med saker och krypterad behandling.",
        ],
      },
    },
  },
};

export function getTranslation(locale: Locale, key: string): TranslationValue {
  const segments = key.split(".");
  let current: TranslationTree | TranslationValue = translations[locale];

  for (const segment of segments) {
    if (typeof current === "string" || Array.isArray(current)) return key;
    current = current[segment] as TranslationTree | TranslationValue;
    if (current === undefined) return key;
  }

  if (typeof current === "string" || Array.isArray(current)) return current;
  return key;
}
