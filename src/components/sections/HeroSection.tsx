import { useMemo, type CSSProperties } from 'react'

function HeroSection() {
  const stars = useMemo(
    () =>
      Array.from({ length: 58 }, (_, index) => ({
        id: `star-${index}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: `${Math.random() * 3.2 + 1.2}px`,
        delay: `${Math.random() * 6}s`,
        duration: `${Math.random() * 3 + 4}s`,
      })),
    [],
  )

  const lines = useMemo(
    () =>
      Array.from({ length: 16 }, (_, index) => ({
        id: `line-${index}`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 85}%`,
        width: `${Math.random() * 220 + 120}px`,
        rotate: `${Math.random() * 90 - 45}deg`,
        delay: `${Math.random() * 4}s`,
        duration: `${Math.random() * 5 + 8}s`,
        opacity: Math.random() * 0.16 + 0.12,
      })),
    [],
  )

  const shapes = useMemo(
    () =>
      Array.from({ length: 14 }, (_, index) => {
        const types = ['triangle', 'diamond', 'square']
        const type = types[Math.floor(Math.random() * types.length)]

        return {
          id: `shape-${index}`,
          type,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 90}%`,
          size: `${Math.random() * 34 + 18}px`,
          rotate: `${Math.random() * 180}deg`,
          delay: `${Math.random() * 5}s`,
          duration: `${Math.random() * 6 + 9}s`,
          opacity: Math.random() * 0.16 + 0.08,
        }
      }),
    [],
  )

  const logoMotion = useMemo(
    () =>
      ({
        '--logo-float-duration': `${5.8 + Math.random() * 2.2}s`,
        '--logo-float-delay': `${1.35 + Math.random() * 0.3}s`,
        '--logo-x': `${(Math.random() * 5 - 2.5).toFixed(2)}px`,
        '--logo-y': `${(-6 - Math.random() * 4).toFixed(2)}px`,
        '--logo-rotate': `${(Math.random() * 1.8 - 0.9).toFixed(2)}deg`,
        '--logo-scale-mid': `${(1.008 + Math.random() * 0.012).toFixed(3)}`,
        '--logo-scale-end': `${(1.002 + Math.random() * 0.008).toFixed(3)}`,
      }) as CSSProperties,
    [],
  )

  return (
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

      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__logo-wrap" style={logoMotion}>
            <img
              className="hero__logo"
              src="/logo-hero.png"
              alt="VEX Academy"
              width={460}
              height={460}
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <p className="hero__subtitle">The Next Generation of PUBG Champions</p>

          <div className="hero__actions">
            <a
              href="https://www.vexesports.kr/"
              target="_blank"
              rel="noreferrer"
              className="gradient-btn"
            >
              Vex Esports
            </a>

            <a
              href="https://mail.google.com/mail/u/0/?fs=1&to=vexesportskr@gmail.com&tf=cm"
              target="_blank"
              rel="noreferrer"
              className="outline-btn"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection