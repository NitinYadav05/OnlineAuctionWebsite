document.addEventListener("DOMContentLoaded", () => {
    // ✅ Login Modal
    const loginBtn = document.querySelector(".login-btn");
    const modal = document.getElementById("loginModal");
    const closeModal = document.querySelector(".close");

    if (loginBtn && modal && closeModal) {
        loginBtn.addEventListener("click", () => modal.style.display = "block");
        closeModal.addEventListener("click", () => modal.style.display = "none");

        window.addEventListener("click", (e) => {
            if (modal.style.display === "block" && e.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // ✅ Navbar Toggle for Mobile
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("show");
        });
    }

    // ✅ Static Auction Items
    const itemsContainer = document.querySelector(".item-container");
    const items = [
        { img: "img/watch1.jpg", name: "Vintage Watch", description: "Classic 1950s Rolex" },
        { img: "img/item2.jpg", name: "Antique Necklace", description: "Gold-plated necklace from the 1800s" },
        { img: "img/item3.jpg", name: "Rare Coin", description: "Ancient Roman Empire Coin" },
        { img: "img/item4.jpg", name: "Old Manuscript", description: "Handwritten manuscript from 1600s" },
        { img: "img/item5.jpg", name: "Classic Fountain Pen", description: "Elegant Montblanc Fountain Pen" }
    ];

    if (itemsContainer) {
        itemsContainer.innerHTML = ""; // Clears previous content to prevent duplicates

        items.forEach(item => {
            const itemCard = document.createElement("div");
            itemCard.classList.add("item-card");

            itemCard.innerHTML = `
                <img src="${item.img}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
            `;

            itemsContainer.appendChild(itemCard);
        });
    }
});
