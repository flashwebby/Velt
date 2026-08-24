/* Shopping Bag Sidebar & State Management */
(() => {
  const STORAGE_KEY = "velt_shopping_bag";

  // State
  let cart = [];
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) cart = JSON.parse(saved);
  } catch (e) {
    cart = [];
  }

  // DOM elements
  const bagSidebar = document.getElementById("bag-sidebar");
  const bagBackdrop = document.getElementById("bag-backdrop");
  const bagCloseBtn = document.getElementById("bag-close-btn");
  const navBagBtn = document.getElementById("nav-bag-btn");
  const bagItemsContainer = document.getElementById("bag-items");
  const bagSubtotalEl = document.getElementById("bag-subtotal");
  const bagCountHeader = document.getElementById("bag-count-header");
  const bagCheckoutBtn = document.getElementById("bag-checkout-btn");

  const saveCart = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {}
  };

  const getSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const getTotalCount = () => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  };

  const formatPrice = (num) => {
    return "₹ " + num.toLocaleString("en-IN");
  };

  const openBag = () => {
    if (!bagSidebar) return;
    bagSidebar.classList.add("is-open");
    bagSidebar.setAttribute("aria-hidden", "false");
    if (bagBackdrop) {
      bagBackdrop.classList.add("is-open");
      bagBackdrop.setAttribute("aria-hidden", "false");
    }
    if (window.lenis && typeof window.lenis.stop === "function") {
      window.lenis.stop();
    }
  };

  const closeBag = () => {
    if (!bagSidebar) return;
    bagSidebar.classList.remove("is-open");
    bagSidebar.setAttribute("aria-hidden", "true");
    if (bagBackdrop) {
      bagBackdrop.classList.remove("is-open");
      bagBackdrop.setAttribute("aria-hidden", "true");
    }
    if (window.lenis && typeof window.lenis.start === "function") {
      window.lenis.start();
    }
  };

  const renderCart = () => {
    const totalCount = getTotalCount();
    const subtotal = getSubtotal();

    // Update nav button text
    if (navBagBtn) {
      navBagBtn.textContent = `BAG (${totalCount})`;
    }
    if (bagCountHeader) {
      bagCountHeader.textContent = totalCount;
    }
    if (bagSubtotalEl) {
      bagSubtotalEl.textContent = formatPrice(subtotal);
    }

    if (bagCheckoutBtn) {
      bagCheckoutBtn.disabled = cart.length === 0;
    }

    if (!bagItemsContainer) return;

    if (cart.length === 0) {
      bagItemsContainer.innerHTML = `
        <div class="bag-empty">
          <p class="bag-empty-eyebrow">00 / EMPTY FORM</p>
          <h3 class="bag-empty-title">YOUR BAG IS<br>EMPTY</h3>
          <p class="bag-empty-desc">Pieces selected from the collection will appear here for your review.</p>
          <a href="#collection" class="bag-empty-link" id="bag-empty-discover">
            EXPLORE THE EDIT <span>↗</span>
          </a>
        </div>
      `;
      const discoverLink = document.getElementById("bag-empty-discover");
      if (discoverLink) {
        discoverLink.addEventListener("click", () => {
          closeBag();
        });
      }
      return;
    }

    bagItemsContainer.innerHTML = cart
      .map(
        (item) => `
      <div class="bag-item" data-id="${item.id}">
        <div class="bag-item-img-wrap">
          <img src="${item.image}" alt="${item.title}" class="${item.isLocal ? "local-product" : ""}" />
        </div>
        <div class="bag-item-info">
          <div class="bag-item-top">
            <h3 class="bag-item-name">${item.title}</h3>
            <button class="bag-item-remove" data-id="${item.id}" aria-label="Remove ${item.title}">REMOVE</button>
          </div>
          <p class="bag-item-unit-price">${formatPrice(item.price)}</p>
          <div class="bag-item-bottom">
            <div class="bag-qty-control">
              <button class="bag-qty-btn decrease-qty" data-id="${item.id}" aria-label="Decrease quantity">−</button>
              <span class="bag-qty-value">${item.quantity}</span>
              <button class="bag-qty-btn increase-qty" data-id="${item.id}" aria-label="Increase quantity">+</button>
            </div>
            <p class="bag-item-total-price">${formatPrice(item.price * item.quantity)}</p>
          </div>
        </div>
      </div>
    `,
      )
      .join("");
  };

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
    renderCart();
    openBag();
  };

  const updateQuantity = (id, delta) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter((i) => i.id !== id);
    }
    saveCart();
    renderCart();
  };

  const removeFromCart = (id) => {
    cart = cart.filter((i) => i.id !== id);
    saveCart();
    renderCart();
  };

  // Event Listeners
  if (navBagBtn) {
    navBagBtn.addEventListener("click", () => {
      openBag();
    });
  }

  if (bagCloseBtn) {
    bagCloseBtn.addEventListener("click", () => {
      closeBag();
    });
  }

  if (bagBackdrop) {
    bagBackdrop.addEventListener("click", () => {
      closeBag();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && bagSidebar && bagSidebar.classList.contains("is-open")) {
      closeBag();
    }
  });

  // Quantity and Remove button delegation
  if (bagItemsContainer) {
    bagItemsContainer.addEventListener("click", (e) => {
      const target = e.target;
      const removeBtn = target.closest(".bag-item-remove");
      if (removeBtn) {
        const id = removeBtn.getAttribute("data-id");
        if (id) removeFromCart(id);
        return;
      }

      const decreaseBtn = target.closest(".decrease-qty");
      if (decreaseBtn) {
        const id = decreaseBtn.getAttribute("data-id");
        if (id) updateQuantity(id, -1);
        return;
      }

      const increaseBtn = target.closest(".increase-qty");
      if (increaseBtn) {
        const id = increaseBtn.getAttribute("data-id");
        if (id) updateQuantity(id, 1);
        return;
      }
    });
  }

  // Checkout button simulation
  if (bagCheckoutBtn) {
    bagCheckoutBtn.addEventListener("click", () => {
      if (cart.length === 0) return;
      const originalText = bagCheckoutBtn.innerHTML;
      bagCheckoutBtn.innerHTML = `PROCESSING...`;
      bagCheckoutBtn.disabled = true;
      setTimeout(() => {
        alert(`Order simulated for ${getTotalCount()} item(s) totaling ${formatPrice(getSubtotal())}!\nThank you for choosing VELT.`);
        cart = [];
        saveCart();
        renderCart();
        bagCheckoutBtn.innerHTML = originalText;
        bagCheckoutBtn.disabled = false;
        closeBag();
      }, 700);
    });
  }

  // Setup Product Card "ADD TO CART" buttons
  const setupProductCards = () => {
    const cards = document.querySelectorAll(".product-card");
    cards.forEach((card) => {
      const img = card.querySelector("img");
      const titleEl = card.querySelector(".product-meta h3");
      const priceEl = card.querySelector(".product-meta p");
      const addBtn = card.querySelector(".product-meta button");

      if (!addBtn || !titleEl || !priceEl) return;

      const title = titleEl.textContent.trim();
      const rawPrice = priceEl.textContent.replace(/[^\d]/g, "");
      const price = parseInt(rawPrice, 10) || 0;
      const image = img ? img.getAttribute("src") : "";
      const isLocal = img ? img.classList.contains("local-product") : false;
      const id = "prod_" + title.toLowerCase().replace(/[^a-z0-9]/g, "_");

      addBtn.addEventListener("click", () => {
        addToCart({
          id,
          title,
          price,
          priceFormatted: priceEl.textContent.trim(),
          image,
          isLocal,
        });

        // Visual button feedback
        const prevText = addBtn.textContent;
        addBtn.textContent = "ADDED ✓";
        addBtn.classList.add("is-added");
        setTimeout(() => {
          addBtn.textContent = prevText;
          addBtn.classList.remove("is-added");
        }, 1200);
      });
    });
  };

  setupProductCards();
  renderCart();
})();
