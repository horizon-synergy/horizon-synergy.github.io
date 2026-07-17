/* --- Navbar scroll state --- */
const navbar = document.getElementById("navbar");
window.addEventListener(
  "scroll",
  () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  },
  { passive: true },
);

/* --- Mobile menu --- */
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", isOpen);
  // Animate hamburger to X
  const spans = hamburger.querySelectorAll("span");
  if (isOpen) {
    spans[0].style.transform = "translateY(7px) rotate(45deg)";
    spans[1].style.opacity = "0";
    spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
  } else {
    spans.forEach((s) => {
      s.style.transform = "";
      s.style.opacity = "";
    });
  }
});

function closeMobileMenu() {
  mobileMenu.classList.remove("open");
  hamburger.setAttribute("aria-expanded", false);
  hamburger.querySelectorAll("span").forEach((s) => {
    s.style.transform = "";
    s.style.opacity = "";
  });
}

/* --- Scroll-triggered fade-in --- */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
);

document.querySelectorAll(".fade-up").forEach((el) => observer.observe(el));

/* --- Counter animations --- */
function animateCounter(el, target, duration = 1800) {
  const start = performance.now();
  const isFloat = String(target).includes(".");
  const increment = target / (duration / 16);

  const step = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(target * eased);

    if (isFloat) {
      el.textContent = (target * eased).toFixed(1);
    } else {
      el.textContent = current.toLocaleString();
    }

    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = isFloat ? target : target.toLocaleString();
  };
  requestAnimationFrame(step);
}

// Observer for stat counters
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      if (!isNaN(target)) animateCounter(el, target);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 },
);

document
  .querySelectorAll("[data-target]")
  .forEach((el) => counterObserver.observe(el));

// Why section counter
const whyCounters = document.querySelectorAll('[data-counter="true"]');
const whyCounterObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCounter(entry.target, 17);
      entry.target.parentElement.querySelector(".why-big-label").textContent =
        "students trading today";
      whyCounterObs.unobserve(entry.target);
    });
  },
  { threshold: 0.5 },
);
whyCounters.forEach((el) => whyCounterObs.observe(el));

/* --- FAQ accordion --- */
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const wasOpen = item.classList.contains("open");
    // Close all
    document.querySelectorAll(".faq-item.open").forEach((i) => {
      i.classList.remove("open");
      i.querySelector(".faq-question").setAttribute("aria-expanded", "false");
    });
    // Open clicked (unless it was already open)
    if (!wasOpen) {
      item.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });
});

/* --- Screenshots drag-scroll --- */
const track = document.getElementById("screenshotsTrack");
let isDragging = false,
  startX,
  scrollLeft;

track.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.pageX - track.offsetLeft;
  scrollLeft = track.scrollLeft;
  track.style.cursor = "grabbing";
});
track.addEventListener("mouseleave", () => {
  isDragging = false;
  track.style.cursor = "grab";
});
track.addEventListener("mouseup", () => {
  isDragging = false;
  track.style.cursor = "grab";
});
track.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  e.preventDefault();
  const x = e.pageX - track.offsetLeft;
  const walk = (x - startX) * 1.5;
  track.scrollLeft = scrollLeft - walk;
});

// Touch drag
track.addEventListener(
  "touchstart",
  (e) => {
    startX = e.touches[0].pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
  },
  { passive: true },
);
track.addEventListener(
  "touchmove",
  (e) => {
    const x = e.touches[0].pageX - track.offsetLeft;
    const walk = x - startX;
    track.scrollLeft = scrollLeft - walk;
  },
  { passive: true },
);

/* --- Smooth scroll for anchor links --- */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    const offset = 72; // navbar height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  });
});
