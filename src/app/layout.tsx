import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "WarmDrop | ستاند ماء فاخر بإضاءة LED دافئة",
    template: "%s | WarmDrop",
  },
  description:
    "ستاند ماء بتصميم دافئ وعصري يضيف لمسة فاخرة لمنزلك مع إضاءة هادئة وتفاصيل أنيقة. متوافق مع قناني 5 جالون. السعر الافتتاحي 449 درهم.",
  keywords: [
    "ستاند ماء",
    "ستاند ماء فاخر",
    "ديكور منزلي",
    "إضاءة LED",
    "WarmDrop",
    "water stand",
    "home decor UAE",
  ],
  authors: [{ name: "WarmDrop" }],
  openGraph: {
    title: "WarmDrop | ستاند ماء فاخر بإضاءة LED دافئة",
    description:
      "ستاند ماء بتصميم دافئ وعصري يضيف لمسة فاخرة لمنزلك مع إضاءة هادئة وتفاصيل أنيقة.",
    type: "website",
    locale: "ar_AE",
    siteName: "WarmDrop",
  },
  twitter: {
    card: "summary_large_image",
    title: "WarmDrop | ستاند ماء فاخر",
    description: "ستاند ماء بتصميم دافئ وعصري — 449 درهم فقط",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className={`${cairo.className} antialiased`}>
        <LanguageProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
