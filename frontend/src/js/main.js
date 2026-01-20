import "../css/main.css";

import { renderHeader } from "./components/header.js";
import { renderFooter } from "./components/footer.js";
import { router, enableLinks } from "./core/router.js";

renderHeader();
renderFooter();
router();
enableLinks();

window.addEventListener("popstate", router);
