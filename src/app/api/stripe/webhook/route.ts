import { NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
const resendApiKey = process.env.RESEND_API_KEY;
const orderNotificationEmail = process.env.ORDER_NOTIFICATION_EMAIL || "rooteone048@gmail.com";
const orderNotificationFrom = process.env.ORDER_NOTIFICATION_FROM || "WarmDrop <onboarding@resend.dev>";

const stripe = new Stripe(stripeSecretKey ?? "");

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(req: Request) {
  if (!stripeSecretKey || !stripeWebhookSecret) {
    return NextResponse.json(
      { error: "Missing Stripe environment variables for webhook." },
      { status: 500 }
    );
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, stripeWebhookSecret);
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? `Webhook signature verification failed: ${error.message}` : "Webhook verification failed.",
      },
      { status: 400 }
    );
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const amountAed = (paymentIntent.amount_received || paymentIntent.amount || 0) / 100;
    const metadata = paymentIntent.metadata || {};

    const subject = `طلب جديد مدفوع بنجاح - WarmDrop`;
    const textBody = [
      "تم استلام طلب جديد بدفع ناجح.",
      `المبلغ: ${amountAed} AED`,
      `الاسم: ${metadata.customer_name || "-"}`,
      `الهاتف: ${metadata.customer_phone || "-"}`,
      `الإيميل: ${paymentIntent.receipt_email || "-"}`,
      `العنوان: ${metadata.street_address || "-"}`,
      `الإمارة: ${metadata.emirate || "-"}`,
      `اللون: ${metadata.selected_color || "-"}`,
      `الكمية: ${metadata.quantity || "-"}`,
      `PaymentIntent: ${paymentIntent.id}`,
    ].join("\n");

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; line-height: 1.7; color: #1f1f1f;">
        <h2 style="margin: 0 0 12px;">طلب جديد مدفوع بنجاح</h2>
        <p style="margin: 0 0 6px;"><strong>المبلغ:</strong> ${amountAed} AED</p>
        <p style="margin: 0 0 6px;"><strong>الاسم:</strong> ${metadata.customer_name || "-"}</p>
        <p style="margin: 0 0 6px;"><strong>الهاتف:</strong> ${metadata.customer_phone || "-"}</p>
        <p style="margin: 0 0 6px;"><strong>الإيميل:</strong> ${paymentIntent.receipt_email || "-"}</p>
        <p style="margin: 0 0 6px;"><strong>العنوان:</strong> ${metadata.street_address || "-"}</p>
        <p style="margin: 0 0 6px;"><strong>الإمارة:</strong> ${metadata.emirate || "-"}</p>
        <p style="margin: 0 0 6px;"><strong>اللون:</strong> ${metadata.selected_color || "-"}</p>
        <p style="margin: 0 0 6px;"><strong>الكمية:</strong> ${metadata.quantity || "-"}</p>
        <p style="margin: 14px 0 0;"><strong>PaymentIntent:</strong> ${paymentIntent.id}</p>
      </div>
    `;

    if (!resend) {
      console.warn("RESEND_API_KEY is missing. Email notification was not sent.");
      return NextResponse.json({ received: true, warning: "Missing RESEND_API_KEY" });
    }
    const customerEmail =
      paymentIntent.receipt_email ||
      paymentIntent.metadata.customer_email;

    console.log("Customer email:", customerEmail);

const result = await resend.emails.send({
  from: orderNotificationFrom,
  to: [
    orderNotificationEmail,
    ...(customerEmail ? [customerEmail] : []),
  ],
  subject,
  text: textBody,
  html: htmlBody,
});
}
console.log("Resend result:", result);
  }

  return NextResponse.json({ received: true });
}
