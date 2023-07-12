// Step 7: Checkout Page
const checkoutPage = document.getElementById('checkoutPage');
const movieName = document.getElementById('movieName');
const ticketCost = document.getElementById('ticketCost');
const numTickets = document.getElementById('numTickets');
const convenienceFee = document.getElementById('convenienceFee');
const subtotal = document.getElementById('subtotal');

// Show the checkout page with movie details
function showCheckoutPage(movie) {
  movieName.textContent = `Movie: ${movie.title}`;
  ticketCost.textContent = `Ticket Cost: $${getRandomPrice()}`;
  numTickets.value = '';

  updateSummary();

  checkoutPage.style.display = 'block';
}

// Calculate the subtotal and convenience fee based on the number of tickets
function updateSummary() {
  const tickets = parseInt(numTickets.value) || 0;
  const cost = parseInt(ticketCost.textContent.split('$')[1]);
  const fee = (tickets * cost * 0.0175).toFixed(2);
  const total = (tickets * cost + parseFloat(fee)).toFixed(2);

  convenienceFee.textContent = `Convenience Fee (1.75%): $${fee}`;
  subtotal.textContent = `Subtotal: $${total}`;
}

// Update the summary when the number of tickets changes
numTickets.addEventListener('input', updateSummary);

// Handle form submission and payment processing
const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener('submit', processPayment);

function processPayment(event) {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const paymentMethod = document.getElementById('paymentMethod').value;

  // Perform payment processing and handle success or failure
  // You can add your own implementation here, such as making API requests to a payment gateway

  // Example: Show a success message and clear the form
  alert('Payment successful!');
  paymentForm.reset();
}