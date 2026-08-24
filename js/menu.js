/* Menu Sidebar & Client Services / Orders Management */
(() => {
  // DOM Elements
  const menuSidebar = document.getElementById("menu-sidebar");
  const menuBackdrop = document.getElementById("menu-backdrop");
  const menuCloseBtn = document.getElementById("menu-close-btn");
  const navMenuBtn = document.getElementById("nav-menu-btn");
  const ordersModal = document.getElementById("orders-modal");
  const ordersCloseBtn = document.getElementById("orders-close-btn");
  const yourOrdersBtn = document.getElementById("menu-your-orders-btn");
  const trackingForm = document.getElementById("order-tracking-form");
  const trackingResult = document.getElementById("tracking-result");

  const openMenu = () => {
    if (!menuSidebar) return;
    menuSidebar.classList.add("is-open");
    menuSidebar.setAttribute("aria-hidden", "false");
    if (menuBackdrop) {
      menuBackdrop.classList.add("is-open");
      menuBackdrop.setAttribute("aria-hidden", "false");
    }
    if (window.lenis && typeof window.lenis.stop === "function") {
      window.lenis.stop();
    }
  };

  const closeMenu = () => {
    if (!menuSidebar) return;
    menuSidebar.classList.remove("is-open");
    menuSidebar.setAttribute("aria-hidden", "true");
    if (menuBackdrop) {
      menuBackdrop.classList.remove("is-open");
      menuBackdrop.setAttribute("aria-hidden", "true");
    }
    if (window.lenis && typeof window.lenis.start === "function") {
      window.lenis.start();
    }
  };

  const openOrders = () => {
    closeMenu();
    if (!ordersModal) return;
    ordersModal.classList.add("is-open");
    ordersModal.setAttribute("aria-hidden", "false");
    if (menuBackdrop) {
      menuBackdrop.classList.add("is-open");
      menuBackdrop.setAttribute("aria-hidden", "false");
    }
    if (window.lenis && typeof window.lenis.stop === "function") {
      window.lenis.stop();
    }
  };

  const closeOrders = () => {
    if (!ordersModal) return;
    ordersModal.classList.remove("is-open");
    ordersModal.setAttribute("aria-hidden", "true");
    if (menuBackdrop) {
      menuBackdrop.classList.remove("is-open");
      menuBackdrop.setAttribute("aria-hidden", "true");
    }
    if (window.lenis && typeof window.lenis.start === "function") {
      window.lenis.start();
    }
  };

  // Event Listeners
  if (navMenuBtn) {
    navMenuBtn.addEventListener("click", () => {
      openMenu();
    });
  }

  if (menuCloseBtn) {
    menuCloseBtn.addEventListener("click", () => {
      closeMenu();
    });
  }

  if (menuBackdrop) {
    menuBackdrop.addEventListener("click", () => {
      closeMenu();
      closeOrders();
    });
  }

  if (yourOrdersBtn) {
    yourOrdersBtn.addEventListener("click", (e) => {
      e.preventDefault();
      openOrders();
    });
  }

  if (ordersCloseBtn) {
    ordersCloseBtn.addEventListener("click", () => {
      closeOrders();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (menuSidebar && menuSidebar.classList.contains("is-open")) closeMenu();
      if (ordersModal && ordersModal.classList.contains("is-open")) closeOrders();
    }
  });

  // Section links inside menu
  const menuNavLinks = document.querySelectorAll(".menu-nav-link");
  menuNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Order Tracking Form Submission
  if (trackingForm) {
    trackingForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("order-id-input");
      const orderId = input ? input.value.trim().toUpperCase() : "";

      if (!orderId) return;

      const submitBtn = trackingForm.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.textContent = "LOOKING UP...";
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        if (trackingResult) {
          trackingResult.innerHTML = `
            <div class="tracking-card">
              <div class="tracking-header">
                <span class="tracking-id">${orderId}</span>
                <span class="tracking-status-badge">IN TRANSIT</span>
              </div>
              <div class="tracking-timeline">
                <div class="timeline-step is-complete">
                  <div class="step-dot"></div>
                  <div class="step-info">
                    <p class="step-title">ORDER CONFIRMED</p>
                    <p class="step-date">AUG 22, 2026 — 14:32</p>
                  </div>
                </div>
                <div class="timeline-step is-complete">
                  <div class="step-dot"></div>
                  <div class="step-info">
                    <p class="step-title">TAILORED & DISPATCHED</p>
                    <p class="step-date">VELT STUDIO MUMBAI</p>
                  </div>
                </div>
                <div class="timeline-step is-active">
                  <div class="step-dot"></div>
                  <div class="step-info">
                    <p class="step-title">IN TRANSIT WITH COURIER</p>
                    <p class="step-date">ESTIMATED DELIVERY: AUG 26, 2026</p>
                  </div>
                </div>
              </div>
              <div class="tracking-items-summary">
                <p class="summary-label">PACKAGE CONTENTS:</p>
                <p class="summary-items">1x THE STRUCTURE COAT / SIZE M (CHARCOAL)</p>
              </div>
            </div>
          `;
          trackingResult.style.display = "block";
        }

        if (submitBtn) {
          submitBtn.textContent = "TRACK ORDER";
          submitBtn.disabled = false;
        }
      }, 600);
    });
  }
})();

