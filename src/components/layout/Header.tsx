import { useEffect, useRef, useState } from "react"
import type { PageSection } from "../../App"
import "../../styles/header.css"

type HeaderProps = {
  onNavigate: (sectionId: PageSection) => void
}

type NavGroup = {
  label: string
  sectionId: PageSection
  description: string
}

const ADMIN_PASSWORD = "vex2026"

const navGroups: NavGroup[] = [
  {
    label: "Academy",
    sectionId: "academy",
    description: "소개와 프로그램",
  },
  {
    label: "People",
    sectionId: "people",
    description: "강사진과 후기",
  },
  {
    label: "Hub",
    sectionId: "hub",
    description: "소식과 기록",
  },
]

function Header({ onNavigate }: HeaderProps) {
  const [adminMode, setAdminMode] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [tapCount, setTapCount] = useState(0)

  const headerRef = useRef<HTMLElement | null>(null)
  const tapResetTimer = useRef<number | null>(null)

  const syncAdminMode = () => {
    setAdminMode(document.body.classList.contains("vex-admin-mode"))
  }

  const enableAdminMode = () => {
    if (document.body.classList.contains("vex-admin-mode")) return

    const password = window.prompt("관리자 비밀번호 입력")
    if (password === null) return

    if (password !== ADMIN_PASSWORD) {
      alert("비밀번호가 틀렸습니다.")
      return
    }

    document.body.classList.add("vex-admin-mode")
    window.dispatchEvent(new Event("vex-admin-mode-change"))
  }

  const disableAdminMode = () => {
    document.body.classList.remove("vex-admin-mode")
    window.dispatchEvent(new Event("vex-admin-mode-change"))
    setMobileOpen(false)
  }

  const moveToSection = (sectionId: PageSection) => {
    onNavigate(sectionId)
    setMobileOpen(false)
  }

  const handleLogoTap = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    if (window.innerWidth > 768) return

    if (tapResetTimer.current) {
      window.clearTimeout(tapResetTimer.current)
    }

    const nextTapCount = tapCount + 1

    if (nextTapCount >= 10) {
      enableAdminMode()
      setTapCount(0)
      tapResetTimer.current = null
      return
    }

    setTapCount(nextTapCount)

    tapResetTimer.current = window.setTimeout(() => {
      setTapCount(0)
      tapResetTimer.current = null
    }, 3500)
  }

  useEffect(() => {
    const sequence = [
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
      if (e.key === "Escape") {
        setMobileOpen(false)
        return
      }

      if (window.innerWidth <= 768) return

      if (e.key === sequence[index]) {
        index += 1

        if (index >= sequence.length) {
          enableAdminMode()
          index = 0
        }

        return
      }

      index = 0
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  useEffect(() => {
    syncAdminMode()

    window.addEventListener("vex-admin-mode-change", syncAdminMode)

    return () => {
      window.removeEventListener("vex-admin-mode-change", syncAdminMode)
    }
  }, [])

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (!headerRef.current) return
      if (headerRef.current.contains(e.target as Node)) return

      setMobileOpen(false)
    }

    window.addEventListener("pointerdown", handlePointerDown)

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown)
    }
  }, [])

  return (
    <header
      ref={headerRef}
      className={`header ${adminMode ? "header--admin" : ""}`}
    >
      <div className="header__inner">
        <a
          href="/"
          className="header__brand"
          aria-label="VEX Academy home"
          onClick={handleLogoTap}
        >
          <span className="header__brand-mark">
            <img src="/vex-academy.png" alt="VEX Academy logo" />
          </span>

          <span className="header__brand-text">
            <strong>VEX Academy</strong>
            <small>
              {adminMode ? "ADMIN CONSOLE" : "PRO ESPORTS TRAINING"}
            </small>
          </span>
        </a>

        <nav className="header__nav" aria-label="Primary navigation">
          {navGroups.map((group) => (
            <div className="header__nav-item" key={group.label}>
              <button
                type="button"
                className="header__nav-button"
                onClick={() => moveToSection(group.sectionId)}
              >
                <span>{group.label}</span>
                <small>{group.description}</small>
              </button>
            </div>
          ))}
        </nav>

        <div className="header__actions">
          {adminMode && (
            <div
              className="header__admin-pill"
              aria-label="관리자 모드 활성화됨"
            >
              <span className="header__admin-dot" />
              <strong>ADMIN</strong>
            </div>
          )}

          <button
            type="button"
            className="header__hub-button"
            onClick={() => moveToSection("hub")}
          >
            Hub
          </button>

          <button
            type="button"
            className="header__apply-button"
            onClick={() => moveToSection("apply")}
          >
            Apply
          </button>

          <button
            type="button"
            className={`header__menu-button ${mobileOpen ? "is-open" : ""}`}
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="메뉴 열기"
            aria-expanded={mobileOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {adminMode && (
        <div className="header__admin-bar">
          <div className="header__admin-bar-inner">
            <span>관리자 모드 활성화</span>

            <button type="button" onClick={() => moveToSection("hub")}>
              허브 관리
            </button>

            <button type="button" onClick={disableAdminMode}>
              관리자 종료
            </button>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="header__mobile-panel">
          {adminMode && (
            <div className="header__mobile-admin-card">
              <span>ADMIN MODE</span>
              <strong>관리자 편집 권한 활성화됨</strong>
              <button type="button" onClick={disableAdminMode}>
                관리자 종료
              </button>
            </div>
          )}

          {navGroups.map((group) => (
            <div className="header__mobile-group" key={group.label}>
              <p>{group.label}</p>

              <button
                type="button"
                onClick={() => moveToSection(group.sectionId)}
              >
                <span>{group.label}</span>
                <small>{group.description}</small>
              </button>
            </div>
          ))}

          <button
            type="button"
            className="header__mobile-apply"
            onClick={() => moveToSection("apply")}
          >
            수강 신청하기
          </button>
        </div>
      )}
    </header>
  )
}

export default Header