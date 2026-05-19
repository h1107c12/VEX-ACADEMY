import { useEffect, useState } from "react"
import type { ChangeEvent, DragEvent, FormEvent } from "react"

import "./InstructorsSection.css"
import { supabase } from "../../lib/supabase"

type Instructor = {
  id: string
  name: string
  role: string
  description: string
  image_url?: string | null
  career?: string | null
  created_at?: string
}

type InstructorForm = {
  name: string
  role: string
  description: string
  career: string
}

export default function InstructorsSection() {
  const [instructors, setInstructors] = useState<Instructor[]>([])
  const [adminMode, setAdminMode] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const [form, setForm] = useState<InstructorForm>({
    name: "",
    role: "",
    description: "",
    career: "",
  })

  const fetchInstructors = async () => {
    const { data, error } = await supabase
      .from("instructors")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
      return
    }

    setInstructors((data as Instructor[]) || [])
  }

  useEffect(() => {
    fetchInstructors()
  }, [])

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

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageSelect = (file: File | undefined) => {
    if (!file) return

    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.")
      return
    }

    setImageFile(file)
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

    if (!form.name.trim() || !form.role.trim() || !form.description.trim()) {
      alert("이름, 역할, 소개는 필수입니다.")
      return
    }

    const imageUrl = await uploadImage()
    if (imageUrl === null) return

    const { error } = await supabase.from("instructors").insert([
      {
        name: form.name.trim(),
        role: form.role.trim(),
        description: form.description.trim(),
        career: form.career.trim(),
        image_url: imageUrl,
      },
    ])

    if (error) {
      console.error(error)
      alert("강사진 등록 실패")
      return
    }

    setForm({
      name: "",
      role: "",
      description: "",
      career: "",
    })

    setImageFile(null)
    fetchInstructors()
  }

  const handleDelete = async (id: string) => {
    if (!adminMode) return

    const ok = window.confirm("이 강사진을 삭제하시겠습니까?")
    if (!ok) return

    const { error } = await supabase
      .from("instructors")
      .delete()
      .eq("id", id)

    if (error) {
      console.error(error)
      alert("강사진 삭제 실패")
      return
    }

    fetchInstructors()
  }

  return (
    <section id="instructors" className="instructors-section">
      <div className="instructors-section__inner">
        <div className="instructors-section__header">
          <span className="instructors-section__eyebrow">ACADEMY TEAM</span>
          <h2 className="instructors-section__title">INSTRUCTORS</h2>
          <p className="instructors-section__desc">
            실전 경험을 바탕으로 성장 방향을 설계하는 VEX E-SPORTS 강사진
          </p>
        </div>

        {adminMode && (
          <form className="instructor-admin" onSubmit={handleSubmit}>
            <div className="instructor-admin__grid">
              <input
                type="text"
                name="name"
                placeholder="강사 이름"
                value={form.name}
                onChange={handleChange}
              />

              <input
                type="text"
                name="role"
                placeholder="역할 / 포지션"
                value={form.role}
                onChange={handleChange}
              />

              <input
                type="text"
                name="career"
                placeholder="주요 경력"
                value={form.career}
                onChange={handleChange}
              />

              <label
                className={`instructor-upload ${
                  isDragging ? "is-dragging" : ""
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

                <span>
                  {imageFile
                    ? imageFile.name
                    : "프로필 이미지 드래그 또는 클릭 업로드"}
                </span>
              </label>

              <textarea
                name="description"
                placeholder="강사 소개"
                value={form.description}
                onChange={handleChange}
              />
            </div>

            <button type="submit">강사진 등록</button>
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

              <div className="instructor-card__image">
                {item.image_url ? (
                  <img src={item.image_url} alt={item.name} loading="lazy" />
                ) : (
                  <span>{item.name.slice(0, 1)}</span>
                )}
              </div>

              <div className="instructor-card__body">
                <span className="instructor-card__role">{item.role}</span>
                <h3>{item.name}</h3>

                {item.career && (
                  <p className="instructor-card__career">{item.career}</p>
                )}

                <p className="instructor-card__desc">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}