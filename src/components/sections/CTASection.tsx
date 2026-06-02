function CTASection() {
  return (
    <section id="apply" className="cta section">
      <div className="container cta__container">
        <div className="cta__box">
          <span className="cta__aura" />
          <span className="cta__grid" />
          <span className="cta__scanline" />

          <span className="cta__corner cta__corner--lt" />
          <span className="cta__corner cta__corner--rt" />
          <span className="cta__corner cta__corner--lb" />
          <span className="cta__corner cta__corner--rb" />

          <span className="cta__orb cta__orb--left" />
          <span className="cta__orb cta__orb--right" />

          <div className="cta__content">
            <p className="cta__eyebrow">BATTLEGROUNDS PRO TRAINING</p>

            <h2 className="cta__title">
              지금 바로
              <br />
              시작하세요
            </h2>

            <p className="cta__desc">
              차세대 배틀그라운드 프로게이머로 성장할 기회
            </p>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe7gOVDaTMf9X34rVrTDK4hA67DRzK93QXgUEF-Hxx2cONqsg/viewform"
              target="_blank"
              rel="noreferrer"
              className="cta__button"
            >
              수강신청하기
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection