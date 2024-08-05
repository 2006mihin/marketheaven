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
        // Display thank you message and delivery date
        const today = new Date();
        const deliveryDate = new Date(today);
        deliveryDate.setDate(today.getDate() + 7); // Delivery in 7 days
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = deliveryDate.toLocaleDateString(undefined, options);

        alert(`Thank you for your purchase! Your order will be delivered by ${formattedDate}.`);
    } else {
        alert('Please fill out all fields correctly.');
    }
});

window.addEventListener('load', function() {
    // Get total amount from URL parameters and display it
    const urlParams = new URLSearchParams(window.location.search);
    const totalAmount = urlParams.get('total');
    document.getElementById('total-amount').innerText = `${totalAmount} LKR`;
});
