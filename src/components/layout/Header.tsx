import { useEffect, useState } from "react"

type NavItem = {
  label: string
  sectionId: string
}

const ADMIN_PASSWORD = "vex2026"

const navItems: NavItem[] = [
  { label: "ABOUT", sectionId: "about" },
  { label: "PROGRAM", sectionId: "program" },
  { label: "CURRICULUM", sectionId: "curriculum" },
  { label: "INSTRUCTORS", sectionId: "instructors" },
  { label: "REVIEWS", sectionId: "reviews" },
]

function Header() {
  const [adminMode, setAdminMode] = useState(false)
  const [tapCount, setTapCount] = useState(0)

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

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault()

    const el = document.getElementById(sectionId)
    if (!el) return

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  const handleLogoTap = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    if (window.innerWidth > 768) return

    const nextTapCount = tapCount + 1

    if (nextTapCount >= 10) {
      enableAdminMode()
      setTapCount(0)
      return
    }

    setTapCount(nextTapCount)

    window.setTimeout(() => {
      setTapCount(0)
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
    const checkAdminMode = () => {
      setAdminMode(document.body.classList.contains("vex-admin-mode"))
    }

    checkAdminMode()

    window.addEventListener("vex-admin-mode-change", checkAdminMode)

    return () => {
      window.removeEventListener("vex-admin-mode-change", checkAdminMode)
    }
  }, [])

  return (
    <header className={`header ${adminMode ? "header--admin" : ""}`}>
      <div className="header__inner">
        <a
          href="/"
          className="header__logo"
          aria-label="VEX Academy home"
          onClick={handleLogoTap}
        >
          <img src="/vex-academy.png" alt="VEX Academy logo" />

          {adminMode && <span className="header__admin-badge">ADMIN</span>}
        </a>

        <nav className="header__nav" aria-label="Primary navigation">
          <ul className="header__menu">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={`#${item.sectionId}`}
                  className="header__link"
                  onClick={(e) => scrollToSection(e, item.sectionId)}
                >
                  {item.label}
                </a>
              </li>
            ))}

            <li>
              <a
                href="#apply"
                className="header__link header__apply"
                onClick={(e) => scrollToSection(e, "apply")}
              >
                APPLY
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header