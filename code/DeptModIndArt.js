const scrollContainer = document.querySelector(".scroll-wrapper");

function scrollLeft() {
    scrollContainer.scrollBy({ left: -300, behavior: "smooth" });
}

function scrollRight() {
    scrollContainer.scrollBy({ left: 300, behavior: "smooth" });
}
setInterval(() => {
    scrollRight();
}, 3000);  // Scrolls every 3 seconds
