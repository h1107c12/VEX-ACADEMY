import { useMemo, useState } from "react"

type Star = {
  id: string
  left: string
  top: string
  size: string
  delay: string
  duration: string
}

type Line = {
  id: string
  left: string
  top: string
  width: string
  rotate: string
  delay: string
  duration: string
  opacity: number
}

type Shape = {
  id: string
  type: "triangle" | "diamond" | "square"
  left: string
  top: string
  size: string
  rotate: string
  delay: string
  duration: string
  opacity: number
}

const MOU_HIDE_KEY = "vex-mou-banner-hidden-date"

const getTodayKey = () => {
  const now = new Date()
  return now.toISOString().slice(0, 10)
}

function HeroSection() {
  const MOU_ARTICLE_URL =
    "http://www.newstoktok.com/article.php?aid=25033636030"

  const [showMouBanner, setShowMouBanner] = useState(() => {
    return localStorage.getItem(MOU_HIDE_KEY) !== getTodayKey()
  })

  const closeMouBanner = () => {
    setShowMouBanner(false)
  }

  const hideMouBannerToday = () => {
    localStorage.setItem(MOU_HIDE_KEY, getTodayKey())
    setShowMouBanner(false)
  }

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: 52 }, (_, index) => ({
        id: `star-${index}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 2.4 + 1}px`,
        delay: `${Math.random() * 6}s`,
        duration: `${Math.random() * 3 + 4}s`,
      })),
    [],
  )

  const lines = useMemo<Line[]>(
    () =>
      Array.from({ length: 12 }, (_, index) => ({
        id: `line-${index}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 86}%`,
        width: `${Math.random() * 220 + 100}px`,
        rotate: `${Math.random() * 70 - 35}deg`,
        delay: `${Math.random() * 4}s`,
        duration: `${Math.random() * 5 + 8}s`,
        opacity: Math.random() * 0.12 + 0.08,
      })),
    [],
  )

  const shapes = useMemo<Shape[]>(
    () =>
      Array.from({ length: 10 }, (_, index) => {
        const types = ["triangle", "diamond", "square"] as const
        const type = types[Math.floor(Math.random() * types.length)]

        return {
          id: `shape-${index}`,
          type,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 92}%`,
          size: `${Math.random() * 28 + 16}px`,
          rotate: `${Math.random() * 180}deg`,
          delay: `${Math.random() * 5}s`,
          duration: `${Math.random() * 6 + 9}s`,
          opacity: Math.random() * 0.12 + 0.05,
        }
      }),
    [],
  )

  return (
    <>
      {showMouBanner && (
        <div className="mou-modal">
          <div className="mou-modal__overlay" />

          <div className="mou-modal__box">
            <a
              href={MOU_ARTICLE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mou-modal__banner"
              aria-label="VEX와 호남대학교 MOU 체결 기사 보기"
            >
              <img
                src="/honam-vex-mou.png"
                alt="호남대학교 x VEX E-Sports MOU 체결"
                className="mou-modal__image"
              />

              <span className="mou-modal__shade" />
              <span className="mou-modal__shine" />

              <div className="mou-modal__text">
                <strong>
                  호남대 e스포츠산업학과,
                  <br />
                  <em>㈜벡스이스포츠와 산학협력 협약 체결</em>
                </strong>
              </div>
            </a>

            <div className="mou-modal__actions">
              <button type="button" onClick={hideMouBannerToday}>
                오늘 하루 보지 않기
              </button>

              <button type="button" onClick={closeMouBanner}>
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      <section id="top" className="hero">
        <div className="hero__ambient hero__ambient--left" />
        <div className="hero__ambient hero__ambient--right" />
        <div className="hero__aura" />

        <div className="hero__stars">
          {stars.map((star) => (
            <span
              key={star.id}
              className="hero__star"
              style={{
                left: star.left,
                top: star.top,
                width: star.size,
                height: star.size,
                animationDelay: star.delay,
                animationDuration: star.duration,
              }}
            />
          ))}
        </div>

        <div className="hero__random-lines">
          {lines.map((line) => (
            <span
              key={line.id}
              className="hero__random-line"
              style={{
                left: line.left,
                top: line.top,
                width: line.width,
                transform: `rotate(${line.rotate})`,
                animationDelay: line.delay,
                animationDuration: line.duration,
                opacity: line.opacity,
              }}
            />
          ))}
        </div>

        <div className="hero__shapes">
          {shapes.map((shape) => (
            <span
              key={shape.id}
              className={`hero__shape hero__shape--${shape.type}`}
              style={{
                left: shape.left,
                top: shape.top,
                width: shape.size,
                height: shape.size,
                transform: `rotate(${shape.rotate})`,
                animationDelay: shape.delay,
                animationDuration: shape.duration,
                opacity: shape.opacity,
              }}
            />
          ))}
        </div>

        <div className="hero__frame hero__frame--top" />
        <div className="hero__frame hero__frame--bottom" />

        <div className="hero__container">
          <div className="hero__content">
            <div className="hero__logo-wrap">
              <img
                className="hero__logo"
                src="/logo-hero.png"
                alt="VEX Academy"
                width={430}
                height={430}
                fetchPriority="high"
                decoding="async"
              />

              <div className="hero__copy">
                <div className="hero__actions">
                  <a
                    href="https://www.vexesports.kr/"
                    className="hero__button hero__button--primary"
                  >
                    Vex Esports
                  </a>

                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSe7gOVDaTMf9X34rVrTDK4hA67DRzK93QXgUEF-Hxx2cONqsg/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hero__button hero__button--secondary"
                  >
                    APPLY
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSection