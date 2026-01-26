const menuContainer = document.getElementById("menu-container");

let menuData = []; 
let currentCategory = "all";
let currentSort = "default";
let cart = [];

async function loadMenuFromDB() {
  try {
    const res = await fetch("http://127.0.0.1:5000/api/menu");
    menuData = await res.json();
    renderMenu();
  } catch (err) {
    console.error("Failed to load menu:", err);
  }
}

function createCard(item) {
  return `
    <div class="menu-card">
      <img src="${item.image}" alt="${item.title}">
      <div class="menu-card-content">
        <h3>${item.title}</h3>
        <p class="menu-price">${item.price.toFixed(2)} zł</p>
        <button
          class="order-btn"
          data-id="${item.id}">
          Order
        </button>
      </div>
    </div>
  `;
}

function sortItems(items) {
  const sorted = [...items];

  if (currentSort === "asc") {
    sorted.sort((a, b) => a.price - b.price);
  }
  if (currentSort === "desc") {
    sorted.sort((a, b) => b.price - a.price);
  }

  return sorted;
}

function renderMenu() {
  let items = [...menuData];

  if (currentCategory !== "all") {
    items = items.filter(i => i.category === currentCategory);
  }

  items = sortItems(items);

  menuContainer.innerHTML = `
    <div class="cards-grid">
      ${items.map(createCard).join("")}
    </div>
  `;
}

document.querySelectorAll(".cat-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".cat-btn.active")?.classList.remove("active");
    btn.classList.add("active");

    currentCategory = btn.dataset.category;
    renderMenu();
  });
});

document.getElementById("sort").addEventListener("change", e => {
  currentSort = e.target.value;
  renderMenu();
});

function addToCart(productId) {
  const product = menuData.find(p => p.id == productId);
  if (!product) return;

  const item = cart.find(i => i.id === product.id);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      qty: 1
    });
  }

  saveCart();
  updateCartUI();
  showToast(`☕ ${product.title} added`);
}

document.addEventListener("click", e => {
  if (!e.target.classList.contains("order-btn")) return;
  addToCart(e.target.dataset.id);
});

function updateCartUI() {
  const list = document.getElementById("cart-items");
  const countEl = document.getElementById("cart-count");
  const totalEl = document.getElementById("cart-total");

  list.innerHTML = "";

  let total = 0;
  let count = 0;

  cart.forEach((item, index) => {
    total += item.price * item.qty;
    count += item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.title}</span>
      <div class="cart-controls">
        <button data-index="${index}" data-action="minus">−</button>
        <span>${item.qty}</span>
        <button data-index="${index}" data-action="plus">+</button>
        <button data-index="${index}" data-action="remove">✕</button>
      </div>
    `;
    list.appendChild(li);
  });

  countEl.textContent = count;
  totalEl.textContent = total.toFixed(2);
}

document.getElementById("cart-items").addEventListener("click", e => {
  const action = e.target.dataset.action;
  if (!action) return;

  const index = +e.target.dataset.index;
  const item = cart[index];

  if (action === "plus") item.qty += 1;
  if (action === "minus" && --item.qty <= 0) cart.splice(index, 1);
  if (action === "remove") cart.splice(index, 1);

  saveCart();
  updateCartUI();
});

function saveCart() {
  localStorage.setItem("coffee-cart", JSON.stringify(cart));
}

function loadCart() {
  const saved = localStorage.getItem("coffee-cart");
  if (saved) {
    cart = JSON.parse(saved);
    updateCartUI();
  }
}

function showToast(text) {
  const container = document.getElementById("toast-container");

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = text;

  container.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add("show"));

  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.add("hide");
  }, 3000);

  setTimeout(() => toast.remove(), 3300);
}

const cartBtn = document.getElementById("cart-toggle");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");

function openCart() {
  cartDrawer.classList.add("open");
  cartOverlay.classList.add("active");
  document.body.classList.add("no-scroll");
  cartBtn.classList.add("hidden");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartOverlay.classList.remove("active");
  document.body.classList.remove("no-scroll");
  cartBtn.classList.remove("hidden");
}

cartBtn.addEventListener("click", openCart);
cartOverlay.addEventListener("click", closeCart);

const checkoutBtn = document.querySelector(".checkout-btn");
const checkoutModal = document.getElementById("checkout-modal");
const checkoutOverlay = document.getElementById("checkout-overlay");
const checkoutCloseBtn = document.getElementById("checkout-close");

checkoutBtn.addEventListener("click", () => {
  checkoutModal.classList.add("open");
  checkoutOverlay.classList.add("active");
});

function closeCheckout() {
  checkoutModal.classList.remove("open");
  checkoutOverlay.classList.remove("active");
}

checkoutOverlay.addEventListener("click", closeCheckout);
checkoutCloseBtn.addEventListener("click", closeCheckout);

document.querySelector(".confirm-btn").addEventListener("click", async () => {
  if (!cart.length) {
    showToast("🛑 Cart is empty");
    return;
  }

  const payment = document.querySelector(
    'input[name="payment"]:checked'
  ).value;

  try {
    const res = await fetch("http://127.0.0.1:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cart,
        payment
      })
    });

    const data = await res.json();

    if (!data.success) {
      showToast("❌ Order failed");
      return;
    }

    showToast(`✅Your Order Confirmed`);

    cart = [];
    saveCart();
    updateCartUI();

    closeCheckout();
    closeCart();

  } catch (err) {
    console.error(err);
    showToast("⚠️ Server error");
  }
});


loadCart();
loadMenuFromDB();
