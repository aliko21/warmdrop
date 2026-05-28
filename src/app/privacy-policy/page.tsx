import type { Metadata } from "next";
import PolicyPageContent from "@/components/policies/PolicyPageContent";

export const metadata: Metadata = {
  title: "سياسة الخصوصية",
  description: "سياسة الخصوصية وحماية بيانات العملاء في WarmDrop.",
};

export default function PrivacyPolicyPage() {
  return <PolicyPageContent type="privacy" />;
}
