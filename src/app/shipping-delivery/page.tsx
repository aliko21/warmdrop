import type { Metadata } from "next";
import PolicyPageContent from "@/components/policies/PolicyPageContent";

export const metadata: Metadata = {
  title: "الشحن والتوصيل",
  description: "معلومات الشحن والتوصيل لطلبات WarmDrop داخل دولة الإمارات.",
};

export default function ShippingDeliveryPage() {
  return <PolicyPageContent type="shipping" />;
}
