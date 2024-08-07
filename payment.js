document.addEventListener('DOMContentLoaded', function() {
        // Get the order summary container element
    const orderSummaryContainer = document.getElementById('order-summary-items');
    
    // Retrieve the cart data from localStorage and parse it.
    const cartData = JSON.parse(localStorage.getItem('cartData')) || [];
    let totalAmount = 0;

    cartData.forEach(item => {
        totalAmount += item.total;
        
        const orderItemRow = document.createElement('tr');


        // Set the inner HTML of the row with the item name and total price
        orderItemRow.innerHTML = `
            <td>${item.name}</td>
            <td>${item.total} LKR</td>
        `;

        orderSummaryContainer.appendChild(orderItemRow);
    });

    // Add a row to display the total amount
    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td><strong>Total Amount:</strong></td>
        <td><strong>${totalAmount} LKR</strong></td>
    `;
    orderSummaryContainer.appendChild(totalRow);
});

document.getElementById('payment-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate form fields
    const form = event.target;
    const name = form.fullname.value.trim();
    const email = form.email.value.trim();
    const address = form.address.value.trim();
    const branch = form.branch.value;
    const cardnumber = form.cardnumber.value.trim();
    const expmonth = form.expmonth.value.trim();
    const expyear = form.expyear.value;
    const cvv = form.cvv.value.trim();

    if (name && email && address && branch && cardnumber && expmonth && expyear && cvv) {
        // Display thank you message and delivery date in 7days
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 7);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = deliveryDate.toLocaleDateString(undefined, options);

        alert(`Thank you for your purchase! Your order will be delivered by ${formattedDate}.`);

        // Clear cart data
        localStorage.removeItem('cartData');
    } else {
        alert('Please fill out all fields.');
    }
});
