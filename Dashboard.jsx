import { hackathons, customDeadlines, recentActivity } from '../data/dummyData.js'
import './Dashboard.css'

function daysLeft(dateStr) {
  const today = new Date()
  const target = new Date(dateStr)
  return Math.ceil((target - today) / (1000 * 60 * 60 * 24))
}

function Dashboard({ setCurrentPage }) {
  const allDeadlines = [
    ...hackathons.map((item) => ({ title: item.name, date: item.date })),
    ...customDeadlines.map((item) => ({ title: item.title, date: item.date })),
  ].sort((a, b) => new Date(a.date) - new Date(b.date))

  const upcomingCount = allDeadlines.filter((item) => daysLeft(item.date) >= 0 && daysLeft(item.date) <= 7).length
  const nextDeadline = allDeadlines.find((item) => daysLeft(item.date) >= 0)
  const recommendedHackathon = [...hackathons].sort((a, b) => new Date(a.date) - new Date(b.date))[0]

  return (
    <div className="container dashboard">
      <div className="page-heading"><h1>Welcome back 👋</h1><p className="margin-note">here is what needs your attention</p></div>

      <div className="grid grid-2 overview-grid">
        <button className="card overview-card" onClick={() => setCurrentPage('deadlines')}>
          <span className="badge badge-coral">Deadlines</span>
          <h3>{upcomingCount} due this week</h3>
          {nextDeadline && <p>Next: {nextDeadline.title} in {daysLeft(nextDeadline.date)} days</p>}
        </button>
        <button className="card overview-card" onClick={() => setCurrentPage('hackathons')}>
          <span className="badge badge-violet">Recommended</span>
          <h3>{recommendedHackathon.name}</h3><p>{recommendedHackathon.mode} · {recommendedHackathon.theme}</p>
        </button>
      </div>

      <div className="grid grid-2 dashboard-lower">
        <div className="card"><h3>Quick actions</h3><div className="quick-actions">
          <button onClick={() => setCurrentPage('deadlines')} className="btn btn-ghost btn-sm">+ Add deadline</button>
          <button onClick={() => setCurrentPage('hackathons')} className="btn btn-ghost btn-sm">Browse hackathons</button>
          <button onClick={() => setCurrentPage('profile')} className="btn btn-ghost btn-sm">View profile</button>
        </div></div>
        <div className="card"><h3>Recent activity</h3><ul className="activity-list">
          {recentActivity.map((item) => <li key={item.id}><span className="activity-dot" /><div><p className="activity-text">{item.text}</p><span className="activity-time">{item.time}</span></div></li>)}
        </ul></div>
      </div>
    </div>
  )
}

export default Dashboard
