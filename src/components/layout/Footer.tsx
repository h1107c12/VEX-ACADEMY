function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__socials">
          <a href="#" aria-label="Instagram" className="footer__social">
            IG
          </a>
          <a href="#" aria-label="X" className="footer__social">
            X
          </a>
        </div>

        <p className="footer__copy">© 2025 Vex Esports Academy. All rights reserved.</p>

        <div className="footer__links">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer