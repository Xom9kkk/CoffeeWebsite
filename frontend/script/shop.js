let products = [];
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const grid = document.getElementById("shopGrid");

const cartToggle = document.getElementById("cart-toggle");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");

const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");

const categoryButtons = document.querySelectorAll(".cat-btn");
const sortSelect = document.getElementById("sort");

const checkoutBtn = document.querySelector(".checkout-btn");
const checkoutModal = document.getElementById("checkout-modal");
const checkoutOverlay = document.getElementById("checkout-overlay");
const checkoutClose = document.getElementById("checkout-close");
const confirmBtn = document.querySelector(".confirm-btn");


document.addEventListener("DOMContentLoaded", () => {
  bindUI();
  loadProducts();
  renderCart();
});

function bindUI() {

  cartToggle.onclick = () => {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("active");
  };

  cartOverlay.onclick = closeDrawer;

  function closeDrawer() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("active");
  }

  categoryButtons.forEach(btn => {
    btn.onclick = () => {
      document.querySelector(".cat-btn.active")?.classList.remove("active");
      btn.classList.add("active");
      renderProducts(btn.dataset.category, sortSelect.value);
    };
  });

  sortSelect.onchange = () => {
    renderProducts(
      document.querySelector(".cat-btn.active").dataset.category,
      sortSelect.value
    );
  };

  checkoutBtn.onclick = openCheckout;
  checkoutOverlay.onclick = closeCheckout;
  checkoutClose.onclick = closeCheckout;
  confirmBtn.onclick = checkout;
}

function openCheckout() {
  checkoutModal.classList.add("open");
  checkoutOverlay.classList.add("active");
}

function closeCheckout() {
  checkoutModal.classList.remove("open");
  checkoutOverlay.classList.remove("active");
}

async function loadProducts() {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/products");
    products = await res.json();
    renderProducts();
  } catch (e) {
    console.error("Products load failed", e);
  }
}

function renderProducts(filter = "all", sort = "default") {

  grid.innerHTML = "";

  let list = products.filter(p =>
    filter === "all" || p.category === filter
  );

  if (sort === "asc") list.sort((a, b) => a.price - b.price);
  if (sort === "desc") list.sort((a, b) => b.price - a.price);

  list.forEach(product => {

    const card = document.createElement("div");
    card.className = "menu-card";

    card.innerHTML = `
      <img src="${product.image}">
      <div class="menu-card-content">
        <h3>${product.name}</h3>
        <span class="menu-price">${product.price} zł</span>
        <button class="order-btn">Add to cart</button>
      </div>
    `;

    card.querySelector(".order-btn").onclick = () => addToCart(product.id);
    grid.appendChild(card);
  });
}

function addToCart(id) {

  const product = products.find(p => p.id === id);
  if (!product) return;

  const item = cart.find(i => i.id === id);

  if (item) {
    item.qty++;
    showToast(`${product.name} quantity increased 🛒`);
  } else {
    cart.push({ ...product, qty: 1 });
    showToast(`${product.name} added to cart 🛒`);
  }

  saveCart();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function renderCart() {

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {

    total += item.price * item.qty;

    const li = document.createElement("li");

    li.innerHTML = `
      <span>${item.name}</span>
      <div class="cart-controls">
        <button data-action="minus">−</button>
        <span>${item.qty}</span>
        <button data-action="plus">+</button>
        <button data-action="remove">✕</button>
      </div>
    `;

    li.querySelector("[data-action='minus']").onclick = () => {
      item.qty--;
      if (item.qty <= 0) removeItem(item.id);
      saveCart();
    };

    li.querySelector("[data-action='plus']").onclick = () => {
      item.qty++;
      saveCart();
    };

    li.querySelector("[data-action='remove']").onclick = () => {
      removeItem(item.id);
      saveCart();
    };

    cartItems.appendChild(li);
  });

  cartCount.textContent = cart.reduce((sum, i) => sum + i.qty, 0);
  cartTotal.textContent = total.toFixed(2);
}

function removeItem(id) {
  cart = cart.filter(i => i.id !== id);
}

async function checkout() {

  if (!cart.length) {
    showToast("Cart is empty ❌");
    return;
  }

  const payment =
    document.querySelector("input[name='payment']:checked").value;

  const payload = {
    cart: cart.map(i => ({
      id: i.id,
      title: i.name,
      price: i.price,
      qty: i.qty
    })),
    payment
  };

  try {
    const res = await fetch("http://127.0.0.1:5000/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (data.success) {
      showToast(`Order #${data.order_id} created 🎉`);
      cart = [];
      saveCart();
      closeCheckout();
      cartDrawer.classList.remove("open");
      cartOverlay.classList.remove("active");
    }

  } catch (e) {
    console.error(e);
    showToast("Server error ❌");
  }
}

function showToast(text) {

  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = text;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
  }, 2000);

  setTimeout(() => toast.remove(), 2400);
}
