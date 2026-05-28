"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Loader2,
  CreditCardIcon,
  MessageCircle,
  Check,
  Minus,
  Plus,
  Star,
  Shield,
  Truck,
  CreditCard,
} from "lucide-react";

const features = [
  "أجمل تصميم يناسب جميع الديكورات",
  "غطاء قماشي ناعم فاخر",
  "إضاءة LED دافئة سفلية",
  "رف سفلي للأكواب والديكور",
  "متوافق مع قناني 5 جالون",
];

const colors = [
  { id: "wooden", label: "خشبي", bg: "bg-[#7D5A2F]", ring: "ring-[#7D5A2F]" },
  { id: "white", label: "أبيض", bg: "bg-white border border-accent", ring: "ring-brand/40" },
  { id: "black", label: "أسود", bg: "bg-[#1C1C1C]", ring: "ring-[#1C1C1C]" },
];

const trustBadges = [
  { icon: Truck, title: "شحن مجاني", desc: "داخل الإمارات" },
  { icon: Shield, title: "ضمان 6 أشهر", desc: "على المنتج" },
  { icon: CreditCard, title: "دفع آمن", desc: "بطاقة بنكية" },
];

const emirates = [
  "أبوظبي",
  "دبي",
  "الشارقة",
  "عجمان",
  "أم القيوين",
  "رأس الخيمة",
  "الفجيرة",
];

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

const uaePhonePattern = /^(?:\+971|00971|0)?5\d{8}$/;

function normalizeDigits(input: string) {
  return input
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 1632))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 1776));
}

function normalizeUaePhone(phone: string) {
  const cleaned = normalizeDigits(phone).replace(/\s+/g, "");
  if (!uaePhonePattern.test(cleaned)) return null;

  if (cleaned.startsWith("+971")) return cleaned;
  if (cleaned.startsWith("00971")) return `+${cleaned.slice(2)}`;
  if (cleaned.startsWith("0")) return `+971${cleaned.slice(1)}`;
  if (cleaned.startsWith("5")) return `+971${cleaned}`;
  return null;
}

function useCountdown(initialSeconds: number) {
  const [seconds, setSeconds] = useState(initialSeconds);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return { h, m, s };
}

function EmbeddedPaymentForm({
  clientSecret,
  customer,
  amount,
  onSuccess,
  onError,
}: {
  clientSecret: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    emirate: string;
  };
  amount: number;
  onSuccess: () => void;
  onError: (message: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isPaying, setIsPaying] = useState(false);

  const handlePay = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onError("");

    if (!stripe || !elements) {
      onError("نظام الدفع لم يكتمل تحميله بعد. حاول مرة أخرى.");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      onError("تعذر تحميل نموذج البطاقة. حاول مرة أخرى.");
      return;
    }

    setIsPaying(true);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: customer.name,
          email: customer.email,
          phone: customer.phone,
          address: {
            line1: customer.address,
            city: customer.emirate,
            country: "AE",
          },
        },
      },
    });

    if (result.error) {
      onError(result.error.message ?? "تعذر إتمام الدفع.");
      setIsPaying(false);
      return;
    }

    if (result.paymentIntent?.status === "succeeded") {
      onSuccess();
      setIsPaying(false);
      return;
    }

    onError("تم إرسال العملية للمراجعة. تحقق من حالة البطاقة.");
    setIsPaying(false);
  };

  return (
    <form className="space-y-4" onSubmit={handlePay}>
      <div className="rounded-2xl border border-accent/40 bg-white p-4">
        <CardElement
          options={{
            hidePostalCode: true,
            style: {
              base: {
                fontSize: "16px",
                color: "#2B1F1A",
                fontFamily: "Cairo, system-ui, sans-serif",
                "::placeholder": {
                  color: "#8E7A68",
                },
              },
              invalid: {
                color: "#DC2626",
              },
            },
          }}
        />
      </div>

      <motion.button
        type="submit"
        disabled={!stripe || !elements || isPaying}
        whileHover={{ scale: !stripe || !elements || isPaying ? 1 : 1.01 }}
        whileTap={{ scale: !stripe || !elements || isPaying ? 1 : 0.98 }}
        className="w-full flex items-center justify-center gap-3 bg-brand hover:bg-brand-secondary disabled:opacity-70 text-white font-bold py-4 rounded-2xl transition-all duration-300 text-base"
      >
        {isPaying ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            جاري تأكيد الدفع...
          </>
        ) : (
          <>
            <CreditCardIcon size={19} />
            ادفع الآن {Math.round(amount / 100)} درهم
          </>
        )}
      </motion.button>
    </form>
  );
}

