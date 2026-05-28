import type { Metadata } from "next";
import PolicyPageContent from "@/components/policies/PolicyPageContent";

export const metadata: Metadata = {
  title: "سياسة الاسترجاع",
  description: "سياسة الاسترجاع والاستبدال لدى WarmDrop داخل الإمارات.",
};

export default function RefundPolicyPage() {
  return <PolicyPageContent type="refund" />;
}
