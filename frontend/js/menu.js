const menu = [
    { title: "Latte", price: 120 },
    { title: "Cappuccino", price: 110 },
    { title: "Espresso", price: 90 },
  ];
  
  const list = document.getElementById("menu-list");
  
  menu.forEach(item => {
    const card = document.createElement("div");
    card.className = "menu-card";
    card.innerHTML = `<h3>${item.title}</h3><p>${item.price} грн</p>`;
    list.appendChild(card);
  });
  