import { useState } from 'react'
import { defaultProfile } from '../data/dummyData.js'
import './Profile.css'

function Profile() {
  const [profile, setProfile] = useState(defaultProfile)
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState(defaultProfile)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSkillsChange(e) {
    // comma separated input, split into an array
    const skillsArray = e.target.value.split(',').map((s) => s.trim())
    setForm({ ...form, skills: skillsArray })
  }

  function saveProfile(e) {
    e.preventDefault()
    setProfile(form)
    setEditing(false)
  }

  function startEditing() {
    setForm(profile)
    setEditing(true)
  }

  return (
    <div className="container profile-page">
      <div className="page-heading">
        <h1>Profile</h1>
        <p className="margin-note">this is how the rest of the app knows you</p>
      </div>

      {!editing ? (
        <div className="card profile-card">
          <div className="profile-top">
            <div>
              <h2>{profile.name}</h2>
              <p>
                {profile.branch} · {profile.college}
              </p>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={startEditing}>
              Edit profile
            </button>
          </div>

          <p className="profile-bio">{profile.bio}</p>

          <div className="profile-section">
            <h4>Skills</h4>
            <div className="skill-tags">
              {profile.skills.map((skill) => (
                <span className="badge badge-violet" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="profile-section">
            <h4>Hackathons</h4>
            <ul className="hackathon-history">
              {profile.hackathonsDone.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>

          <div className="profile-section">
            <h4>Links</h4>
            <div className="profile-links">
              <a href={`https://${profile.github}`} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={`https://${profile.linkedin}`} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={`https://${profile.portfolio}`} target="_blank" rel="noreferrer">
                Portfolio
              </a>
            </div>
          </div>
        </div>
      ) : (
        <form className="card profile-form" onSubmit={saveProfile}>
          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />

          <label>Branch & Year</label>
          <input name="branch" value={form.branch} onChange={handleChange} />

          <label>College</label>
          <input name="college" value={form.college} onChange={handleChange} />

          <label>Bio</label>
          <textarea name="bio" value={form.bio} onChange={handleChange} rows="3" />

          <label>Skills (comma separated)</label>
          <input value={form.skills.join(', ')} onChange={handleSkillsChange} />

          <label>GitHub</label>
          <input name="github" value={form.github} onChange={handleChange} />

          <label>LinkedIn</label>
          <input name="linkedin" value={form.linkedin} onChange={handleChange} />

          <label>Portfolio</label>
          <input name="portfolio" value={form.portfolio} onChange={handleChange} />

          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-sm">
              Save changes
            </button>
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Profile
