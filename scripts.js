let cart = [];

// add a product to the cart
function addToCart(productName, productPrice) {
    // Get the quantity input field next to the add button
    const quantityInput = event.target.previousElementSibling;
    const quantity = parseInt(quantityInput.value); 
    const productTotal = quantity * productPrice; 
    // Check if the product already exists in the cart
    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        // If the product exists, update its quantity and total price
        cart[existingProductIndex].quantity = quantity;
        cart[existingProductIndex].total = productTotal;
    } else {
        // If the product doesn't exist, create a new cart item and add it to the cart
        const cartItem = {
            name: productName,
            quantity: quantity,
            price: productPrice,
            total: productTotal
        };
        cart.push(cartItem);
    }

    // Update the cart display
    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; 

    let totalAmount = 0;

    // repeat the cart and add each item to the display
    cart.forEach(item => {
        totalAmount += item.total; 

        const cartItemRow = document.createElement('tr');

        cartItemRow.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price} LKR</td>
            <td>${item.total} LKR</td>
        `;

        cartItemsContainer.appendChild(cartItemRow);
    });

    // Add a row to display the total amount
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="3"><strong>Total Amount:</strong></td>
        <td><strong>${totalAmount} LKR</strong></td>
    `;
    cartItemsContainer.appendChild(totalRow); 
}

//  save the cart as favourites
document.getElementById('add-to-favourites').addEventListener('click', function() {
    localStorage.setItem('favouriteCart', JSON.stringify(cart)); 
    alert('Cart saved as favourite!');
});

// apply the favourite cart
document.getElementById('apply-favourites').addEventListener('click', function() {
    const favouriteCart = localStorage.getItem('favouriteCart'); 
    if (favouriteCart) {
        cart = JSON.parse(favouriteCart); 
        updateCart(); 
        alert('Favourite cart applied!');
    } else {
        alert('No favourite cart found!'); 
    }
});

// save the cart data when the document is loaded
document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('.proceed-button').addEventListener('click', function() {
        localStorage.setItem('cartData', JSON.stringify(cart)); 
    });
});
