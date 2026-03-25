type NavItem = {
  label: string
  href: string
}

const navItems: NavItem[] = [
  { label: 'ROSTER', href: '#roster' },
  { label: 'ABOUT', href: '#about' },
  { label: 'PROGRAM', href: '#program' },
  { label: 'CURRICULUM', href: '#curriculum' },
]

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <a href="#" className="header__logo" aria-label="VEX Academy home">
          <img src="/vex-academy.png" alt="VEX Academy logo" />
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