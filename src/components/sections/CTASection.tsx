function CTASection() {
  return (
    <section className="cta section">
      <div className="container cta__container">
        <div className="cta__box glass-card">
          <h2 className="cta__title">지금 바로 시작하세요</h2>
          <p className="cta__desc">차세대 배틀그라운드 프로게이머로 성장할 기회</p>

          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe7gOVDaTMf9X34rVrTDK4hA67DRzK93QXgUEF-Hxx2cONqsg/viewform"
            target="_blank"
            rel="noreferrer"
            className="gradient-btn cta__button"
          >
            수강신청하기
          </a>
        </div>
      </div>
    </section>
  )
}

export default CTASection