export function renderMenuCard(title, price) {
    const list = document.getElementById("menu-list");
  
    list.innerHTML += `
      <div class="menu-card">
        <h3>${title}</h3>
        <p>${price} грн</p>
      </div>
    `;
  }
  