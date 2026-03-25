function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__socials">
          {/* Instagram */}
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="Instagram"
            className="footer__social"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7Zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3Zm5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5Zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5Zm4.8-2.9a1.2 1.2 0 1 0 1.2 1.2 1.2 1.2 0 0 0-1.2-1.2Z"/>
            </svg>
          </a>

          {/* X (트위터) */}
          <a
            href="https://x.com/"
            target="_blank"
            rel="noreferrer"
            aria-label="X"
            className="footer__social"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
              <path d="M18.244 2H21l-6.5 7.43L22 22h-6.828l-5.36-6.99L3.5 22H1l6.97-7.96L2 2h6.828l4.87 6.36L18.244 2Zm-2.396 18h1.885L8.278 4H6.272l9.576 16Z"/>
            </svg>
          </a>
        </div>

        <p className="footer__copy">
          © 2026 Vex Esports Academy. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer