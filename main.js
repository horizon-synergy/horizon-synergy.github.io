const footerPart = document.getElementById("footer-part");
const svgWave = document.querySelector(".wave-background svg");

function toggleTheme() {
  document.body.classList.toggle('light-mode');
  footerPart.classList.toggle('light-mode');
  svgWave.classList.toggle('light-mode');
}

function showSection(id) {
  const sections = document.querySelectorAll("main section");
  sections.forEach(section => {
    section.style.display = "none";
    section.classList.remove("fade-in");
  });

  const active = document.getElementById(id);
  if (active) {
    active.style.display = "block";
    setTimeout(() => {
      active.classList.add("fade-in");
    }, 10);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  showSection("about");

  document.querySelectorAll("nav a[href^='#']").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const id = this.getAttribute("href").substring(1);
      showSection(id);
      document.getElementById('sidebar').classList.remove('show');
    });
  });
});

function toggleMobileMenu() {
  const nav = document.getElementById('sidebar');
  nav.classList.toggle('show');
}

document.addEventListener('click', (event) => {
  const sidebar = document.getElementById('sidebar');
  const toggle = document.querySelector('.mobile-menu-toggle');

  if (
    sidebar.classList.contains('show') &&
    !sidebar.contains(event.target) &&
    !toggle.contains(event.target)
  ) {
    sidebar.classList.remove('show');
  }
});

