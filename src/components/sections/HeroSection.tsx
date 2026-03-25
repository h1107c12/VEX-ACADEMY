function HeroSection() {
  return (
    <section className="hero section" id="hero">
      <div className="hero__grid" />

      <div className="container hero__container">
        <div className="hero__glow hero__glow--left" />
        <div className="hero__glow hero__glow--right" />

        <div className="hero__content">
          <img
            className="hero__logo"
            src="/src/assets/images/logo-hero.png"
            alt="Vex Academy"
          />

          <p className="hero__subtitle">The Next Generation of PUBG Champions</p>

          <div className="hero__actions">
            <a href="#" className="gradient-btn">
              Vex Esports
            </a>

            <a href="#footer" className="outline-btn">
              Contact Us
            </a>
          </div>

          <div className="hero__scroll">
            <span />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection