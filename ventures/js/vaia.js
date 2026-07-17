(function () {
  "use strict";

  var reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  // ---- Footer year ----
  document.getElementById("year").textContent =
    "© " + new Date().getFullYear() + " Vaia. All rights reserved.";

  // ---- Nav scroll state ----
  var nav = document.getElementById("siteNav");
  function onScroll() {
    if (window.scrollY > 12) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ---- Mobile menu ----
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("mobileMenu");
  toggle.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  menu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });

  // ---- Reveal on scroll ----
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    revealEls.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("in-view");
    });
  }

  // ---- FAQ accordion ----
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var answer = item.querySelector(".faq-a");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem
            .querySelector(".faq-q")
            .setAttribute("aria-expanded", "false");
          openItem.querySelector(".faq-a").style.maxHeight = null;
        }
      });
      if (isOpen) {
        item.classList.remove("open");
        btn.setAttribute("aria-expanded", "false");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  // ---- Tracking map: animate car dot along path ----
  var path = document.getElementById("routePath");
  var carDot = document.getElementById("carDot");
  if (path && carDot) {
    var pathLength = path.getTotalLength();
    if (reduceMotion) {
      var midPoint = path.getPointAtLength(pathLength * 0.5);
      carDot.setAttribute("cx", midPoint.x);
      carDot.setAttribute("cy", midPoint.y);
    } else {
      var duration = 5200; // ms, one-way
      var startTime = null;
      function animateCar(timestamp) {
        if (!startTime) startTime = timestamp;
        var elapsed = (timestamp - startTime) % (duration * 2);
        var t =
          elapsed < duration
            ? elapsed / duration
            : (duration * 2 - elapsed) / duration;
        var point = path.getPointAtLength(pathLength * t);
        carDot.setAttribute("cx", point.x);
        carDot.setAttribute("cy", point.y);
        requestAnimationFrame(animateCar);
      }
      requestAnimationFrame(animateCar);
    }
  }
})();
