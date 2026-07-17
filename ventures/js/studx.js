(function(){
  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Footer year ----
  document.getElementById('year').textContent = '© ' + new Date().getFullYear() + ' Vaia. All rights reserved.';

  // ---- Nav scroll state ----
  var nav = document.getElementById('siteNav');
  function onScroll(){
    if(window.scrollY > 12){ nav.classList.add('scrolled'); }
    else{ nav.classList.remove('scrolled'); }
  }
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // ---- Mobile menu ----
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  toggle.addEventListener('click', function(){
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  menu.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  // ---- Reveal on scroll ----
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.15, rootMargin:'0px 0px -40px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-item').forEach(function(item){
    var btn = item.querySelector('.faq-q');
    var answer = item.querySelector('.faq-a');
    btn.addEventListener('click', function(){
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function(openItem){
        if(openItem !== item){
          openItem.classList.remove('open');
          openItem.querySelector('.faq-q').setAttribute('aria-expanded','false');
          openItem.querySelector('.faq-a').style.maxHeight = null;
        }
      });
      if(isOpen){
        item.classList.remove('open');
        btn.setAttribute('aria-expanded','false');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('open');
        btn.setAttribute('aria-expanded','true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ---- Fare Estimator ----
  // PLACEHOLDER RATES — replace these values when live pricing is confirmed
  var VAIA_RATES = {
    base:   12.00,   // R  Base fare (fixed)
    perKm:   5.50,   // R  Per kilometre
    symbol: 'R'
  };

  function calcEstimate(km){
    return (VAIA_RATES.base + (parseFloat(km) * VAIA_RATES.perKm)).toFixed(2);
  }

  // Populate the pricing table
  document.querySelectorAll('.est-val[data-km]').forEach(function(cell){
    var km = parseFloat(cell.getAttribute('data-km'));
    cell.textContent = VAIA_RATES.symbol + ' ' + calcEstimate(km);
  });

  // Wire up the estimator card
  var estInput  = document.getElementById('estKmInput');
  var estSlider = document.getElementById('estSlider');
  var estOutput = document.getElementById('estOutput');

  function syncEstimator(km){
    km = Math.max(1, Math.min(50, parseFloat(km) || 1));
    estInput.value  = km;
    estSlider.value = km;
    estOutput.textContent = VAIA_RATES.symbol + ' ' + calcEstimate(km);
  }

  if(estInput && estSlider && estOutput){
    // Initial render
    syncEstimator(estInput.value);

    estInput.addEventListener('input', function(){ syncEstimator(this.value); });
    estInput.addEventListener('change', function(){ syncEstimator(this.value); });
    estSlider.addEventListener('input', function(){ syncEstimator(this.value); });
  }

  // ---- Tracking map: animate car dot along path ----
  var path = document.getElementById('routePath');
  var carDot = document.getElementById('carDot');
  if(path && carDot){
    var pathLength = path.getTotalLength();
    if(reduceMotion){
      var midPoint = path.getPointAtLength(pathLength * 0.5);
      carDot.setAttribute('cx', midPoint.x);
      carDot.setAttribute('cy', midPoint.y);
    } else {
      var duration = 5200; // ms, one-way
      var startTime = null;
      function animateCar(timestamp){
        if(!startTime) startTime = timestamp;
        var elapsed = (timestamp - startTime) % (duration * 2);
        var t = elapsed < duration ? elapsed / duration : (duration * 2 - elapsed) / duration;
        var point = path.getPointAtLength(pathLength * t);
        carDot.setAttribute('cx', point.x);
        carDot.setAttribute('cy', point.y);
        requestAnimationFrame(animateCar);
      }
      requestAnimationFrame(animateCar);
    }
  }

})();


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

  // ---- Fare Estimator ----
  // PLACEHOLDER RATES — replace these values when live pricing is confirmed
  var VAIA_RATES = {
    base: 12.0, // R  Base fare (fixed)
    perKm: 5.5, // R  Per kilometre
    symbol: "R",
  };

  function calcEstimate(km) {
    return (VAIA_RATES.base + parseFloat(km) * VAIA_RATES.perKm).toFixed(2);
  }

  // Populate the pricing table
  document.querySelectorAll(".est-val[data-km]").forEach(function (cell) {
    var km = parseFloat(cell.getAttribute("data-km"));
    cell.textContent = VAIA_RATES.symbol + " " + calcEstimate(km);
  });

  // Wire up the estimator card
  var estInput = document.getElementById("estKmInput");
  var estSlider = document.getElementById("estSlider");
  var estOutput = document.getElementById("estOutput");

  function syncEstimator(km) {
    km = Math.max(1, Math.min(50, parseFloat(km) || 1));
    estInput.value = km;
    estSlider.value = km;
    estOutput.textContent = VAIA_RATES.symbol + " " + calcEstimate(km);
  }

  if (estInput && estSlider && estOutput) {
    // Initial render
    syncEstimator(estInput.value);

    estInput.addEventListener("input", function () {
      syncEstimator(this.value);
    });
    estInput.addEventListener("change", function () {
      syncEstimator(this.value);
    });
    estSlider.addEventListener("input", function () {
      syncEstimator(this.value);
    });
  }

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