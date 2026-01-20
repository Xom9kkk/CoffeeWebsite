import { renderHome } from "../pages/home.js";
import { renderMenu } from "../pages/menu.js";
import { renderAbout } from "../pages/about.js";
import { renderContacts } from "../pages/contacts.js";

const routes = {
  "/": renderHome,
  "/menu": renderMenu,
  "/about": renderAbout,
  "/contacts": renderContacts
};

export function router() {
  const path = window.location.pathname;
  const page = routes[path] || renderHome;
  page();
}

export function enableLinks() {
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      history.pushState(null, "", e.target.href);
      router();
    }
  });
}
