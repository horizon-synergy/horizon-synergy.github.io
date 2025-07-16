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
    });
  });
});
