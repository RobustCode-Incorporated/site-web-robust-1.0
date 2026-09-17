import type { Metadata } from "next";
import Link from "next/link";
import { getTools } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Free Business Tools",
  description: "Free, no-signup-required calculators and assessments for SMEs — starting with the Automation ROI Calculator.",
  alternates: { canonical: "/tools" },
};

export default function ToolsIndexPage() {
  const tools = getTools();
  return (
    <main>
      <section className="section">
        <div className="container">
          <p className="eyebrow">Tools</p>
          <h1>Free business tools</h1>
          <p className="text-soft">Useful on their own, no email required. Built by the same team that builds Robust Code products.</p>
          <ul className="article-grid">
            {tools.map((t) => (
              <li className="article-card" key={t.slug}>
                <Link href={`/tools/${t.slug}`}>
                  <h3>{t.title}</h3>
                  <p>{t.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
