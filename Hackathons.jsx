import { useState } from 'react'
import { hackathons, teammateRequests } from '../data/dummyData.js'
import './Hackathons.css'

function Hackathons() {
  const [modeFilter, setModeFilter] = useState('All')
  const [themeFilter, setThemeFilter] = useState('All')
  const [registered, setRegistered] = useState([])

  // unique themes pulled straight from the data, plus "All"
  const themes = ['All']
  for (let i = 0; i < hackathons.length; i++) {
    if (!themes.includes(hackathons[i].theme)) {
      themes.push(hackathons[i].theme)
    }
  }

  // apply both filters with a simple loop instead of chained .filter()
  const filtered = []
  for (let i = 0; i < hackathons.length; i++) {
    const h = hackathons[i]
    const modeMatch = modeFilter === 'All' || h.mode === modeFilter
    const themeMatch = themeFilter === 'All' || h.theme === themeFilter
    if (modeMatch && themeMatch) {
      filtered.push(h)
    }
  }

  function handleRegister(id) {
    if (registered.includes(id)) return
    setRegistered([...registered, id])
  }

  return (
    <div className="container hackathons-page">
      <div className="page-heading">
        <h1>Hackathons</h1>
        <p className="margin-note">weekends well spent, hopefully</p>
      </div>

      <div className="filters">
        <div className="filter-group">
          {['All', 'Virtual', 'In-person', 'Hybrid'].map((mode) => (
            <button
              key={mode}
              className={`chip ${modeFilter === mode ? 'chip-active' : ''}`}
              onClick={() => setModeFilter(mode)}
            >
              {mode}
            </button>
          ))}
        </div>

        <select
          className="theme-select"
          value={themeFilter}
          onChange={(e) => setThemeFilter(e.target.value)}
        >
          {themes.map((t) => (
            <option key={t} value={t}>
              {t === 'All' ? 'All themes' : t}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">No hackathons match those filters. Try widening the search.</div>
      ) : (
        <div className="grid grid-3 hackathon-grid">
          {filtered.map((h) => (
            <div className="card hackathon-card" key={h.id}>
              <div className="hackathon-top">
                <span className="badge badge-violet">{h.mode}</span>
                <span className="badge badge-mint">{h.theme}</span>
              </div>
              <h3>{h.name}</h3>
              <p>{h.location}</p>
              <p className="hackathon-meta">
                {new Date(h.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} ·{' '}
                {h.teamSize}
              </p>
              <button
                className={`btn btn-sm ${registered.includes(h.id) ? 'btn-ghost' : 'btn-primary'}`}
                onClick={() => handleRegister(h.id)}
              >
                {registered.includes(h.id) ? 'Registered ✓' : 'Register'}
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="teammates-section">
        <div className="page-heading">
          <h2>Find Teammates</h2>
          <p className="margin-note">no cold DMs required</p>
        </div>
        <div className="grid grid-3">
          {teammateRequests.map((req) => (
            <div className="card teammate-card" key={req.id}>
              <h3>{req.name}</h3>
              <p>{req.lookingFor}</p>
              <span className="badge badge-marigold">{req.skills}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Hackathons
