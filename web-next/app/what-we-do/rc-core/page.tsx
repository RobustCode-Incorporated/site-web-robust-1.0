import type { Metadata } from "next";
import Script from "next/script";
import LegacyFragment from "@/components/LegacyFragment";

export const metadata: Metadata = {
  title: "RC-CORE | Custom Software, CRM/ERP & Cybersecurity by ROBUST CODE",
  description: "RC-CORE by ROBUST CODE: custom software engineering, CRM/ERP solutions, cybersecurity and payment APIs.",
  alternates: { canonical: "/what-we-do/rc-core" },
};

export default function RcCorePage() {
  return (
    <>
      <LegacyFragment file="rc-core.html" />
      <Script src="/assets/js/rc-core.js" strategy="afterInteractive" />
      <Script src="/assets/js/hero-buttons.js" strategy="afterInteractive" />
      <Script src="/assets/js/liquid-glass-cards.js" strategy="afterInteractive" />
    </>
  );
}
