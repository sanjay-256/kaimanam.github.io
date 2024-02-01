const selectedItems = [];
const totalAmount = document.getElementById("totalAmount");

function addItem(itemName, itemPrice) {
    const cartItems = document.getElementById("cart-items");
    const inputItem = document.createElement("input");
    inputItem.type = "hidden";
    inputItem.name = "items[]";
    inputItem.value = `${itemName} - ₹${itemPrice.toFixed(2)}`;
    
    const listItem = document.createElement("li");
    listItem.className = "cart-item";
    listItem.textContent = `${itemName} - ₹${itemPrice.toFixed(2)}`;
    
    const removeButton = document.createElement("button");
    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", () => {
        listItem.remove();
        updateTotal();
        removeSelectedItem(itemName);
    });

    listItem.appendChild(removeButton);
    cartItems.appendChild(listItem);
    selectedItems.push({ name: itemName, price: itemPrice });
    document.getElementById("order-form").appendChild(inputItem);
    updateTotal();
}

function updateTotal() {
    const cartTotal = document.getElementById("cart-total");
    const cartItems = document.querySelectorAll(".cart-item");
    let total = 0;

    cartItems.forEach((item) => {
        const price = parseFloat(item.textContent.split(" - ₹")[1]);
        total += price;
    });

    cartTotal.textContent = `₹${total.toFixed(2)}`;
}

// var menuData = [
//     { name: "Cutlet", price: 25 },
//     { name: "Medhu Vadai", price: 10 },
//     { name: "Masala Vadai", price: 10 },
//     { name: "Banana Bajji", price: 10 },
//     { name: "Onion Bajji", price: 10 },
//     { name: "Idili", price: 12 },
//     { name: "Chapathi", price: 50 },
//     { name: "Pongal", price: 50 },
//     { name: "Dosa", price: 30 },
//     { name: "Panner Dosa", price: 50 },
//     { name: "Noodles", price: 70 },
//     { name: "Idiyappam", price: 50 },
//     // ... other menu items
//   ];

function addMenuItems() {
    const menu = document.querySelector(".menu");

    menuData.forEach((item) => {
        const menuItem = document.createElement("div");
        menuItem.className = "menu-item";

        const itemName = document.createElement("h3");
        itemName.textContent = item.name;

        const itemDescription = document.createElement("p");
        itemDescription.textContent = `Price: ₹${item.price}`;

        const addButton = document.createElement("button");
        addButton.type = "button";
        addButton.textContent = "Add to Cart";
        addButton.addEventListener("click", () => {
            addItem(item.name, item.price);
        });

        menuItem.appendChild(itemName);
        menuItem.appendChild(itemDescription);
        menuItem.appendChild(addButton);
        menu.appendChild(menuItem);
    });
}

window.addEventListener("load", addMenuItems);

document.getElementById("order-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(document.getElementById("order-form"));
    const tableNumber = document.getElementById("tableNumber").value;
    const cartItems = document.querySelectorAll(".cart-item");

    alert("Order submitted successfully!");

    const order = { tableNumber: tableNumber, items: [] };

    cartItems.forEach((item) => {
        const itemName = item.textContent.split(" - ₹")[0];
        const itemPrice = parseFloat(item.textContent.split(" - ₹")[1]);
        order.items.push({ name: itemName, price: itemPrice });
    });

    console.log("Simulating order submission...");
    console.log("Order Data:", order);

    document.getElementById("cart-items").innerHTML = "";
    document.getElementById("cart-total").textContent = "₹0.00";
    document.getElementById("tableNumber").value = "";

    selectedItems.length = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
});
