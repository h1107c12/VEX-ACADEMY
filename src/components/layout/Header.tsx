import { useEffect, useState } from "react"

type NavItem = {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: "REVIEWS", href: "#reviews" },
  { label: "ABOUT", href: "#about" },
  { label: "PROGRAM", href: "#program" },
  { label: "CURRICULUM", href: "#curriculum" },
]

function Header() {
  const [adminMode, setAdminMode] = useState(false)
  const [tapCount, setTapCount] = useState(0)

  const enableAdminMode = () => {
    document.body.classList.add("vex-admin-mode")
    window.dispatchEvent(new Event("vex-admin-mode-change"))
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
          href="#top"
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
                <a href={item.href} className="header__link">
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