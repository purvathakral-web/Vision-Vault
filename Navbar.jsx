import { useState } from 'react'
import ThemeToggle from './ThemeToggle.jsx'
import './Navbar.css'

const links = [
  { page: 'dashboard', label: 'Dashboard' },
  { page: 'hackathons', label: 'Hackathons' },
  { page: 'deadlines', label: 'Deadlines' },
  { page: 'profile', label: 'Profile' },
]

function Navbar({ currentPage, setCurrentPage, theme, toggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function changePage(page) {
    setCurrentPage(page)
    setMenuOpen(false)
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <button className="logo logo-button" onClick={() => changePage('home')}>
          Vision<span>Vault</span>
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {links.map((link) => (
            <button
              key={link.page}
              className={currentPage === link.page ? 'active' : ''}
              onClick={() => changePage(link.page)}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="navbar-right">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar
