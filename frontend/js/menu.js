const hotDrinks = [
  {
    title: "Espresso",
    price: "8.00 zł",
    image: "/images/menu/espresso.jpg"
  },
  {
    title: "Americano",
    price: "9.00 zł",
    image: "/images/menu/americano.jpg"
  },
  {
    title: "Cappuccino",
    price: "11.00 zł",
    image: "/images/menu/cappuccino.jpg"
  },
  {
    title: "Latte",
    price: "12.00 zł",
    image: "/images/menu/latte.jpg"
  },
  {
    title: "Flat White",
    price: "13.00 zł",
    image: "/images/menu/flatwhite.jpg"
  },
  {
    title: "Citrus Raf Coffee",
    price: "14.50 zł",
    image: "/images/menu/raf.jpg"
  },
  {
    title: "Vanilla Raf",
    price: "14.50 zł",
    image: "/images/menu/vanilla-raf.jpg"
  },
  {
    title: "Mocha",
    price: "13.50 zł",
    image: "/images/menu/mocha.jpg"
  },
  {
    title: "Caramel Latte",
    price: "13.50 zł",
    image: "/images/menu/caramel-latte.jpg"
  },
  {
    title: "Hazelnut Latte",
    price: "13.50 zł",
    image: "/images/menu/hazelnut-latte.jpg"
  },
  {
    title: "Hot Chocolate",
    price: "12.00 zł",
    image: "/images/menu/hot-chocolate.jpg"
  }
];

const coldDrinks = [
  {
    title: "Iced Americano",
    price: "10.50 zł",
    image: "/images/menu/iced-americano.jpg"
  },
  {
    title: "Iced Latte",
    price: "12.50 zł",
    image: "/images/menu/iced-latte.jpg"
  },
  {
    title: "Cold Brew",
    price: "13.00 zł",
    image: "/images/menu/cold-brew.jpg"
  },
  {
    title: "Iced Mocha",
    price: "13.50 zł",
    image: "/images/menu/iced-mocha.jpg"
  },
  {
    title: "Matcha Latte (Iced)",
    price: "14.00 zł",
    image: "/images/menu/matcha-iced.jpg"
  }
];

const breakfasts = [
  {
    title: "Porridge",
    price: "18.50 zł",
    image: "/images/menu/breakfast1.jpg"
  },
  {
    title: "Cheese Pancakes",
    price: "19.90 zł",
    image: "/images/menu/breakfast2.jpg"
  },
  {
    title: "Croissant with Butter & Jam",
    price: "15.50 zł",
    image: "/images/menu/breakfast3.jpg"
  },
  {
    title: "Avocado Toast",
    price: "21.00 zł",
    image: "/images/menu/breakfast4.jpg"
  },
  {
    title: "Scrambled Eggs & Toast",
    price: "28.00 zł",
    image: "/images/menu/breakfast5.jpg"
  },
  {
    title: "Breakfast Set",
    price: "35.00 zł",
    image: "/images/menu/breakfast6.jpg"
  }
];


function render(items, containerId) {
  const container = document.getElementById(containerId);

  items.forEach(item => {
    container.innerHTML += `
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
    `;
  });
}

document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("order-btn")) return;
  
    const title = e.target.dataset.title;
    const price = e.target.dataset.price;
  
    alert(`✅ Added to order:\n${title} — ${price}`);
  });
  

render(hotDrinks, "hot-drinks");
render(coldDrinks, "cold-drinks");
render(breakfasts, "breakfasts");

