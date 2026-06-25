/* =========================================================
        TEXUVO WEBSITE VERSION 5.1 (Fixed)
========================================================= */


/* =======================================
        Sticky Navigation
======================================= */

const navbar = document.getElementById("navbar");

if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  });
}


/* =======================================
        Mobile Menu
======================================= */

const menuToggle = document.getElementById("menu-toggle");
const navigation = document.querySelector(".navigation");

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    navigation.classList.toggle("active");
    menuToggle.classList.toggle("active");
  });

  // FIX: Close menu when a nav link is clicked (mobile UX)
  document.querySelectorAll(".navigation a").forEach(link => {
    link.addEventListener("click", () => {
      navigation.classList.remove("active");
      menuToggle.classList.remove("active");
    });
  });
}


/* =======================================
        Smooth Scroll
======================================= */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});


/* =======================================
        Back To Top
        FIX: Added null check before attaching listener
======================================= */

const backToTop = document.getElementById("backToTop");

if (backToTop) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}


/* =======================================
        Reveal Animation
======================================= */

const revealSections = document.querySelectorAll(".section");

const revealOnScroll = () => {
  const trigger = window.innerHeight * 0.88;
  revealSections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < trigger) {
      section.classList.add("active");
    }
  });
};

// Run on load to activate any already-visible sections
window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // initial check


/* =======================================
        Counter Animation
        FIX: Used getBoundingClientRect() for reliable trigger;
             Skip non-numeric stat boxes (e.g. "Pan India", "B2B")
======================================= */

const counters = document.querySelectorAll(".stat-box h2");
let counterStarted = false;

const startCounters = () => {
  const statsSection = document.querySelector(".quick-stats");
  if (!statsSection || counterStarted) return;

  const rect = statsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight * 0.9) {
    counterStarted = true;

    counters.forEach(counter => {
      const originalText = counter.innerText.trim();
      const numericMatch = originalText.match(/(\d+)/);

      // FIX: Skip non-numeric stats like "Pan India" or "B2B"
      if (!numericMatch) return;

      const target = parseInt(numericMatch[1], 10);
      const suffix = originalText.replace(/\d+/, "").trim(); // e.g. "+" or "%"
      let current = 0;
      const increment = Math.ceil(target / 80);

      const update = () => {
        current = Math.min(current + increment, target);
        counter.innerText = current + suffix;
        if (current < target) {
          setTimeout(update, 25);
        }
      };

      counter.innerText = "0" + suffix;
      update();
    });
  }
};

window.addEventListener("scroll", startCounters);
startCounters(); // initial check in case stats already visible


/* =======================================
        Contact Form
======================================= */

const form = document.getElementById("queryForm");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thank you for contacting Texuvo. Our team will get back to you shortly.");
    form.reset();
  });
}


/* =======================================
        Footer Year
======================================= */

const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.innerHTML = new Date().getFullYear();
}


/* =======================================
        Console Branding
======================================= */

console.log(
  "%cWelcome to TEXUVO",
  "color:green;font-size:24px;font-weight:bold"
);

console.log(
  "%cReliable Waste Sourcing for Circular Economy Solutions",
  "font-size:14px"
);
