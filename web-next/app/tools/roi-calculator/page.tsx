import type { Metadata } from "next";
import Link from "next/link";
import RoiCalculatorForm from "@/components/RoiCalculatorForm";

export const metadata: Metadata = {
  title: "Automation ROI Calculator",
  description: "Estimate the payback period and annual savings of automating a manual, repetitive task in under a minute.",
  alternates: { canonical: "/tools/roi-calculator" },
};

export default function RoiCalculatorPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Automation ROI Calculator",
    applicationCategory: "BusinessApplication",
    url: "https://www.robust-code.com/tools/roi-calculator",
    offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  };

  return (
    <main>
      <section className="section tool-page">
        <div className="container">
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
          <p className="eyebrow">Free tool</p>
          <h1>Automation ROI Calculator</h1>
          <p className="text-soft">Turn a rough estimate of time spent on a manual task into a payback estimate. No data leaves your browser.</p>

          <RoiCalculatorForm />

          <aside className="cta-box">
            <h3>Want help deciding if this is worth building?</h3>
            <p>We&apos;ll give you an honest read on whether a given process is worth automating before you spend anything.</p>
            <Link className="btn btn-primary" href="/contact">Talk to us</Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
