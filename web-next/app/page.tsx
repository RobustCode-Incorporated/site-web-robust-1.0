import type { Metadata } from "next";
import Script from "next/script";
import LegacyFragment from "@/components/LegacyFragment";

export const metadata: Metadata = {
  title: "ROBUST CODE — Engineering capabilities mapped as one connected system",
  description: "ROBUST CODE builds custom software, CRM/ERP, cybersecurity, data and AI systems for growing businesses.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <LegacyFragment file="home.html" />
      <Script src="/assets/js/binary-rain.js" strategy="afterInteractive" />
      <Script src="/assets/js/intro-timeline.js" strategy="afterInteractive" />
      <Script src="/assets/js/hero-buttons.js" strategy="afterInteractive" />
      <Script src="/assets/js/partners-animation.js" strategy="afterInteractive" />
      <Script src="/assets/js/clients-trust-animation.js" strategy="afterInteractive" />
    </>
  );
}
