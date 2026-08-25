// ============================================
// DATA.JS — all dummy data for Vision Vault
// No backend, no database — everything the app
// shows comes from these plain JS arrays/objects.
// Later pages (hackathons, internships, etc.)
// will read from and add to these same arrays.
// ============================================

// ---- Hackathons ----
// mode: "Virtual" | "In-person" | "Hybrid"
const hackathons = [
  { id: 1, name: "Smart India Hackathon",   date: "2026-08-18", mode: "In-person", theme: "Govt Tech",     location: "Delhi",     link: "#" },
  { id: 2, name: "HackMol 6.0",              date: "2026-08-22", mode: "Hybrid",     theme: "Open Innovation", location: "Vellore",  link: "#" },
  { id: 3, name: "ETHIndia",                 date: "2026-09-05", mode: "In-person", theme: "Web3",          location: "Bengaluru", link: "#" },
  { id: 4, name: "HackTheNorth Clone Cup",   date: "2026-09-12", mode: "Virtual",    theme: "Open Innovation", location: "Online",   link: "#" },
  { id: 5, name: "DesignSprint '26",         date: "2026-09-20", mode: "Virtual",    theme: "UI/UX",         location: "Online",    link: "#" },
  { id: 6, name: "AI Genesis Hack",          date: "2026-10-02", mode: "Hybrid",     theme: "AI/ML",         location: "Pune",      link: "#" },
];

// ---- Internship applications ----
// status: "Applied" | "OA" | "Interview" | "Offer" | "Rejected"
let internships = [
  { id: 1, company: "Razorpay",   role: "SDE Intern",         status: "OA",        deadline: "2026-08-17", notes: "Round 2 is a system design round.", link: "#" },
  { id: 2, company: "Zomato",     role: "Frontend Intern",    status: "Applied",   deadline: "2026-08-25", notes: "Referral from senior batch.",       link: "#" },
  { id: 3, company: "Swiggy",     role: "Backend Intern",     status: "Interview", deadline: "2026-08-16", notes: "HR round scheduled.",                link: "#" },
  { id: 4, company: "Cred",       role: "Product Intern",     status: "Rejected",  deadline: "2026-07-30", notes: "Good learning, apply again next cycle.", link: "#" },
  { id: 5, company: "Groww",      role: "SDE Intern",         status: "Offer",     deadline: "2026-07-15", notes: "Offer letter received!",             link: "#" },
];

// ---- Custom deadlines added by the student (separate from hackathons/internships) ----
let customDeadlines = [
  { id: 1, title: "Resume review with mentor", date: "2026-08-15", note: "Bring updated project list" },
];

// ---- Skill Roadmaps ----
// each skill has "done": true/false so we can calculate progress %
const roadmaps = {
  "Full Stack": [
    { skill: "HTML & CSS", done: true },
    { skill: "JavaScript", done: true },
    { skill: "React basics", done: true },
    { skill: "Node.js + Express", done: false },
    { skill: "Databases (SQL/Mongo)", done: false },
    { skill: "Deployment", done: false },
  ],
  "AI/ML": [
    { skill: "Python", done: true },
    { skill: "NumPy & Pandas", done: true },
    { skill: "Statistics basics", done: false },
    { skill: "Scikit-learn", done: false },
    { skill: "Neural networks", done: false },
  ],
  "Web3": [
    { skill: "Blockchain basics", done: true },
    { skill: "Solidity", done: false },
    { skill: "Smart contract testing", done: false },
    { skill: "Ethers.js", done: false },
  ],
  "UI/UX": [
    { skill: "Design principles", done: true },
    { skill: "Figma", done: true },
    { skill: "Wireframing", done: true },
    { skill: "User research", done: false },
    { skill: "Prototyping", done: false },
  ],
  "Data Science": [
    { skill: "Python", done: true },
    { skill: "SQL", done: false },
    { skill: "Data visualization", done: false },
    { skill: "Machine learning basics", done: false },
  ],
};

// ---- Profile (dummy logged-in student) ----
let profile = {
  name: "Aditi Sharma",
  branch: "CSE, 3rd Year",
  college: "Thapar Institute of Engineering",
  bio: "Building things, breaking things, fixing things. Currently deep in React and DSA.",
  skills: ["JavaScript", "React", "Python", "Git"],
  pastHackathons: ["HackMol 5.0", "CodeFest Winter"],
  github: "https://github.com/aditisharma",
  linkedin: "https://linkedin.com/in/aditisharma",
  portfolio: "https://aditisharma.dev",
};

// ---- Recent activity (dummy feed for dashboard) ----
const recentActivity = [
  { text: "You moved Swiggy internship to Interview stage", time: "2 hours ago" },
  { text: "You marked 'React basics' as done in Full Stack roadmap", time: "Yesterday" },
  { text: "You registered for HackMol 6.0", time: "2 days ago" },
  { text: "You added a custom deadline: Resume review with mentor", time: "3 days ago" },
];

// ============================================
// HELPER FUNCTIONS
// These are small reusable functions other page
// scripts (dashboard.js, deadlines.js, etc.) call.
// Using simple loops on purpose, not fancy chained
// array methods, so the logic is easy to explain.
// ============================================

// Returns how many whole days are left until a given date string (YYYY-MM-DD)
function daysUntil(dateStr) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((target - today) / msPerDay);
}

// Builds one combined list of every deadline in the app:
// hackathons + internship deadlines + custom deadlines.
// Each item is shaped the same way so pages can loop over it easily.
function getAllDeadlines() {
  let all = [];

  for (let i = 0; i < hackathons.length; i++) {
    const h = hackathons[i];
    all.push({ title: h.name, date: h.date, type: "Hackathon" });
  }

  for (let i = 0; i < internships.length; i++) {
    const app = internships[i];
    if (app.status !== "Offer" && app.status !== "Rejected") {
      all.push({ title: app.company + " — " + app.role, date: app.deadline, type: "Internship" });
    }
  }

  for (let i = 0; i < customDeadlines.length; i++) {
    const c = customDeadlines[i];
    all.push({ title: c.title, date: c.date, type: "Custom" });
  }

  // simple sort: soonest deadline first
  all.sort(function (a, b) {
    return daysUntil(a.date) - daysUntil(b.date);
  });

  return all;
}

// Given days left, returns which urgency color tag to use
function urgencyTag(days) {
  if (days < 3) return "tag-coral";
  if (days < 7) return "tag-marigold";
  return "tag-mint";
}

// Calculates % of skills marked done for one roadmap track
function roadmapProgress(trackName) {
  const skills = roadmaps[trackName];
  let doneCount = 0;
  for (let i = 0; i < skills.length; i++) {
    if (skills[i].done) doneCount++;
  }
  return Math.round((doneCount / skills.length) * 100);
}

// Counts how many internship applications are in each status
function internshipStatusCounts() {
  const counts = { Applied: 0, OA: 0, Interview: 0, Offer: 0, Rejected: 0 };
  for (let i = 0; i < internships.length; i++) {
    counts[internships[i].status]++;
  }
  return counts;
}
