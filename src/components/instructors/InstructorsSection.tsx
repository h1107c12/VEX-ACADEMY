import { useEffect, useState } from "react"
import type { DragEvent, FormEvent } from "react"

import "./InstructorsSection.css"
import { supabase } from "../../lib/supabase"
import type { GameType } from "../../data/gameData"

type Instructor = {
  id: string
  name?: string | null
  role?: string | null
  description?: string | null
  career?: string | null
  image_url?: string | null
  created_at?: string
}

type InstructorsSectionProps = {
  game: GameType
}

export default function InstructorsSection({ game }: InstructorsSectionProps) {
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null)

  const [adminMode, setAdminMode] = useState(false)

  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState("")

  const [name, setName] = useState("")
  const [role, setRole] = useState("")
  const [career, setCareer] = useState("")

  const [isDragging, setIsDragging] = useState(false)

  const fetchInstructors = async () => {
    const { data, error } = await supabase
      .from("instructors")
      .select("*")
      .eq("game", game)
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setInstructors((data as Instructor[]) || [])
  }

  useEffect(() => {
    fetchInstructors()
  }, [game])

  useEffect(() => {
    const syncAdminMode = () => {
      setAdminMode(document.body.classList.contains("vex-admin-mode"))
    }

    syncAdminMode()

    window.addEventListener("vex-admin-mode-change", syncAdminMode)

    return () => {
      window.removeEventListener("vex-admin-mode-change", syncAdminMode)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
    }
  }, [imagePreview])

  const handleImageSelect = (file: File | undefined) => {
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.")
      return
    }

    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }

    setImageFile(file)
    setImagePreview(URL.createObjectURL(file))
  }

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setIsDragging(false)
    handleImageSelect(e.dataTransfer.files[0])
  }

  const uploadImage = async () => {
    if (!imageFile) return ""

    const fileExt = imageFile.name.split(".").pop()
    const fileName = `${crypto.randomUUID()}.${fileExt}`
    const filePath = `profiles/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from("instructors")
      .upload(filePath, imageFile)

    if (uploadError) {
      console.error(uploadError)
      alert("이미지 업로드 실패")
      return null
    }

    const { data } = supabase.storage
      .from("instructors")
      .getPublicUrl(filePath)

    return data.publicUrl
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!adminMode) return

    if (!imageFile) {
      alert("프로필 카드 이미지를 업로드하세요.")
      return
    }

    if (!name.trim()) {
      alert("이름을 입력하세요.")
      return
    }

    const imageUrl = await uploadImage()

    if (imageUrl === null) return

    const { error } = await supabase.from("instructors").insert([
      {
        name: name.trim(),
        role: role.trim(),
        description: "",
        career: career.trim(),
        image_url: imageUrl,
        game,
      },
    ])

    if (error) {
      console.error(error)
      alert("프로필 카드 등록 실패")
      return
    }

    setImageFile(null)
    setImagePreview("")
    setName("")
    setRole("")
    setCareer("")

    fetchInstructors()
  }

  const handleDelete = async (id: string) => {
    if (!adminMode) return

    const ok = window.confirm("이 프로필 카드를 삭제하시겠습니까?")

    if (!ok) return

    const { error } = await supabase
      .from("instructors")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(error)
      alert("프로필 카드 삭제 실패")
      return
    }

    fetchInstructors()
  }

  return (
    <section id="instructors" className={`instructors-section instructors-section--${game}`}>
      <div className="instructors-section__inner">
        <div className="instructors-section__header">
          <span className="instructors-section__eyebrow">
            ACADEMY TEAM
          </span>

          <h2 className="instructors-section__title">
            Director · Coach
          </h2>

          <p className="instructors-section__desc">
            {game === "pubg" ? "VEX PUBG를 이끄는 감독과 코치진" : "VEX VALORANT를 이끄는 감독과 코치진"}
          </p>
        </div>

        {adminMode && (
          <form className="instructor-admin" onSubmit={handleSubmit}>
            <label
              className={`instructor-upload ${isDragging ? "is-dragging" : ""} ${
                imagePreview ? "has-preview" : ""
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleImageSelect(e.target.files?.[0])}
              />

              {imagePreview ? (
                <img src={imagePreview} alt="프로필 카드 미리보기" />
              ) : (
                <span>
                  완성된 프로필 카드 PNG/JPG
                  <br />
                  드래그 또는 클릭 업로드
                </span>
              )}
            </label>

            <div className="instructor-admin__fields">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="이름 예: 홍길동"
              />

              <input
                value={role}
                onChange={(e) => setRole(e.target.value)}
                placeholder="직책 예: Head Coach"
              />
              <textarea
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                placeholder="경력 / 주요 이력"
              />
            </div>

            <button type="submit">프로필 카드 등록</button>
          </form>
        )}

        <div className="instructors-grid">
          {instructors.map((item) => (
            <article className="instructor-card" key={item.id}>
              {adminMode && (
                <button
                  type="button"
                  className="instructor-card__delete"
                  onClick={() => handleDelete(item.id)}
                >
                  삭제
                </button>
              )}

              <button
                type="button"
                className="instructor-card__button"
                onClick={() => setSelectedInstructor(item)}
              >
                <img
                  src={item.image_url || ""}
                  alt={item.name || "프로필 카드"}
                  className="instructor-card__full"
                  loading="lazy"
                />
              </button>
            </article>
          ))}
        </div>
      </div>

      {selectedInstructor && (
        <div
          className="instructor-modal"
          onClick={() => setSelectedInstructor(null)}
        >
          <div
            className="instructor-modal__panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="instructor-modal__close"
              onClick={() => setSelectedInstructor(null)}
            >
              닫기
            </button>

            <img
              src={selectedInstructor.image_url || ""}
              alt={selectedInstructor.name || "프로필 카드"}
              className="instructor-modal__image"
            />

            <div className="instructor-modal__content">
              <span>{selectedInstructor.role || "INSTRUCTOR"}</span>

              <h3>{selectedInstructor.name || "프로필 카드"}</h3>
              {selectedInstructor.career && (
                <div className="instructor-modal__career">
                  <strong>경력</strong>
                  <p>{selectedInstructor.career}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}