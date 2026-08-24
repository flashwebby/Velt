/* ============================================================
   VELT CATALOGUE CONTROLLER (SUPABASE-READY)
   ============================================================ */
(() => {
  // DOM Elements
  const catalogueGrid = document.getElementById("catalogue-grid");
  const searchInput = document.getElementById("catalogue-search");
  const sortSelect = document.getElementById("catalogue-sort");
  const categoryTabs = document.querySelectorAll(".category-tab");
  const resultsCountEl = document.getElementById("results-count");
  const emptyStateEl = document.getElementById("catalogue-empty");

  // Current Filter State
  const state = {
    category: "all",
    sort: "featured",
    search: "",
  };

  /**
   * Render Product Card HTML Template
   * @param {Object} product
   */
  const renderProductCard = (product) => {
    const isLocal = product.image.includes("Assets/");
    return `
      <article class="catalogue-card" data-id="${product.id}" data-category="${product.category}">
        <div class="card-media-wrap">
          <img 
            src="${product.image}" 
            alt="${product.title}" 
            loading="lazy" 
            class="${isLocal ? "local-product" : ""}" 
          />
          ${product.isNew ? '<span class="card-badge">NEW IN</span>' : ""}
          <button class="card-quick-add" data-id="${product.id}" aria-label="Add ${product.title} to Bag">
            <span>+ ADD TO BAG</span>
          </button>
        </div>
        <div class="card-meta">
          <div class="card-meta-top">
            <span class="card-category-label">${product.category.toUpperCase()}</span>
            <span class="card-season-label">${product.season || "S04"}</span>
          </div>
          <div class="card-meta-main">
            <h3 class="card-title">${product.title}</h3>
            <p class="card-price">${product.priceFormatted}</p>
          </div>
          <p class="card-description">${product.description}</p>
        </div>
      </article>
    `;
  };

  /**
   * Load and Render Products from Service
   */
  const loadProducts = async () => {
    if (!catalogueGrid) return;

    // Loading skeleton / fade
    catalogueGrid.style.opacity = "0.5";

    try {
      // Query Product Service (ready for Supabase)
      const products = await window.VeltProductService.getProducts({
        category: state.category,
        sort: state.sort,
        search: state.search,
      });

      catalogueGrid.style.opacity = "1";

      if (resultsCountEl) {
        resultsCountEl.textContent = `${products.length} PIECES`;
      }

      if (products.length === 0) {
        catalogueGrid.innerHTML = "";
        if (emptyStateEl) emptyStateEl.style.display = "flex";
        return;
      }

      if (emptyStateEl) emptyStateEl.style.display = "none";

      catalogueGrid.innerHTML = products.map(renderProductCard).join("");
    } catch (err) {
      console.error("Error loading products:", err);
      catalogueGrid.style.opacity = "1";
    }
  };

  /**
   * Update category tab badge counts
   */
  const updateCategoryCounts = () => {
    if (!window.VeltProductService) return;
    const counts = window.VeltProductService.getCategoryCounts();

    categoryTabs.forEach((tab) => {
      const cat = tab.getAttribute("data-category");
      const countSpan = tab.querySelector(".tab-count");
      if (countSpan && counts[cat] !== undefined) {
        countSpan.textContent = `(${counts[cat]})`;
      }
    });
  };

  /**
   * Event Listeners
   */
  // Category tabs
  categoryTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach((t) => t.classList.remove("is-active"));
      tab.classList.add("is-active");
      state.category = tab.getAttribute("data-category") || "all";
      loadProducts();
    });
  });

  // Search input with debounce
  let debounceTimeout;
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(debounceTimeout);
      debounceTimeout = setTimeout(() => {
        state.search = e.target.value;
        loadProducts();
      }, 250);
    });
  }

  // Sort dropdown
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      state.sort = e.target.value;
      loadProducts();
    });
  }

  // Grid Event Delegation for "ADD TO BAG" buttons
  if (catalogueGrid) {
    catalogueGrid.addEventListener("click", async (e) => {
      const addBtn = e.target.closest(".card-quick-add");
      if (!addBtn) return;

      const productId = addBtn.getAttribute("data-id");
      if (!productId) return;

      const product = await window.VeltProductService.getProductById(productId);
      if (!product) return;

      // Add to Bag using global VeltCart
      if (window.VeltCart) {
        window.VeltCart.addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          priceFormatted: product.priceFormatted,
          image: product.image,
          isLocal: product.image.includes("Assets/"),
        });
      }

      // Visual button feedback
      const prevText = addBtn.innerHTML;
      addBtn.innerHTML = `<span>ADDED ✓</span>`;
      addBtn.classList.add("is-added");
      setTimeout(() => {
        addBtn.innerHTML = prevText;
        addBtn.classList.remove("is-added");
      }, 1200);
    });
  }

  // Initial Load
  updateCategoryCounts();
  loadProducts();
})();

