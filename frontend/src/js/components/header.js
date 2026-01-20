export function renderHeader() {
    document.getElementById("header").innerHTML = `
      <nav class="nav">
        <a href="/" data-link>Home</a>
        <a href="/menu" data-link>Menu</a>
        <a href="/about" data-link>About</a>
        <a href="/contacts" data-link>Contacts</a>
      </nav>
    `;
  }
  