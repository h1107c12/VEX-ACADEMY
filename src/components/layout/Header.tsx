function Header() {
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="header__logo" onClick={handleLogoClick}>
          <img src="/src/assets/images/logo-small.png" alt="VEX Academy logo" />
        </a>

        <nav className="header__nav">
          <a href="#roster" className="header__link">
            ROSTER
          </a>
          <a href="#about" className="header__link">
            ABOUT
          </a>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe7gOVDaTMf9X34rVrTDK4hA67DRzK93QXgUEF-Hxx2cONqsg/viewform"
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