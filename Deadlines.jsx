import { useState } from 'react'
import { hackathons, customDeadlines as initialCustom } from '../data/dummyData.js'
import './Deadlines.css'

function daysLeft(dateStr) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr)
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24))
}

function urgencyClass(days) {
  if (days < 3) return 'urgent-red'
  if (days < 7) return 'urgent-orange'
  return 'urgent-green'
}

function Deadlines() {
  const [customDeadlines, setCustomDeadlines] = useState(initialCustom)
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  function handleAdd(e) {
    e.preventDefault()
    if (!title || !date) return
    setCustomDeadlines([...customDeadlines, { id: Date.now(), title, date }])
    setTitle('')
    setDate('')
  }

  function removeDeadline(id) {
    setCustomDeadlines(customDeadlines.filter((item) => item.id !== id))
  }

  const combined = [
    ...hackathons.map((item) => ({ id: 'hack-' + item.id, title: item.name, date: item.date, source: 'Hackathon' })),
    ...customDeadlines.map((item) => ({ id: 'custom-' + item.id, title: item.title, date: item.date, source: 'Custom', customId: item.id })),
  ]

  const upcoming = combined.filter((item) => daysLeft(item.date) >= 0).sort((a, b) => new Date(a.date) - new Date(b.date))

  return (
    <div className="container deadlines-page">
      <div className="page-heading"><h1>Deadline Tracker</h1><p className="margin-note">add and manage your important dates</p></div>
      <form className="card deadline-form" onSubmit={handleAdd}>
        <input placeholder="What's due?" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button type="submit" className="btn btn-primary btn-sm">Add deadline</button>
      </form>
      {upcoming.length === 0 ? <div className="empty-state">No upcoming deadlines.</div> : <div className="deadline-list">
        {upcoming.map((item) => {
          const days = daysLeft(item.date)
          return <div className={`deadline-row ${urgencyClass(days)}`} key={item.id}>
            <div className="deadline-marker" /><div className="deadline-info"><h4>{item.title}</h4><span className="deadline-source">{item.source}</span></div>
            <div className="deadline-days">{days === 0 ? 'Today' : days === 1 ? 'Tomorrow' : `${days} days`}</div>
            {item.source === 'Custom' && <button className="remove-btn" onClick={() => removeDeadline(item.customId)}>✕</button>}
          </div>
        })}
      </div>}
    </div>
  )
}

export default Deadlines
