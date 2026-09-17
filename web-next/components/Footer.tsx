import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer" id="site-footer">
      <span className="footer-top-line" aria-hidden="true" />
      <div className="container footer-grid">
        <div className="footer-brand">
          <Link className="footer-logo" href="/" aria-label="ROBUST CODE home">
            <img
              src="/assets/images/robust-logo-white.png"
              alt="ROBUST CODE"
              className="brand-logo"
              width={1920}
              height={1080}
              loading="lazy"
            />
          </Link>
          <p className="footer-tagline">Innovation at your fingertips</p>
          <div className="footer-social" aria-label="Social media">
            <a href="https://www.instagram.com/robust_code/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <i data-lucide="instagram" />
            </a>
            <a href="https://x.com/RobustCode" target="_blank" rel="noopener noreferrer" aria-label="X">
              <i data-lucide="twitter" />
            </a>
            <a href="https://www.linkedin.com/company/robustcodesarl" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <i data-lucide="linkedin" />
            </a>
          </div>
        </div>

        <div className="footer-column">
          <h2 className="footer-heading">Company</h2>
          <nav className="footer-nav" aria-label="Footer navigation">
            <Link href="/news">News</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/tools">Tools</Link>
            <Link href="/careers">Careers</Link>
            <Link href="/contact">Contact Us</Link>
          </nav>
        </div>

        <div className="footer-column">
          <h2 className="footer-heading">Trust &amp; Security</h2>
          <nav className="footer-nav" aria-label="Trust and security">
            <Link href="/trust/security">Security</Link>
            <Link href="/trust/privacy-protection">Privacy Protection</Link>
            <Link href="/trust/gdpr">GDPR</Link>
            <Link href="/trust/support">Support</Link>
          </nav>
        </div>

        <div className="footer-column">
          <h2 className="footer-heading">Legal</h2>
          <nav className="footer-nav" aria-label="Legal">
            <Link href="/legal/notice">Legal Notice</Link>
            <Link href="/legal/privacy-policy">Privacy Policy</Link>
            <Link href="/legal/cookie-policy">Cookie Policy</Link>
            <Link href="/legal/terms-use">Terms of Use</Link>
            <Link href="/legal/terms-conditions">Terms &amp; Conditions</Link>
          </nav>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; 2024&ndash;<span id="year">2026</span> ROBUST CODE S.a.r.l &middot; All Rights Reserved</p>
      </div>
    </footer>
  );
}
