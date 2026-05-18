import { useEffect, useState } from "react"

type NavItem = {
  label: string
  sectionId: string
}

const navItems: NavItem[] = [
  { label: "REVIEWS", sectionId: "reviews" },
  { label: "ABOUT", sectionId: "about" },
  { label: "PROGRAM", sectionId: "program" },
  { label: "CURRICULUM", sectionId: "curriculum" },
]

function Header() {
  const [adminMode, setAdminMode] = useState(false)
  const [tapCount, setTapCount] = useState(0)

  const enableAdminMode = () => {
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
                  href="/"
                  className="header__link"
                  onClick={(e) => scrollToSection(e, item.sectionId)}
                >
                  {item.label}
                </a>
              </li>
            ))}

            <li>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSe7gOVDaTMf9X34rVrTDK4hA67DRzK93QXgUEF-Hxx2cONqsg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="header__link header__apply"
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