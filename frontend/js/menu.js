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

const categories = {
    hot: hotDrinks,
    cold: coldDrinks,
    seasonal: seasonalDrinks,
    tea: teaAndOther,
    smoothies: smoothies,
    breakfasts: breakfasts
};

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
  
        <button 
            class="order-btn"
            data-title="${item.title}"
            data-price="${item.price}">
            Order
        </button>
        </div>
    </div>
`;}
  

function renderSection(title, items) {
    let sortedItems = [...items];
  
    if (currentSort === "asc") {
        sortedItems.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }
    if (currentSort === "desc") {
        sortedItems.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
  
    let cardsHTML = sortedItems.map(createCard).join("");
  
    return `
        <section class="menu-section">
            <h2 class="menu-section-title">${title}</h2>
            <div class="cards-grid">
            ${cardsHTML}
            </div>
        </section>
    `;
}

function render() {
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
        document.querySelector(".cat-btn.active").classList.remove("active");
        btn.classList.add("active");
  
        currentCategory = btn.dataset.category;
        render();
    });
});
  
document.getElementById("sort").addEventListener("change", e => {
    currentSort = e.target.value;
    render();
});

document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("order-btn")) return;
  
    const title = e.target.dataset.title;
    const price = e.target.dataset.price;
  
    addToOrder(title, price);
});  

function addToOrder(title, price) {
    const numericPrice = parseFloat(price);
  
    const existingItem = cart.find(item => item.title === title);
  
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({
            title,
            price: numericPrice,
            qty: 1
      });
    }

    saveCart();
    updateCartUI();
    showToast(`☕ ${title} added`);
}
  
function showToast(text) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = text;
  
    document.body.appendChild(toast);
  
    requestAnimationFrame(() => toast.classList.add("show"));
  
    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function updateCartCount() {
    document.getElementById("cart-count").textContent = cart.length;
}  

function updateCartUI() {
    const countEl = document.getElementById("cart-count");
    const totalEl = document.getElementById("cart-total");
    const listEl = document.getElementById("cart-items");
  
    listEl.innerHTML = "";
  
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
    listEl.appendChild(li);
});
  
    countEl.textContent = count;
    totalEl.textContent = total.toFixed(2);
}

document.getElementById("cart-items").addEventListener("click", e => {
    const btn = e.target;
    if (!btn.dataset.action) return;
  
    const index = +btn.dataset.index;
    const item = cart[index];
  
    if (btn.dataset.action === "plus") {
        item.qty += 1;
    }
  
    if (btn.dataset.action === "minus") {
        item.qty -= 1;
        if (item.qty <= 0) cart.splice(index, 1);
    }
  
    if (btn.dataset.action === "remove") {
        cart.splice(index, 1);
    }

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

const cartToggle = document.getElementById("cart-toggle");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartClose = document.getElementById("cart-close");

cartToggle.addEventListener("click", openCart);
cartOverlay.addEventListener("click", closeCart);
cartClose.addEventListener("click", closeCart);

function openCart() {
    cartDrawer.classList.add("open");
    cartOverlay.classList.add("active");
}

function closeCart() {
    cartDrawer.classList.remove("open");
    cartOverlay.classList.remove("active");
}

loadCart();
render();
  
