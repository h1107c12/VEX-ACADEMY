import { useEffect, useRef, useState } from "react"
import { supabase } from "../../lib/supabase"
import "../../styles/review.css"

type Review = {
  id: number
  name: string
  rating: number
  content: string
  created_at: string
}

function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [name, setName] = useState("")
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [adminMode, setAdminMode] = useState(false)
  const ratingRef = useRef<HTMLDivElement | null>(null)

  const getRatingFromPointer = (clientX: number) => {
    if (!ratingRef.current) return

    const rect = ratingRef.current.getBoundingClientRect()
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width)
    const nextRating = Math.ceil((x / rect.width) * 5)

    setRating(Math.min(Math.max(nextRating, 1), 5))
  }

  const getReviews = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setReviews(data || [])
  }

  const submitReview = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !content.trim()) {
      alert("닉네임과 후기를 입력해주세요.")
      return
    }

    let adminPassword = ""

    if (adminMode) {
      const inputPassword = prompt("관리자 비밀번호 입력")

      if (!inputPassword) {
        alert("관리자 인증이 필요합니다.")
        return
      }

      adminPassword = inputPassword
    }

    setLoading(true)

    try {
      const { data, error } = await supabase.functions.invoke("submit-review", {
        body: {
          name: name.trim(),
          rating,
          content: content.trim(),
          adminPassword,
        },
      })

      if (error) {
        console.error(error)

        if (error.message) {
          alert(error.message)
        } else {
          alert("리뷰 등록 중 문제가 발생했습니다.")
        }

        return
      }

if (data?.error) {
  alert(data.error)
  return
}

      if (!data?.review) {
        await getReviews()
        alert("리뷰가 등록되었습니다.")

        setName("")
        setRating(5)
        setContent("")
        return
      }

      setReviews((prev) => [data.review, ...prev])

      setName("")
      setRating(5)
      setContent("")

      alert("리뷰가 등록되었습니다.")
    } catch (err) {
      console.error(err)
      alert("리뷰 등록 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.")
    } finally {
      setLoading(false)
    }
  }

  const deleteReview = async (id: number) => {
    const adminPassword = prompt("관리자 비밀번호 입력")

    if (!adminPassword) return

    const { data, error } = await supabase.functions.invoke("delete-review", {
      body: {
        id,
        adminPassword,
      },
    })

    if (error || data?.error) {
      alert(data?.error || "삭제 실패")
      return
    }

    setReviews((prev) => prev.filter((review) => review.id !== id))
  }

  useEffect(() => {
    getReviews()
  }, [])

  useEffect(() => {
    const command = [
      "ArrowUp",
      "ArrowUp",
      "ArrowDown",
      "ArrowDown",
      "ArrowLeft",
      "ArrowRight",
      "ArrowLeft",
      "ArrowRight",
    ]

    let index = 0

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === command[index]) {
        index++

        if (index === command.length) {
          setAdminMode(true)
          alert("관리자 모드 ON")
          index = 0
        }
      } else {
        index = 0
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <section className="review-section" id="reviews">
      <div className="review-inner">
        <div className="review-title-box">
          <p className="review-label">STUDENT REVIEWS</p>
          <h2>수강생 리뷰</h2>
          <p>VEX Academy 수강생들이 직접 남긴 후기입니다.</p>
        </div>

        <form className="review-form" onSubmit={submitReview}>
          <input
            type="text"
            placeholder="닉네임"
            value={name}
            maxLength={12}
            onChange={(e) => setName(e.target.value)}
          />

          <div className="rating-picker">
            <span className="rating-label">별점</span>

            <div
              ref={ratingRef}
              className="rating-stars"
              aria-label="별점 선택"
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId)
                getRatingFromPointer(e.clientX)
              }}
              onPointerMove={(e) => {
                if (e.buttons !== 1) return
                getRatingFromPointer(e.clientX)
              }}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={`rating-star ${star <= rating ? "active" : ""}`}
                  onClick={() => setRating(star)}
                  aria-label={`${star}점`}
                >
                  ★
                </button>
              ))}
            </div>

            <span className="rating-score">{rating}점</span>
          </div>

          <textarea
            placeholder="후기 작성"
            value={content}
            maxLength={300}
            onChange={(e) => setContent(e.target.value)}
          />

          <button type="submit" disabled={loading}>
            {loading ? "등록 중..." : "리뷰 등록"}
          </button>
        </form>

        <div className="review-grid">
          {reviews.map((review) => (
            <article className="review-card" key={review.id}>
              <div className="review-stars-display">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>

              <p className="review-content">{review.content}</p>

              <div className="review-user">
                <span>{review.name}</span>
                <small>VEX Academy Student</small>
              </div>

              {adminMode && (
                <button
                  type="button"
                  className="review-delete-btn"
                  onClick={() => deleteReview(review.id)}
                >
                  삭제
                </button>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ReviewSection