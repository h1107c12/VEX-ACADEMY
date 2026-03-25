function Header() {
  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#hero" className="header__logo">
          <img src="/src/assets/images/logo-small.png" alt="Vex Academy logo" />
        </a>

        <nav className="header__nav">
          <a href="#roster" className="header__link">
            Players
          </a>
          <a href="#about" className="header__link">
            About
          </a>
          <a
            href="https://forms.gle/"
            target="_blank"
            rel="noreferrer"
            className="header__cta"
          >
            수강신청
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Header