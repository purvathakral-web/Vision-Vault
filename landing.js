// ============================================
// LANDING.JS
// The landing page is mostly static marketing
// content, so this file only adds small dynamic
// touches that are easy to explain in a viva.
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  // Smooth scroll for the "See how it works" link
  document.documentElement.style.scrollBehavior = "smooth";

  // Keep the footer year correct automatically instead of hardcoding it
  const footer = document.querySelector(".site-footer");
  if (footer) {
    const currentYear = new Date().getFullYear();
    footer.textContent = "Built by students, for students. Vision Vault © " + currentYear;
  }
});
