import Link from "next/link";

/**
 * Ported from the header + mobile menu-overlay markup duplicated across all
 * 24 pages of the current static site (see e.g. repo-root index.html). Kept
 * as close to the original DOM as possible so assets/js/nav-menu.js and
 * assets/js/i18n.js (loaded as plain scripts in RootLayout) keep working
 * unmodified against the same ids/classes.
 */
export default function Header() {
  return (
    <>
      <header className="site-header" id="main-header">
        <div className="container nav-wrap">
          <Link className="brand nav-logo" href="/" aria-label="ROBUST CODE home">
            <img
              src="/assets/images/robust-logo-white.png"
              alt="ROBUST CODE"
              className="brand-logo"
              width={1920}
              height={1080}
              fetchPriority="high"
            />
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            <Link href="/">Home</Link>
            <Link href="/what-we-do">What We Do</Link>
            <Link href="/our-work">Our Work</Link>
            <Link href="/insights">Insights</Link>
            <Link href="/about">About</Link>
            <div className="lang-switch" role="group" aria-label="Language">
              <button
                type="button"
                className="lang-toggle"
                aria-haspopup="true"
                aria-expanded="false"
                aria-label="Change language"
              >
                <i data-lucide="globe" className="lang-globe-icon" />
              </button>
              <div className="lang-options" role="menu">
                <button type="button" className="lang-btn" data-lang-toggle="en" aria-pressed="true" role="menuitemradio">
                  EN
                </button>
                <button type="button" className="lang-btn" data-lang-toggle="fr" aria-pressed="false" role="menuitemradio">
                  FR
                </button>
              </div>
            </div>
          </nav>
          <button
            className="menu-burger"
            id="menu-burger"
            aria-label="Toggle menu"
            aria-expanded="false"
            aria-controls="menu-overlay"
          >
            <span className="burger-line" />
            <span className="burger-line" />
            <span className="burger-line" />
          </button>
        </div>
      </header>

      <div className="menu-overlay" id="menu-overlay" aria-hidden="true">
        <span className="menu-overlay-bg" aria-hidden="true" />
        <nav className="menu-overlay-nav" aria-label="Mobile navigation">
          <span className="mobile-link-mask">
            <Link className="mobile-link" href="/">Home</Link>
          </span>
          <span className="mobile-link-mask">
            <Link className="mobile-link" href="/what-we-do">What We Do</Link>
          </span>
          <span className="mobile-link-mask">
            <Link className="mobile-link" href="/our-work">Our Work</Link>
          </span>
          <span className="mobile-link-mask">
            <Link className="mobile-link" href="/insights">Insights</Link>
          </span>
          <span className="mobile-link-mask">
            <Link className="mobile-link" href="/about">About</Link>
          </span>
        </nav>
        <div className="menu-overlay-footer">
          <div className="menu-overlay-social" aria-label="Social media">
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
      </div>
    </>
  );
}
