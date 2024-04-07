// Initialize an empty array to store selected items
const selectedItems = [];

// Function to update the total price
function updateTotal() {
    const cartTotal = document.getElementById("cart-total");
    const cartItems = document.querySelectorAll(".cart-item");

    let total = 0;

    cartItems.forEach((item) => {
        const itemPrice = parseFloat(item.getAttribute("data-item-price"));
        const quantity = parseInt(item.getAttribute("data-item-quantity"));
        total += itemPrice * quantity;
    });

    cartTotal.textContent = `₹${total.toFixed(2)}`;
}

// Function to add item to cart
function addItem(itemName, itemPrice, index) {
const cartItems = document.getElementById("cart-items");

// Check if the item is already in the cart
const existingItem = selectedItems.find(item => item.name === itemName);

if (existingItem) {
// If the item is already in the cart, increase its quantity
existingItem.quantity++;
updateCartItem(existingItem);
} else {
// If the item is not in the cart, add it as a new item
const newItem = { name: itemName, price: itemPrice, quantity: 1 };
selectedItems.push(newItem);

// Create a new list item for the cart
const listItem = document.createElement("li");
listItem.className = "cart-item";
listItem.setAttribute("data-item-name", itemName);
listItem.setAttribute("data-item-price", itemPrice);
listItem.setAttribute("data-item-quantity", 1);

// Create span for item name, quantity, and price
const itemInfoSpan = document.createElement("span");
itemInfoSpan.innerHTML = `${itemName}&nbsp;-&nbsp;${newItem.quantity}&nbsp;x&nbsp;${itemPrice}&nbsp;:&nbsp;₹${(newItem.quantity * itemPrice).toFixed(2)}`;

// Create a "Remove" button for the cart item
const removeButton = document.createElement("button");
removeButton.textContent = "Remove";
removeButton.classList.add("btn", "btn-light", "text-dark", "m-2"); // Add classes for Bootstrap styling
removeButton.addEventListener("click", () => {
    removeItem(itemName);
});

listItem.appendChild(itemInfoSpan);
listItem.appendChild(removeButton);
cartItems.appendChild(listItem);
}

// Update the total after adding or updating the item
updateTotal();
}

// Function to update cart item's quantity and price
function updateCartItem(existingItem) {
const cartItems = document.querySelectorAll(".cart-item");
cartItems.forEach((item) => {
if (item.getAttribute("data-item-name") === existingItem.name) {
    const quantity = parseInt(item.getAttribute("data-item-quantity")) + 1; // Increment the quantity correctly
    item.setAttribute("data-item-quantity", quantity);
    item.querySelector("span").innerHTML = `${existingItem.name}&nbsp;-&nbsp;${quantity}&nbsp;x&nbsp;${existingItem.price}&nbsp;:&nbsp;₹${(quantity * existingItem.price).toFixed(2)}`;
}
});
updateTotal();
}

// Function to remove selected item from the array
function removeItem(itemName) {
const index = selectedItems.findIndex(item => item.name === itemName);
if (index !== -1) {
const item = selectedItems[index];
if (item.quantity > 1) {
    item.quantity--;
} else {
    selectedItems.splice(index, 1);
}
}
const cartItems = document.querySelectorAll(".cart-item");
cartItems.forEach((item) => {
if (item.getAttribute("data-item-name") === itemName) {
    const quantity = parseInt(item.getAttribute("data-item-quantity"));
    if (quantity > 1) {
        item.setAttribute("data-item-quantity", quantity - 1);
        const itemPrice = parseFloat(item.getAttribute("data-item-price"));
        item.querySelector("span").innerHTML = `${itemName}&nbsp;-&nbsp;${quantity - 1}&nbsp;x&nbsp;${itemPrice}&nbsp;:&nbsp;₹${(quantity - 1) * itemPrice.toFixed(2)}`;
    } else {
        item.remove();
    }
}
});
updateTotal();
}

function clearCartAndResetForm() {
    // Clear the selected items array
    selectedItems.length = 0;

    // Clear the cart items displayed on the page
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    // Reset the total displayed on the page
    const cartTotal = document.getElementById("cart-total");
    cartTotal.textContent = "₹0.00";

    // Reset the input field for total persons
    const totalPersonsInput = document.getElementById("totalPersons");
    totalPersonsInput.value = "";
}

// Call updateTotal() to calculate and display the initial total
updateTotal();

// Event listener for the submit button
document.getElementById("submit-btn").addEventListener("click", function() {
    const cartTotal = document.getElementById("cart-total").textContent;
    alert("Your total amount is " + cartTotal);
    // Scroll to the top of the page
    window.scrollTo({ top: 0, behavior: "smooth" });
// Clear the cart and reset the form after displaying the alert
clearCartAndResetForm();

    
});
