// Toggle between dark and light mode
function toggleTheme() {
  document.body.classList.toggle('light-mode');
}

// Toggle mobile menu visibility
function toggleMobileMenu() {
  const nav = document.getElementById('sidebar');
  nav.classList.toggle('show');

  // Add temporary listener to close when clicking outside
  document.addEventListener('click', function handler(e) {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    if (!nav.contains(e.target) && !toggleBtn.contains(e.target)) {
      nav.classList.remove('show');
      document.removeEventListener('click', handler);
    }
  });
}

// Close menu when clicking any nav link
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('show');
  });
});

