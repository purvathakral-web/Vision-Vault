// All fake/sample data for the app lives here.
// In a real app this would come from a backend — for this project
// we just keep it in plain JS arrays and objects.

export const hackathons = [
  {
    id: 1,
    name: 'Smart India Hackathon',
    mode: 'Hybrid',
    theme: 'Government Tech',
    date: '2026-09-12',
    location: 'Multiple Nodal Centres',
    teamSize: '6 members',
    link: '#',
  },
  {
    id: 2,
    name: 'HackNITR 6.0',
    mode: 'In-person',
    theme: 'Open Innovation',
    date: '2026-09-05',
    location: 'NIT Rourkela',
    teamSize: '4 members',
    link: '#',
  },
  {
    id: 3,
    name: 'ETHIndia',
    mode: 'Virtual',
    theme: 'Web3',
    date: '2026-10-02',
    location: 'Online',
    teamSize: '4 members',
    link: '#',
  },
  {
    id: 4,
    name: 'HealthTech Sprint',
    mode: 'Virtual',
    theme: 'HealthTech',
    date: '2026-08-28',
    location: 'Online',
    teamSize: '3 members',
    link: '#',
  },
  {
    id: 5,
    name: 'Design Jam Bangalore',
    mode: 'In-person',
    theme: 'UI/UX',
    date: '2026-09-20',
    location: 'Bengaluru',
    teamSize: '2 members',
    link: '#',
  },
  {
    id: 6,
    name: 'AI for Bharat',
    mode: 'Hybrid',
    theme: 'AI/ML',
    date: '2026-10-15',
    location: 'Hyderabad + Online',
    teamSize: '4 members',
    link: '#',
  },
]

export const teammateRequests = [
  { id: 1, name: 'Ananya R.', lookingFor: 'ETHIndia — needs a Solidity dev', skills: 'React, Solidity' },
  { id: 2, name: 'Rohit K.', lookingFor: 'AI for Bharat — needs a designer', skills: 'Python, ML' },
  { id: 3, name: 'Priya S.', lookingFor: 'HackNITR — needs a backend dev', skills: 'Figma, UX' },
]

// custom, non-hackathon non-internship deadlines the student adds themselves
export let customDeadlines = [
  { id: 1, title: 'Submit minor project report', date: '2026-08-17' },
  { id: 2, title: 'GRE registration closes', date: '2026-08-30' },
]

export const recentActivity = [
  { id: 1, text: 'Added a new deadline', time: '2 hours ago' },
  { id: 2, text: 'Registered interest in a hackathon', time: '1 day ago' },
  { id: 3, text: 'Registered for HackNITR 6.0', time: '2 days ago' },
  { id: 4, text: 'Added deadline: GRE registration closes', time: '3 days ago' },
]

export const defaultProfile = {
  name: 'Team Vision Vault',
  branch: 'CSE(AI-ML), 2nd Year',
  college: 'Chitkara University',
  bio: 'Building things, breaking things, fixing things. Currently deep into React and system design.',
  skills: ['React', 'Node.js', 'Python',],
  hackathonsDone: ['Smart India Hackathon 2025', 'HackNITR 5.0'],
  github: 'github.com/vision-vault',
  linkedin: 'linkedin.com/in/vision vault',
}
