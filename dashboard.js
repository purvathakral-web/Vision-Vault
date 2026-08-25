// ============================================
// DASHBOARD.JS
// Reads data from data.js and fills in the
// overview cards on the dashboard. Nothing here
// is hardcoded in the HTML — it's all built with
// simple loops so it stays correct if the data
// arrays change.
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  greetUser();
  renderUpcomingDeadlines();
  renderRecommendedHackathon();
  renderRecentActivity();
});

// ---- Greeting ----
function greetUser() {
  document.getElementById("greeting").textContent = "Welcome back, " + profile.name.split(" ")[0] + " 👋";
}

// ---- Upcoming Deadlines card: show soonest 3 ----
function renderUpcomingDeadlines() {
  const list = document.getElementById("deadlinesList");
  const all = getAllDeadlines();
  const topThree = all.slice(0, 3); // only need the 3 soonest on the dashboard

  for (let i = 0; i < topThree.length; i++) {
    const item = topThree[i];
    const days = daysUntil(item.date);

    const li = document.createElement("li");
    li.innerHTML =
      '<span class="item-title">' + item.title + '</span>' +
      '<span class="tag ' + urgencyTag(days) + '">' + formatDaysLeft(days) + '</span>';
    list.appendChild(li);
  }
}

// Turns a number of days into readable text like "3 days" or "Today"
function formatDaysLeft(days) {
  if (days < 0) return "Overdue";
  if (days === 0) return "Today";
  return days + " day" + (days === 1 ? "" : "s");
}

// ---- Recommended Hackathon card: pick the nearest upcoming one ----
function renderRecommendedHackathon() {
  const card = document.getElementById("recommendedHackathon");

  // find the hackathon with the smallest positive days-left value
  let soonest = hackathons[0];
  for (let i = 1; i < hackathons.length; i++) {
    if (daysUntil(hackathons[i].date) < daysUntil(soonest.date)) {
      soonest = hackathons[i];
    }
  }

  card.innerHTML =
    '<h3>Recommended Hackathon</h3>' +
    '<p class="reco-name">' + soonest.name + '</p>' +
    '<p class="reco-meta">' + soonest.mode + ' · ' + soonest.theme + ' · ' + formatDaysLeft(daysUntil(soonest.date)) + ' left</p>' +
    '<a href="hackathons.html" class="btn btn-primary btn-small">View details</a>';
}

// ---- Internship Pipeline card: counts per status ----
function renderInternshipPipeline() {
  const list = document.getElementById("pipelineList");
  const counts = internshipStatusCounts();
  const statuses = ["Applied", "OA", "Interview", "Offer", "Rejected"];

  for (let i = 0; i < statuses.length; i++) {
    const status = statuses[i];
    const li = document.createElement("li");
    li.innerHTML =
      '<span class="item-title">' + status + '</span>' +
      '<span class="item-days">' + counts[status] + '</span>';
    list.appendChild(li);
  }
}

// ---- Skill Progress card: show progress for one roadmap track ----
function renderSkillProgress() {
  const card = document.getElementById("skillProgressCard");
  const track = "Full Stack"; // could later let the user choose their active track
  const percent = roadmapProgress(track);

  card.innerHTML =
    '<h3>Skill Progress</h3>' +
    '<p class="progress-track-name">' + track + '</p>' +
    '<div class="progress-bar-bg"><div class="progress-bar-fill" style="width:' + percent + '%"></div></div>' +
    '<p class="progress-percent">' + percent + '% complete</p>' +
    '<a href="roadmap.html" class="card-link">Continue roadmap →</a>';
}

// ---- Recent Activity list ----
function renderRecentActivity() {
  const list = document.getElementById("activityList");
  for (let i = 0; i < recentActivity.length; i++) {
    const entry = recentActivity[i];
    const li = document.createElement("li");
    li.className = "activity-item";
    li.innerHTML =
      '<span>' + entry.text + '</span>' +
      '<span class="activity-time">' + entry.time + '</span>';
    list.appendChild(li);
  }
}