export default function ProductInfo({
  selectedColor,
  onColorChange,
}: {
  selectedColor: string;
  onColorChange: (color: string) => void;
}) {
  const [qty, setQty] = useState(1);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(44900);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    emirate: "",
  });
  const { h, m, s } = useCountdown(4 * 3600 + 37 * 60 + 22);
  const normalizedPhone = normalizeUaePhone(formData.phone);
  const isPhoneValid = Boolean(normalizedPhone);

  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCheckoutError(null);
    setShowSuccessPopup(false);

    if (!isPhoneValid || !normalizedPhone) {
      setCheckoutError("رقم الهاتف يجب أن يكون رقمًا إماراتيًا صحيحًا (مثال: 0501234567 أو +971501234567).");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          qty,
          color: selectedColor,
          ...formData,
          phone: normalizedPhone,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.clientSecret) {
        throw new Error(data.error ?? "تعذر تهيئة نموذج الدفع.");
      }

      setClientSecret(data.clientSecret);
      setPaymentAmount(data.amount ?? 44900);
      setIsSubmitting(false);
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : "حدث خطأ غير متوقع.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-brand/45">
        <Link href="/" className="hover:text-primary transition-colors">
          الرئيسية
        </Link>
        <span>/</span>
        <span className="text-brand/70">المنتج</span>
        <span>/</span>
        <span className="text-brand font-medium">استاند ماء فاخر</span>
      </nav>

      {/* Title block */}
      <div>
        <div className="flex items-center gap-2 justify-end mb-3">
          <span className="text-brand/45 text-sm">(523 تقييم)</span>
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={13} className="text-yellow-400 fill-yellow-400" />
            ))}
          </div>
        </div>

        <h1 className="text-3xl md:text-4xl font-extrabold text-brand leading-snug mb-3 text-right">
          استاند ماء فاخر
          <br />
          <span className="text-primary">بتصميم دافئ وإضاءة LED</span>
        </h1>

        <p className="text-brand/65 leading-relaxed text-right text-base">
          تصميم عصري فاخر يخفي قنينة الماء بطريقة أنيقة ويحولها إلى قطعة
          ديكور راقية تناسب المنازل الحديثة.
        </p>
      </div>

      {/* Countdown banner */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-l from-[#7D2D00] to-[#C85A00] rounded-2xl p-4 flex items-center justify-between gap-3"
      >
        <div className="flex gap-2">
          {[{ v: h, l: "س" }, { v: m, l: "د" }, { v: s, l: "ث" }].map(({ v, l }) => (
            <div key={l} className="flex flex-col items-center">
              <div className="bg-white/15 rounded-lg w-12 h-12 flex items-center justify-center">
                <span className="text-white font-black text-xl tabular-nums leading-none">
                  {String(v).padStart(2, "0")}
                </span>
              </div>
              <span className="text-white/60 text-[10px] mt-1">{l}</span>
            </div>
          ))}
        </div>
        <div className="text-right flex-1">
          <p className="text-white font-bold text-sm leading-tight">⚡ عرض محدود الوقت</p>
          <p className="text-white/75 text-xs mt-0.5">ينتهي العرض قريباً — لا تفوّت الفرصة!</p>
        </div>
      </motion.div>

      {/* Quick CTA below countdown */}
      <div className="space-y-3">
        <motion.a
          href={`https://wa.me/971568685828?text=${encodeURIComponent(
            `مرحباً، أريد طلب ستاند الماء الفاخر - اللون: ${colors.find((c) => c.id === selectedColor)?.label} - الكمية: ${qty}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5a] text-white font-bold py-4 rounded-2xl transition-all duration-300 text-base shadow-lg"
        >
          <MessageCircle size={19} />
          اطلب عبر واتساب
        </motion.a>

        <motion.button
          onClick={() => {
            setCheckoutError(null);
            setShowSuccessPopup(false);
            setClientSecret(null);
            setIsCheckoutModalOpen(true);
          }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full flex items-center justify-center gap-3 bg-brand hover:bg-brand-secondary text-white font-bold py-4 rounded-2xl transition-all duration-300 text-base"
        >
          <CreditCardIcon size={19} />
          دفع بالبطاقة
        </motion.button>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-4 justify-end">
        <span className="bg-primary/15 text-primary text-xs font-bold px-3 py-1 rounded-full">
          خصم 55%
        </span>
        <span className="text-lg text-brand/35 line-through">999 درهم</span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-5xl font-black text-brand leading-none">449</span>
          <span className="text-brand/60 text-xl">درهم</span>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2.5 pt-2">
        {features.map((f) => (
          <li key={f} className="flex items-center gap-3 justify-end">
            <span className="text-brand/75 text-sm">{f}</span>
            <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
              <Check size={10} className="text-primary" />
            </div>
          </li>
        ))}
      </ul>

      {/* Color Selection */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-brand/50 text-sm">
            {colors.find((c) => c.id === selectedColor)?.label}
          </span>
          <span className="text-brand font-semibold text-sm">اللون</span>
        </div>
        <div className="flex gap-3 justify-end">
          {colors.map((color) => (
            <button
              key={color.id}
              onClick={() => onColorChange(color.id)}
              title={color.label}
              aria-label={color.label}
              className={`w-10 h-10 rounded-full transition-all duration-300 ${
                color.bg
              } ${
                selectedColor === color.id
                  ? `ring-2 ring-offset-2 ${color.ring} scale-110 shadow-warm`
                  : "hover:scale-105"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-4 justify-end">
        <div className="flex items-center border border-accent rounded-full px-4 py-2 gap-3">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-7 h-7 rounded-full hover:bg-accent flex items-center justify-center transition-colors"
            aria-label="تقليل الكمية"
          >
            <Minus size={13} />
          </button>
          <span className="w-8 text-center font-bold text-brand tabular-nums">
            {qty}
          </span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-7 h-7 rounded-full hover:bg-accent flex items-center justify-center transition-colors"
            aria-label="زيادة الكمية"
          >
            <Plus size={13} />
          </button>
        </div>
        <span className="text-brand/45 text-sm">الكمية</span>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-3">
        {trustBadges.map((badge) => (
          <div
            key={badge.title}
            className="text-center p-4 bg-cream rounded-2xl border border-accent/35 hover:border-primary/25 hover:shadow-warm transition-all duration-300"
          >
            <badge.icon size={20} className="text-primary mx-auto mb-2" />
            <div className="text-brand font-semibold text-xs leading-tight">
              {badge.title}
            </div>
            <div className="text-brand/45 text-xs mt-0.5">{badge.desc}</div>
          </div>
        ))}
      </div>

      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FCFAF6] rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto border border-accent/40 shadow-2xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <button
                type="button"
                onClick={() => {
                  if (isSubmitting) return;
                  setClientSecret(null);
                  setIsCheckoutModalOpen(false);
                }}
                className="w-9 h-9 rounded-full hover:bg-accent/40 transition-colors flex items-center justify-center text-brand"
                aria-label="إغلاق"
              >
                ✕
              </button>
              <div className="text-right">
                <h3 className="text-2xl font-extrabold text-brand">إتمام الدفع</h3>
                <p className="text-brand/60 text-sm mt-1">
                  أدخل بياناتك وسيتم الدفع داخل الموقع مباشرة
                </p>
              </div>
            </div>

            {!clientSecret ? (
              <form className="space-y-4" onSubmit={handleCheckoutSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-sm text-brand/70 font-semibold">الاسم الكامل</label>
                    <input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                      className="w-full rounded-xl border border-accent/60 bg-white px-4 py-3 text-brand outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm text-brand/70 font-semibold">رقم الهاتف</label>
                    <input
                      required
                      type="tel"
                      inputMode="tel"
                      placeholder="0501234567"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          phone: normalizeDigits(e.target.value).replace(/[^\d+]/g, ""),
                        }))
                      }
                      className="w-full rounded-xl border border-accent/60 bg-white px-4 py-3 text-brand outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    {formData.phone.length > 0 && !isPhoneValid && (
                      <p className="text-xs text-red-600 text-right">
                        رقم غير صالح. استخدم رقم إماراتي فقط.
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-brand/70 font-semibold">البريد الإلكتروني</label>
                  <input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    className="w-full rounded-xl border border-accent/60 bg-white px-4 py-3 text-brand outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-brand/70 font-semibold">العنوان</label>
                  <input
                    required
                    value={formData.address}
                    onChange={(e) => setFormData((p) => ({ ...p, address: e.target.value }))}
                    className="w-full rounded-xl border border-accent/60 bg-white px-4 py-3 text-brand outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm text-brand/70 font-semibold">الإمارة</label>
                  <select
                    required
                    value={formData.emirate}
                    onChange={(e) => setFormData((p) => ({ ...p, emirate: e.target.value }))}
                    className="w-full rounded-xl border border-accent/60 bg-white px-4 py-3 text-brand outline-none focus:ring-2 focus:ring-primary/30"
                  >
                    <option value="">اختر الإمارة</option>
                    {emirates.map((emirate) => (
                      <option key={emirate} value={emirate}>
                        {emirate}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4 text-right">
                  <p className="text-sm font-semibold text-brand">
                    أدخل بيانات البطاقة مباشرة لإتمام الدفع داخل الموقع بدون تحويل.
                  </p>
                </div>

                {checkoutError && <p className="text-red-600 text-sm text-right">{checkoutError}</p>}

                {!stripePromise && (
                  <p className="text-red-600 text-sm text-right">
                    أضف NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY في ملف البيئة لتفعيل الدفع داخل الموقع.
                  </p>
                )}

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !stripePromise || !isPhoneValid}
                  whileHover={{ scale: isSubmitting || !stripePromise || !isPhoneValid ? 1 : 1.01 }}
                  whileTap={{ scale: isSubmitting || !stripePromise || !isPhoneValid ? 1 : 0.98 }}
                  className="w-full flex items-center justify-center gap-3 bg-brand hover:bg-brand-secondary disabled:opacity-70 text-white font-bold py-4 rounded-2xl transition-all duration-300 text-base"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      جاري تجهيز الدفع...
                    </>
                  ) : (
                    <>
                      <CreditCardIcon size={19} />
                      متابعة الدفع
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="rounded-2xl bg-primary/10 border border-primary/20 p-4 text-right">
                  <p className="text-sm font-semibold text-brand">
                    أكمل بيانات البطاقة مباشرة من داخل الموقع.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setClientSecret(null);
                    setCheckoutError(null);
                  }}
                  className="text-sm text-brand/70 hover:text-brand transition-colors"
                >
                  تعديل بيانات العميل
                </button>

                <Elements
                  stripe={stripePromise}
                  options={{
                    clientSecret,
                    appearance: {
                      theme: "stripe",
                    },
                  }}
                >
                  <EmbeddedPaymentForm
                    clientSecret={clientSecret}
                    customer={formData}
                    amount={paymentAmount}
                    onSuccess={() => {
                      setIsCheckoutModalOpen(false);
                      setShowSuccessPopup(true);
                      setClientSecret(null);
                      setCheckoutError(null);
                    }}
                    onError={(message) => setCheckoutError(message || null)}
                  />
                </Elements>
              </div>
            )}

            {checkoutError && clientSecret && (
              <p className="text-red-600 text-sm text-right mt-4">{checkoutError}</p>
            )}
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="fixed inset-0 z-[95] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md border border-accent/40 shadow-2xl p-7 text-right">
            <h3 className="text-2xl font-extrabold text-brand">تم الدفع بنجاح</h3>
            <p className="text-brand/70 mt-3 leading-relaxed">
              تم إرسال إيميل التأكيد بنجاح. شكرا لطلبك، وسيتم التواصل معك قريبًا.
            </p>
            <button
              type="button"
              onClick={() => setShowSuccessPopup(false)}
              className="mt-6 w-full bg-brand hover:bg-brand-secondary text-white font-bold py-3 rounded-2xl transition-colors"
            >
              ممتاز
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
