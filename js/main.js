/* ============================================================
   TEXUVO RECYCLING SOLUTION PVT. LTD.
   Main JavaScript — main.js
   ============================================================ */

"use strict";

/* ─── DOM READY ─────────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initMobileMenu();
  initReveal();
  initLoginModal();
  initQueryForm();
  initActiveNavLinks();
  initCounters();
});


/* ─── 1. NAVBAR — sticky scroll effect ──────────────────── */
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // run on load
}


/* ─── 2. MOBILE MENU ─────────────────────────────────────── */
function initMobileMenu() {
  const ham   = document.getElementById("hamburger");
  const menu  = document.getElementById("mobile-menu");
  if (!ham || !menu) return;

  ham.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    ham.classList.toggle("open", isOpen);
    ham.setAttribute("aria-expanded", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  // Close on link click
  menu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      ham.classList.remove("open");
      ham.setAttribute("aria-expanded", false);
      document.body.style.overflow = "";
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !ham.contains(e.target)) {
      menu.classList.remove("open");
      ham.classList.remove("open");
      document.body.style.overflow = "";
    }
  });
}


/* ─── 3. REVEAL ON SCROLL ────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  els.forEach(el => observer.observe(el));
}


/* ─── 4. LOGIN MODAL ─────────────────────────────────────── */
function initLoginModal() {
  const overlay      = document.getElementById("loginModal");
  const openBtns     = document.querySelectorAll("[data-open-login]");
  const closeBtn     = document.getElementById("modalClose");
  const tabs         = document.querySelectorAll(".modal-tab");
  const panels       = document.querySelectorAll(".login-panel");
  const loginForm    = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (!overlay) return;

  // Open
  openBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  // Close
  const closeModal = () => {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Tab switching
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      const target = document.getElementById(tab.dataset.panel);
      if (target) target.classList.add("active");
    });
  });

  // Login submit
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = loginForm.querySelector("[name=email]").value.trim();
      const pass  = loginForm.querySelector("[name=password]").value;

      if (!email || !pass) {
        showToast("Please fill in all fields.", "error");
        return;
      }

      // Simulate login (replace with real auth)
      showToast("Welcome back! Logging you in…", "success");
      setTimeout(closeModal, 1200);
    });
  }

  // Register submit
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name  = registerForm.querySelector("[name=reg_name]").value.trim();
      const email = registerForm.querySelector("[name=reg_email]").value.trim();
      const phone = registerForm.querySelector("[name=reg_phone]").value.trim();
      const pass  = registerForm.querySelector("[name=reg_password]").value;

      if (!name || !email || !phone || !pass) {
        showToast("Please complete all fields.", "error");
        return;
      }

      if (pass.length < 8) {
        showToast("Password must be at least 8 characters.", "error");
        return;
      }

      showToast("Account created! We'll be in touch soon.", "success");
      setTimeout(closeModal, 1500);
    });
  }
}


/* ─── 5. QUERY / CONTACT FORM ───────────────────────────── */
function initQueryForm() {
  const form = document.getElementById("queryForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name    = form.querySelector("[name=q_name]").value.trim();
    const phone   = form.querySelector("[name=q_phone]").value.trim();
    const email   = form.querySelector("[name=q_email]").value.trim();
    const role    = form.querySelector("[name=q_role]").value;
    const material= form.querySelector("[name=q_material]").value;
    const msg     = form.querySelector("[name=q_message]").value.trim();

    if (!name || !phone) {
      showToast("Name and phone are required.", "error");
      return;
    }

    // Build WhatsApp message
    const waText = [
      `*New Query — Texuvo Recycling*`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "Not provided"}`,
      `Role: ${role || "Not specified"}`,
      `Material: ${material || "Not specified"}`,
      `Message: ${msg || "—"}`,
    ].join("\n");

    const waURL = `https://wa.me/919311503676?text=${encodeURIComponent(waText)}`;
    window.open(waURL, "_blank");

    showToast("Opening WhatsApp with your message…", "success");
    form.reset();
  });
}


/* ─── 6. ACTIVE NAV LINKS on scroll ─────────────────────── */
function initActiveNavLinks() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
  if (!sections.length || !navLinks.length) return;

  const setActive = () => {
    let current = "";
    sections.forEach(sec => {
      if (window.scrollY >= sec.offsetTop - 120) {
        current = sec.id;
      }
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  };

  window.addEventListener("scroll", setActive, { passive: true });
  setActive();
}


/* ─── 7. COUNTER ANIMATION ───────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const suffix = el.dataset.suffix || "";
      const duration = 1600;
      const start  = performance.now();

      const step = (now) => {
        const elapsed  = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}


/* ─── TOAST HELPER ───────────────────────────────────────── */
function showToast(message, type = "default") {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.className   = `show ${type}`;

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.className = "";
  }, 3200);
}

/* expose globally so inline onclick= still works */
window.showToast = showToast;
