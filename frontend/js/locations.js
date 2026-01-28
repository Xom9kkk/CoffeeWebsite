document.addEventListener("DOMContentLoaded", () => {
    const locationItems = document.querySelectorAll(".location-item");
  
    locationItems.forEach(item => {
        const header = item.querySelector(".location-header");
  
        header.addEventListener("click", () => {
    
        locationItems.forEach(other => {
            if (other !== item) {
                other.classList.remove("active");
            }
            });
    
        item.classList.toggle("active");
      });
    });
});

const mapLinks = document.querySelectorAll(".map-link");

mapLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const locationItem = link.closest(".location-item");
    const address = locationItem.dataset.address;

    if (!address) return;

    const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}`;
    window.open(mapUrl, "_blank");
  });
});

document.addEventListener("DOMContentLoaded", () => {
    const locations = document.querySelectorAll(".location-item");
  
    function toMinutes(time) {
      const [h, m] = time.split(":").map(Number);
      return h * 60 + m;
    }
  
    function updateStatuses() {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
  
      locations.forEach(location => {
        const open = location.dataset.open;
        const close = location.dataset.close;
        const statusEl = location.querySelector(".status");
  
        if (!open || !close || !statusEl) return;
  
        const openMin = toMinutes(open);
        const closeMin = toMinutes(close);
  
        statusEl.className = "status";
  
        if (currentMinutes < openMin || currentMinutes >= closeMin) {
          statusEl.textContent = "Closed";
          statusEl.classList.add("closed");
        } else {
          const minutesLeft = closeMin - currentMinutes;
  
          if (minutesLeft <= 60) {
            statusEl.textContent = `Closing in ${minutesLeft} min`;
            statusEl.classList.add("closing");
          } else {
            statusEl.textContent = "Open now";
            statusEl.classList.add("open");
          }
        }
      });
    }
  
    updateStatuses();
  
    setInterval(updateStatuses, 60000);
  });
  