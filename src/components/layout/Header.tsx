function Header() {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()

    const hero = document.getElementById('hero')
    if (!hero) return

    const y = hero.getBoundingClientRect().top + window.scrollY

    window.scrollTo({
      top: y - 100, // 🔥 transform 값만큼 보정
      behavior: 'smooth',
    })
  }

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#hero" className="header__logo" onClick={handleLogoClick}>
          <img src="/src/assets/images/logo-small.png" alt="Vex Academy logo" />
        </a>

        <nav className="header__nav">
          <a href="#roster" className="header__link">
            ROSTER
          </a>
          <a href="#about" className="header__link">
            ABOUT
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