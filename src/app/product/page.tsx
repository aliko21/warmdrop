import type { Metadata } from "next";
import ProductClientSection from "@/components/product/ProductClientSection";
import ProductSpecs from "@/components/product/ProductSpecs";
import ProductFAQ from "@/components/product/ProductFAQ";
import ProductReviews from "@/components/product/ProductReviews";

export const metadata: Metadata = {
  title: "استاند ماء فاخر بتصميم دافئ وإضاءة LED",
  description:
    "استاند ماء عصري فاخر يحوّل زاوية الماء في منزلك إلى قطعة ديكور أنيقة. خشب طبيعي، غطاء قماشي، إضاءة LED دافئة. السعر الافتتاحي 449 درهم فقط.",
};

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Main product section */}
      <section className="max-w-7xl mx-auto px-6 py-14">
        <ProductClientSection />
      </section>

      {/* Specs & box contents */}
      <section className="max-w-7xl mx-auto px-6">
        <ProductSpecs />
      </section>

      {/* FAQ */}
      <section className="max-w-7xl mx-auto px-6">
        <ProductFAQ />
      </section>

      {/* Reviews */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <ProductReviews />
      </section>
    </div>
  );
}
