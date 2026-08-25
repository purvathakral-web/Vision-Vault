import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Landing from './pages/Landing.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Hackathons from './pages/Hackathons.jsx'
import Deadlines from './pages/Deadlines.jsx'
import Profile from './pages/Profile.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  const [theme, setTheme] = useState('light')

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  function showPage() {
    if (currentPage === 'dashboard') return <Dashboard setCurrentPage={setCurrentPage} />
    if (currentPage === 'hackathons') return <Hackathons />
    if (currentPage === 'deadlines') return <Deadlines />
    if (currentPage === 'profile') return <Profile />
    return <Landing setCurrentPage={setCurrentPage} />
  }

  return (
    <div data-theme={theme}>
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        theme={theme}
        toggleTheme={toggleTheme}
      />
      {showPage()}
      <Footer />
    </div>
  )
}

export default App
