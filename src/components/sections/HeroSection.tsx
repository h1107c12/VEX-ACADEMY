import { useEffect, useMemo, useState } from "react"

import { supabase } from "../../lib/supabase"

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

type HeroInstructor = {
  id: string
  image_url?: string | null
  created_at?: string
}

type HeroReview = {
  id: number
  name: string
  rating: number
  content: string
  created_at: string
}

type HeroSectionProps = {
  onOpenPeople?: () => void
  onOpenReviews?: () => void
}

function HeroSection({ onOpenPeople, onOpenReviews }: HeroSectionProps) {
  const [heroInstructors, setHeroInstructors] = useState<HeroInstructor[]>([])
  const [heroReviews, setHeroReviews] = useState<HeroReview[]>([])

  useEffect(() => {
    const fetchHeroInstructors = async () => {
      const { data, error } = await supabase
        .from("instructors")
        .select("id, image_url, created_at")
        .order("created_at", { ascending: false })
        .limit(2)

      if (error) {
        console.error(error)
        return
      }

      setHeroInstructors((data as HeroInstructor[]) || [])
    }

    const fetchHeroReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, name, rating, content, created_at")
        .order("created_at", { ascending: false })
        .limit(4)

      if (error) {
        console.error(error)
        return
      }

      setHeroReviews((data as HeroReview[]) || [])
    }

    fetchHeroInstructors()
    fetchHeroReviews()
  }, [])

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
          {heroInstructors.length > 0 && (
            <aside
              className="hero__instructors"
              aria-label="VEX Academy 감독 코치진"
            >
              <div className="hero__instructors-label">
                <span>Director · Coach</span>
                <strong>ACADEMY TEAM</strong>
              </div>

              <div className="hero__instructors-stack">
                {heroInstructors.map((item, index) => (
                  <a
                    href="#instructors"
                    className={`hero__instructor-card hero__instructor-card--${
                      index + 1
                    }`}
                    key={item.id}
                    aria-label="감독 코치진 프로필 섹션으로 이동"
                    onClick={(e) => {
                      e.preventDefault()
                      onOpenPeople?.()
                    }}
                  >
                    <span className="hero__instructor-scan" />
                    <img
                      src={item.image_url || ""}
                      alt="VEX Academy 감독 코치 프로필 카드"
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={index === 0 ? "high" : "auto"}
                      draggable={false}
                    />
                  </a>
                ))}
              </div>
            </aside>
          )}

          {heroReviews.length > 0 && (
            <aside className="hero__reviews" aria-label="VEX Academy 수강생 리뷰">
              <div className="hero__reviews-head">
                <span>Student Voice</span>
                <strong>REAL REVIEWS</strong>
              </div>

              <div className="hero__reviews-panel">
                <div className="hero__reviews-glow" />

                {heroReviews.map((review, index) => (
                  <article
                    className={`hero__review-card hero__review-card--${index + 1}`}
                    key={review.id}
                  >
                    <div className="hero__review-top">
                      <span className="hero__review-stars">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                      <small>{review.rating}.0</small>
                    </div>

                    <p>{review.content}</p>

                    <div className="hero__review-user">
                      <span>{review.name}</span>
                      <small>VEX Student</small>
                    </div>
                  </article>
                ))}

                <button
                  type="button"
                  className="hero__reviews-more"
                  onClick={onOpenReviews}
                >
                  리뷰 전체 보기
                </button>
              </div>
            </aside>
          )}

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
                  href="https://docs.google.com/forms/d/e/1FAIpQLSe7gOVDaTMf9X34rVrTDK4hA67DRzK93QXgUEF-Hxx2cONqsg/viewform"
                  className="hero__button hero__button--primary"
                >
                  신청하기
                </a>

                <a
                  href="https://www.vexesports.kr/"
                  className="hero__button hero__button--secondary"
                >
                  공홈으로 이동
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection