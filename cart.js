// ================= CHECK JS LOADED =================
console.log("Cart JS Loaded ✅");

// ================= LOAD CART =================
let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-items");
const totalPriceEl = document.getElementById("total-price");

// ================= DISPLAY CART =================
function displayCart() {
    cartContainer.innerHTML = ""; // Clear previous items

    if(cart.length === 0){
        cartContainer.innerHTML = "<p style='text-align:center; color:#555;'>Your cart is empty 🛒</p>";
        totalPriceEl.innerText = "";
        return;
    }

    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        totalPrice += itemTotal;

        // Create item div
        const itemDiv = document.createElement("div");
        itemDiv.style.border = "1px solid #ccc";
        itemDiv.style.borderRadius = "10px";
        itemDiv.style.padding = "15px";
        itemDiv.style.margin = "15px auto";
        itemDiv.style.width = "80%";
        itemDiv.style.background = "#fff";
        itemDiv.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
        itemDiv.style.display = "flex";
        itemDiv.style.justifyContent = "space-between";
        itemDiv.style.alignItems = "center";

        itemDiv.innerHTML = `
            <div>
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
                <p>Subtotal: ₹${itemTotal}</p>
            </div>
            <button style="
                padding:6px 12px;
                border:none;
                background:#ff4d4d;
                color:white;
                border-radius:5px;
                cursor:pointer;
            " onclick="removeItem(${index})">Remove</button>
        `;

        cartContainer.appendChild(itemDiv);
    });

    totalPriceEl.innerText = `Total Amount: ₹${totalPrice}`;
}

// ================= REMOVE ITEM =================
function removeItem(index){
    cart.splice(index,1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}

// ================= CLEAR CART =================
function clearCart(){
    if(cart.length === 0) return;
    const confirmClear = confirm("Are you sure you want to clear the cart?");
    if(confirmClear){
        cart = [];
        localStorage.removeItem("cart");
        displayCart();
    }
}

// ================= INITIAL LOAD =================
displayCart();