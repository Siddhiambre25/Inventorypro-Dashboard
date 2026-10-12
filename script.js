
"use strict";

// InventoryPro - JavaScript Internship Project

// 1. Inventory Data
const inventory = [
  { name: "Laptop", price: 800 },
  { name: "Mouse", price: 25 }
];

// 2. DOM Elements
const productTable = document.getElementById("productTable");
const totalProducts = document.getElementById("totalProducts");
const totalValue = document.getElementById("totalValue");
const affordableCount = document.getElementById("affordableCount");
const premiumCount = document.getElementById("premiumCount");
const categoryChart = document.getElementById("categoryChart");

const modal = document.getElementById("productModal");
const addProductBtn = document.getElementById("addProductBtn");
const closeModalBtn = document.getElementById("closeModal");
const productForm = document.getElementById("productForm");
const searchInput = document.getElementById("searchInput");

// 3. Conditional Logic and Switch
function getCategory(price) {
  let categoryLevel;

  if (price < 50) {
    categoryLevel = 1;
  } else if (price < 200) {
    categoryLevel = 2;
  } else {
    categoryLevel = 3;
  }

  switch (categoryLevel) {
    case 1:
      return "Budget";
    case 2:
      return "Standard";
    default:
      return "Premium";
  }
}

// 4. Regular Function with Default Parameter
function calculateTotal(items, taxRate = 0) {
  let total = 0;

  for (const item of items) {
    total += item.price;
  }

  return total * (1 + taxRate);
}

// 5. Arrow Function
const applyDiscount = (amount, discount = 0) =>
  amount * (1 - discount);

// 6. Render Product Table
function renderProducts(searchTerm = "") {
  productTable.innerHTML = "";

  const filteredProducts = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  filteredProducts.forEach(item => {
    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = item.name;

    const priceCell = document.createElement("td");
    priceCell.textContent = "$" + item.price.toFixed(2);

    const category = getCategory(item.price);

    const categoryCell = document.createElement("td");
    const categoryBadge = document.createElement("span");
    categoryBadge.className =
      "badge badge-" + category.toLowerCase();
    categoryBadge.textContent = category;
    categoryCell.appendChild(categoryBadge);

    const statusCell = document.createElement("td");
    const statusBadge = document.createElement("span");
    statusBadge.className = "status";
    statusBadge.textContent = "Available";
    statusCell.appendChild(statusBadge);

    row.append(
      nameCell,
      priceCell,
      categoryCell,
      statusCell
    );

    productTable.appendChild(row);
  });

  if (filteredProducts.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 4;
    cell.textContent = "No products found.";
    row.appendChild(cell);
    productTable.appendChild(row);
  }
}

// 7. Update Dashboard Statistics
function updateStatistics() {
  totalProducts.textContent = inventory.length;

  const total = calculateTotal(inventory);
  totalValue.textContent = "$" + total.toFixed(2);

  const affordable = inventory.filter(item => item.price < 200);
  affordableCount.textContent = affordable.length;

  const premium = inventory.filter(
    item => getCategory(item.price) === "Premium"
  );
  premiumCount.textContent = premium.length;
}

// 8. Analytics Chart
function updateChart() {
  categoryChart.innerHTML = "";

  const categories = ["Budget", "Standard", "Premium"];

  categories.forEach(category => {
    const count = inventory.filter(
      item => getCategory(item.price) === category
    ).length;

    const percentage = inventory.length
      ? (count / inventory.length) * 100
      : 0;

    const row = document.createElement("div");
    row.className = "chart-row";

    const label = document.createElement("span");
    label.textContent = category;

    const track = document.createElement("div");
    track.className = "chart-track";

    const fill = document.createElement("div");
    fill.className = "chart-fill";
    fill.style.width = percentage + "%";
    track.appendChild(fill);

    const countLabel = document.createElement("span");
    countLabel.textContent = count;

    row.append(label, track, countLabel);
    categoryChart.appendChild(row);
  });
}

// 9. Console Analytics Report
function generateReport() {
  console.clear();
  console.log("--- Initializing Inventory System ---");

  console.log("\n--- Processing Inventory Roster (forEach) ---");

  inventory.forEach(item => {
    console.log(
      `Item: ${item.name} ($${item.price}) -> Category: ${getCategory(item.price)}`
    );
  });

  const affordable = inventory.filter(item => item.price < 200);

  const report = inventory.map(
    item => `${item.name.toUpperCase()}: $${item.price}`
  );

  console.log("\n--- Financial Analytics ---");
  console.log("Total Inventory Value: $" + calculateTotal(inventory));
  console.log(
    "Filtered Affordable Items (Under $200):",
    affordable.map(item => item.name)
  );
  console.log("Formatted Report List:", report);

  console.log(
    "Discounted Total:",
    applyDiscount(calculateTotal(inventory), 0)
  );
}

// 10. Demonstrate Loops, Break and Continue
function inspectInventory() {
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i].price <= 0) {
      continue;
    }

    if (i >= 100) {
      break;
    }
  }
}

// 11. Refresh Entire Dashboard
function refreshDashboard() {
  inspectInventory();
  renderProducts(searchInput.value);
  updateStatistics();
  updateChart();
  generateReport();
}

// 12. Add Product Modal
addProductBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
  document.getElementById("productName").focus();
});

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

modal.addEventListener("click", event => {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});

// 13. Add New Product
productForm.addEventListener("submit", event => {
  event.preventDefault();

  const name = document.getElementById("productName").value.trim();
  const priceText = document.getElementById("productPrice").value;
  const price = Number(priceText);

  if (
    name === "" ||
    priceText.trim() === "" ||
    !Number.isFinite(price) ||
    price <= 0
  ) {
    alert("Please enter a valid product name and positive price.");
    return;
  }

  inventory.push({ name, price });

  productForm.reset();
  modal.classList.add("hidden");

  refreshDashboard();
  alert("Product added successfully!");
});

// 14. Search Products
searchInput.addEventListener("input", event => {
  renderProducts(event.target.value);
});

// 15. Initialize Dashboard
refreshDashboard();

/* 16. Add Product Using JavaScript prompt() */

const promptButton = document.createElement("button");

promptButton.textContent = "+ Add via Prompt";
promptButton.className = "primary-btn";

addProductBtn.insertAdjacentElement("afterend", promptButton);

promptButton.addEventListener("click", function () {

  // Get product name using prompt()
  const productName = prompt("Enter Product Name:");

  if (productName === null) {
    return;
  }

  if (productName.trim() === "") {
    alert("Please enter a valid product name.");
    return;
  }

  // Get product price using prompt()
  const priceInput = prompt("Enter Product Price:");

  if (priceInput === null) {
    return;
  }

  // Explicit type conversion
  const productPrice = Number(priceInput);

  if (
    priceInput.trim() === "" ||
    !Number.isFinite(productPrice) ||
    productPrice <= 0
  ) {
    alert("Please enter a valid price.");
    return;
  }

  // Store product in inventory array
  inventory.push({
    name: productName.trim(),
    price: productPrice
  });

  // Update dashboard and console
  refreshDashboard();

  alert("Product added successfully!");

});
