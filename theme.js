// ============================================
// THEME.JS — dark / light mode toggle
// This file is loaded on every page.
// It reads/writes localStorage so the theme
// choice survives a page reload or a new page.
// ============================================

// Run as soon as this script loads (before page fully renders)
// so we don't get a light-mode "flash" before switching to dark.
(function applySavedTheme() {
  const saved = localStorage.getItem("vv-theme"); // "dark" or "light" or null
  if (saved === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();

// Once the page has loaded, wire up the toggle button (if this page has one)
document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("themeToggle");
  if (!toggleBtn) return; // page might not have the button

  updateToggleIcon(toggleBtn);

  toggleBtn.addEventListener("click", function () {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("vv-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("vv-theme", "dark");
    }

    updateToggleIcon(toggleBtn);
  });
});

// Simple helper: swap the sun/moon icon based on current theme
function updateToggleIcon(btn) {
  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  btn.textContent = isDark ? "☀️" : "🌙";
}
