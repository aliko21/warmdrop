import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.warn("Missing STRIPE_SECRET_KEY environment variable.");
}


const stripe = new Stripe(stripeSecretKey ?? "");




type CheckoutPayload = {
  qty: number;
  color: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  emirate: string;
};

const uaePhonePattern = /^(?:\+971|00971|0)?5\d{8}$/;

function normalizeUaePhone(phone: string) {
  const cleaned = phone.replace(/\s+/g, "");
  if (!uaePhonePattern.test(cleaned)) return null;

  if (cleaned.startsWith("+971")) return cleaned;
  if (cleaned.startsWith("00971")) return `+${cleaned.slice(2)}`;
  if (cleaned.startsWith("0")) return `+971${cleaned.slice(1)}`;
  if (cleaned.startsWith("5")) return `+971${cleaned}`;
  return null;
}

export async function POST(req: Request) {
  if (!stripeSecretKey) {
    return NextResponse.json(
      { error: "Stripe is not configured. Add STRIPE_SECRET_KEY in environment variables." },
      { status: 500 }
    );
  }

  try {
    const body = (await req.json()) as CheckoutPayload;

    const qty = Math.max(1, Number(body.qty) || 1);
    const color = body.color || "wooden";
    const colorLabel = color === "white" ? "أبيض" : color === "black" ? "أسود" : "خشبي";
    const normalizedPhone = normalizeUaePhone(body.phone || "");

    if (!body.name || !body.phone || !body.email || !body.address || !body.emirate) {
      return NextResponse.json({ error: "يرجى تعبئة جميع الحقول المطلوبة." }, { status: 400 });
    }

    if (!normalizedPhone) {
      return NextResponse.json(
        { error: "رقم الهاتف غير صحيح. يُسمح بالأرقام الإماراتية فقط." },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 44900 * qty,
      currency: "aed",
      payment_method_types: ["card"],
      receipt_email: body.email,
      metadata: {
        customer_name: body.name,
        customer_phone: normalizedPhone,
        street_address: body.address,
        emirate: body.emirate,
        selected_color: colorLabel,
        quantity: String(qty),
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
    });
  } catch (error) {
    console.error("Stripe payment intent creation failed:", error);
    return NextResponse.json({ error: "تعذر تهيئة الدفع حالياً." }, { status: 500 });
  }
}
