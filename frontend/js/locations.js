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
  