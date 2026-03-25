import { useMemo } from 'react'

function HeroSection() {
  const stars = useMemo(
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

  const lines = useMemo(
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

  const shapes = useMemo(
    () =>
      Array.from({ length: 10 }, (_, index) => {
        const types = ['triangle', 'diamond', 'square']
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
              width={420}
              height={420}
              fetchPriority="high"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection