// Зробити з цього дата базу(витягувати данні с дефолт файла і закидувати в сайт)
const hotDrinks = [
  { title: "Espresso", price: "8.00 zł", image: "/images/menu/espresso.jpg" },
  { title: "Americano", price: "9.00 zł", image: "/images/menu/americano.jpg" },
  { title: "Cappuccino", price: "11.00 zł", image: "/images/menu/cappuccino.jpg" },
  { title: "Latte", price: "12.00 zł", image: "/images/menu/latte.jpg" },
  { title: "Flat White", price: "13.00 zł", image: "/images/menu/flatwhite.jpg" },
  { title: "Citrus Raf Coffee", price: "14.50 zł", image: "/images/menu/raf.jpg" },
  { title: "Vanilla Raf", price: "14.50 zł", image: "/images/menu/vanilla-raf.jpg" },
  { title: "Mocha", price: "13.50 zł", image: "/images/menu/mocha.jpg" },
  { title: "Caramel Latte", price: "13.50 zł", image: "/images/menu/caramel-latte.jpg" },
  { title: "Hazelnut Latte", price: "13.50 zł", image: "/images/menu/hazelnut-latte.jpg" },
  { title: "Hot Chocolate", price: "12.00 zł", image: "/images/menu/hot-chocolate.jpg" }
];

const coldDrinks = [
  { title: "Iced Americano", price: "10.50 zł", image: "/images/menu/iced-americano.jpg" },
  { title: "Iced Latte", price: "12.50 zł", image: "/images/menu/iced-latte.jpg" },
  { title: "Cold Brew", price: "13.00 zł", image: "/images/menu/cold-brew.jpg" },
  { title: "Iced Mocha", price: "13.50 zł", image: "/images/menu/iced-mocha.jpg" },
  { title: "Matcha Latte (Iced)", price: "14.00 zł", image: "/images/menu/matcha-iced.jpg" }
];

const seasonalDrinks = [
  { title: "Pumpkin Spice Latte", price: "15.50 zł", image: "/images/menu/seasonal1.jpg" },
  { title: "Gingerbread Latte", price: "15.00 zł", image: "/images/menu/seasonal2.jpg" },
  { title: "Orange Cocoa", price: "13.50 zł", image: "/images/menu/seasonal3.jpg" },
  { title: "Winter Berry Tea", price: "12.50 zł", image: "/images/menu/seasonal4.jpg" }
];

const teaAndOther = [
  { title: "Black Tea", price: "8.00 zł", image: "/images/menu/tea1.jpg" },
  { title: "Green Tea", price: "8.50 zł", image: "/images/menu/tea2.jpg" },
  { title: "Herbal Tea", price: "9.00 zł", image: "/images/menu/tea3.jpg" },
  { title: "Matcha Latte (Hot)", price: "14.00 zł", image: "/images/menu/matcha-latte.jpg" },
  { title: "Fresh Orange Juice", price: "12.00 zł", image: "/images/menu/juice1.jpg" }
];

const smoothies = [
  { title: "Berry Smoothie", price: "16.00 zł", image: "/images/menu/smoothie1.jpg" },
  { title: "Mango Smoothie", price: "16.50 zł", image: "/images/menu/smoothie2.jpg" },
  { title: "Banana Smoothie", price: "17.00 zł", image: "/images/menu/smoothie3.jpg" }
];

const breakfasts = [
  { title: "Porridge", price: "18.50 zł", image: "/images/menu/breakfast1.jpg" },
  { title: "Cheese Pancakes", price: "19.90 zł", image: "/images/menu/breakfast2.jpg" },
  { title: "Croissant with Butter & Jam", price: "15.50 zł", image: "/images/menu/breakfast3.jpg" },
  { title: "Avocado Toast", price: "21.00 zł", image: "/images/menu/breakfast4.jpg" },
  { title: "Scrambled Eggs & Toast", price: "28.00 zł", image: "/images/menu/breakfast5.jpg" },
  { title: "Breakfast Set", price: "35.00 zł", image: "/images/menu/breakfast6.jpg" }
];

const menuContainer = document.getElementById("menu-container");

let currentCategory = "all";
let currentSort = "default";
let cart = [];

function createCard(item) {
  return `
    <div class="menu-card">
      <img src="${item.image}" alt="${item.title}">
      <div class="menu-card-content">
        <h3>${item.title}</h3>
        <p class="menu-price">${item.price}</p>
        <button class="order-btn"
          data-title="${item.title}"
          data-price="${item.price}">
          Order
        </button>
      </div>
    </div>
  `;
}

function sortItems(items) {
  const sorted = [...items];

  if (currentSort === "asc") {
    sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
  }

  if (currentSort === "desc") {
    sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
  }

  return sorted;
}

function renderSection(title, items) {
  const sortedItems = sortItems(items);

  return `
    <section class="menu-section">
      <h2 class="menu-section-title">${title}</h2>
      <div class="cards-grid">
        ${sortedItems.map(createCard).join("")}
      </div>
    </section>
  `;
}

function renderMenu() {
  menuContainer.innerHTML = "";

  if (currentCategory === "all") {
    menuContainer.innerHTML += renderSection("Hot Drinks", hotDrinks);
    menuContainer.innerHTML += renderSection("Cold Drinks", coldDrinks);
    menuContainer.innerHTML += renderSection("Seasonal Drinks", seasonalDrinks);
    menuContainer.innerHTML += renderSection("Tea & Other", teaAndOther);
    menuContainer.innerHTML += renderSection("Smoothies", smoothies);
    menuContainer.innerHTML += renderSection("Breakfasts", breakfasts);
    return;
  }

  const map = {
    hot: ["Hot Drinks", hotDrinks],
    cold: ["Cold Drinks", coldDrinks],
    seasonal: ["Seasonal Drinks", seasonalDrinks],
    tea: ["Tea & Other", teaAndOther],
    smoothies: ["Smoothies", smoothies],
    breakfasts: ["Breakfasts", breakfasts],
  };

  const [title, items] = map[currentCategory];
  menuContainer.innerHTML = renderSection(title, items);
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


function addToCart(title, price) {
  const numericPrice = parseFloat(price);
  const item = cart.find(i => i.title === title);

  if (item) {
    item.qty += 1;
  } else {
    cart.push({ title, price: numericPrice, qty: 1 });
  }

  saveCart();
  updateCartUI();
  showToast(`☕ ${title} added`);
}

document.addEventListener("click", e => {
  if (!e.target.classList.contains("order-btn")) return;
  addToCart(e.target.dataset.title, e.target.dataset.price);
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


document.querySelector(".confirm-btn").addEventListener("click", () => {
  if (!cart.length) {
    showToast("🛑 Cart is empty");
    return;
  }

  showToast("✅ Order confirmed. Thank you!");

  cart = [];
  saveCart();
  updateCartUI();

  closeCheckout();
  closeCart();
});


loadCart();
renderMenu();

