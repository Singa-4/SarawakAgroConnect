// script-farmer.js

// Function to navigate between pages
function navigateTo(page) {
    window.location.href = page;
}





// Insert-Page-Farmer (Handles Adding Products)
document.addEventListener("DOMContentLoaded", function () {
    const productForm = document.getElementById("productForm");

    if (productForm) {
        productForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let name = document.getElementById("productName").value;
            let price = document.getElementById("productPrice").value;
            let description = document.getElementById("productDescription").value;
            let category = document.getElementById("productCategory").value;
            let imageInput = document.getElementById("productImage");
            let imageFile = imageInput.files[0];

            if (!imageFile) {
                alert("Please upload an image.");
                return;
            }

            let reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onload = function () {
                let product = {
                    name: name,
                    price: price,
                    description: description,
                    category: category,
                    image: reader.result // Convert image to Base64
                };

                let products = JSON.parse(localStorage.getItem("products")) || [];
                products.push(product);
                localStorage.setItem("products", JSON.stringify(products));

                alert("Product added successfully!");
                productForm.reset();
            };
        });
    }
});

// Product-Page-Farmer (Handles Displaying & Deleting Products)
document.addEventListener("DOMContentLoaded", function () {
    const productList = document.getElementById("product-list");
    let products = JSON.parse(localStorage.getItem("products")) || [];

    function displayProducts() {
        productList.innerHTML = ""; // Clear previous content

        if (products.length === 0) {
            productList.innerHTML = "<p>No products available. Add some!</p>";
            return;
        }

        products.forEach((product, index) => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <img src="${product.image}" alt="Product Image" class="product-image">
                <h3>${product.name}</h3>
                <p><strong>Category:</strong> ${product.category}</p>
                <p><strong>Price:</strong> RM${product.price}</p>
                <p><strong>Description:</strong> ${product.description}</p>
                <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
            `;
            productList.appendChild(productCard);
        });
    }

    // Function to delete a product
    window.deleteProduct = function (index) {
        if (confirm("Are you sure you want to delete this product?")) {
            products.splice(index, 1); // Remove from array
            localStorage.setItem("products", JSON.stringify(products)); // Update local storage
            displayProducts(); // Refresh product list
        }
    };

    displayProducts(); // Load products on page load
});