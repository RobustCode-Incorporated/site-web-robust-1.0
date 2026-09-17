import fs from "node:fs";
import path from "node:path";

/**
 * Renders a page's <main> content ported verbatim from the current static
 * site (content/legacy-fragments/*.html — extracted from the equivalent
 * .html file at the repo root, asset/link paths already rewritten to
 * absolute routes). This is a deliberate, documented tradeoff for this
 * proof-of-concept migration: it proves the design/animations survive a
 * move to Next.js without a manual, error-prone, attribute-by-attribute
 * JSX rewrite of every section. Real component-by-component conversion is
 * the natural next increment once this scaffold is approved — see
 * web-next/README.md.
 */
export default function LegacyFragment({ file }: { file: string }) {
  const html = fs.readFileSync(path.join(process.cwd(), "content/legacy-fragments", file), "utf-8");
  // eslint-disable-next-line react/no-danger
  return <main dangerouslySetInnerHTML={{ __html: html }} />;
}
