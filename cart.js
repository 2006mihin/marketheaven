document.addEventListener('DOMContentLoaded', function() {
    // Event listener for the proceed button
    document.querySelector('.proceed-button').addEventListener('click', function() {
        localStorage.setItem('cartData', JSON.stringify(cart));
    });
});
