let cart = [];

function addToCart(productName, productPrice) {
    const quantityInput = event.target.previousElementSibling;
    const quantity = parseInt(quantityInput.value);
    const productTotal = quantity * productPrice;

    const existingProductIndex = cart.findIndex(item => item.name === productName);

    if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity = quantity;
        cart[existingProductIndex].total = productTotal;
    } else {
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

function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalAmount = 0;

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

document.getElementById('add-to-favourites').addEventListener('click', function() {
    localStorage.setItem('favouriteCart', JSON.stringify(cart));
    alert('Cart saved as favourite!');
});

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

document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the proceed button
    document.querySelector('.proceed-button').addEventListener('click', function() {
        localStorage.setItem('cartData', JSON.stringify(cart));
    });
});
