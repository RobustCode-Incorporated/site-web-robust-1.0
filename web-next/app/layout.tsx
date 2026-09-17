import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.robust-code.com"),
  title: { default: "ROBUST CODE", template: "%s | ROBUST CODE" },
  icons: { icon: "/assets/images/logo.png", apple: "/assets/images/logo.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Same stylesheets as the static site (assets/ copied verbatim into public/) — guarantees identical design without a rewrite. */}
        <link rel="stylesheet" href="/assets/css/styles.css" />
        <link rel="stylesheet" href="/assets/css/insights.css" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />

        {/* Same vendor/animation/i18n scripts as the static site, unmodified. */}
        <Script src="https://unpkg.com/lucide@1.34.0" strategy="afterInteractive" />
        <Script src="/assets/js/i18n.js" strategy="afterInteractive" />
        <Script src="/assets/js/main.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/gsap.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/vendor/ScrollTrigger.min.js" strategy="afterInteractive" />
        <Script src="/assets/js/footer-animation.js" strategy="afterInteractive" />
        <Script src="/assets/js/nav-menu.js" strategy="afterInteractive" />
        <Analytics />
      </body>
    </html>
  );
}
