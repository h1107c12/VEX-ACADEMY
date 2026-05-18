import { useEffect, useState } from "react"

type NavItem = {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: "ABOUT", href: "#about" },
  { label: "PROGRAM", href: "#program" },
  { label: "CURRICULUM", href: "#curriculum" },
  { label: "REVIEWS", href: "#reviews" },
]

function Header() {
  const [adminMode, setAdminMode] = useState(false)

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
        <a href="#" className="header__logo" aria-label="VEX Academy home">
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
          </ul>
        </nav>

        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSe7gOVDaTMf9X34rVrTDK4hA67DRzK93QXgUEF-Hxx2cONqsg/viewform"
          target="_blank"
          rel="noopener noreferrer"
          className="header__cta"
        >
          수강신청
        </a>
      </div>
    </header>
  )
}

export default Header