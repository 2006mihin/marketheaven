let cart = [];

// Add a product to the cart
function addToCart(productName, productPrice) {
    const quantityInput = event.target.previousElementSibling;
    const quantity = parseInt(quantityInput.value);
    const productTotal = quantity * productPrice;

    const existingProductIndex = cart.findIndex(item => item.name === productName);

     // If the product exists, update its quantity and total price
    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity = quantity;
        cart[existingProductIndex].total = productTotal;
    } else {
        // If the product doesn't exist, create a new cart item 
        const cartItem = {
            name: productName,
            quantity: quantity,
            price: productPrice,
            total: productTotal
        };
        cart.push(cartItem);
    }

    updateCart();
}

// Function to update the cart display
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalAmount = 0;


    cart.forEach(item => {
        // Add the total of the current item to the overall total amount
        totalAmount += item.total;

        //create table row to current items with product details
        const cartItemRow = document.createElement('tr');
        cartItemRow.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.price} LKR</td>
            <td>${item.total} LKR</td>
        `;

        cartItemsContainer.appendChild(cartItemRow);
    });

    // Create a row to display the total amount
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="3"><strong>Total Amount:</strong></td>
        <td><strong>${totalAmount} LKR</strong></td>
    `;
    cartItemsContainer.appendChild(totalRow);

    // Save the updated cart in localStorage
    localStorage.setItem('cartData', JSON.stringify(cart));
}

// Save the cart as favourites
document.getElementById('add-to-favourites').addEventListener('click', function() {
    localStorage.setItem('favouriteCart', JSON.stringify(cart));
    alert('Cart saved as favourite!');
});

// Apply the favourite cart
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

// Clear the cart
document.getElementById('clear-cart').addEventListener('click', function() {
    cart = [];
    localStorage.removeItem('cartData');
    updateCart();
    alert('Cart cleared!');
});

// Load the cart data when the document is loaded
document.addEventListener('DOMContentLoaded', function() {
     // Retrieve saved cart data from localStorage
    const savedCart = localStorage.getItem('cartData');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCart();
    }


    //  "Proceed to Pay" button
    document.querySelector('.proceed-button').addEventListener('click', function(event) {
        if (cart.length === 0) {
            event.preventDefault();
            alert('Your cart is empty!');
        } else {
            localStorage.setItem('cartData', JSON.stringify(cart));
        }
    });
});
