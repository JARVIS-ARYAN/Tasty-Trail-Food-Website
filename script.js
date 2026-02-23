console.log("TastyTrail JS Loaded ✅");

// ================= CART DATA =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartCount = document.getElementById("cart-count");

// ================= UPDATE CART COUNT =================
function updateCartCount() {

    if (!cartCount) return;

    let total = 0;

    cart.forEach(item => {
        total += item.quantity;
    });

    cartCount.innerText = total;
}

// ================= ADD TO CART (MAIN FIX) =================
document.addEventListener("click", function (e) {

    if (e.target.classList.contains("add-btn")) {

        const button = e.target;
        const foodCard = button.closest(".food-card");

        const foodName =
            foodCard.querySelector("h3").innerText;

        const foodPrice =
            Number(
                foodCard.querySelector(".price")
                .getAttribute("data-price")
            );

        const existingItem =
            cart.find(item => item.name === foodName);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                name: foodName,
                price: foodPrice,
                quantity: 1
            });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        // Button feedback
        button.innerText = "Added ✅";
        button.style.background = "green";

        setTimeout(() => {
            button.innerText = "Add to Cart";
            button.style.background = "#ff4d4d";
        }, 1000);
    }
});

// ================= PREVENT EMPTY CART =================
const cartBtn = document.getElementById("cart-btn");

if (cartBtn) {
    cartBtn.addEventListener("click", function (e) {
        if (cart.length === 0) {
            e.preventDefault();
            alert("Cart is empty 🛒");
        }
    });
}

// ================= LOAD COUNT =================
updateCartCount();