/** process payment in modal mode*/
console.log("in payment modal mode");

const cashfree = Cashfree({
  mode: "sandbox",
});
const token = localStorage.getItem("token");
document.getElementById("renderBtn").addEventListener("click", () => {
  axios
    .post("http://localhost:5000/payments/pay",{},{headers:{Authorization: token}})    // we should always keep header in third argument in post request and not in second argument as it will be considered as data to be sent in the request body even it can be empty object as in this case
    .then((paymentDetails) => {
      const paymentSessionId = paymentDetails.data.paymentSessionId;
      let checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_modal",
      };
      return cashfree.checkout(checkoutOptions); // here we are calling checkout method which generates the payment gateway for the recieved data in the paymentSessionId
    })
    .then((result) => {
      if (result.error) {
        // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
        console.log(
          "User has closed the popup or there is some payment error, Check for Payment Status",
        );
        console.log(result.error);
      }
      if (result.redirect) {
        // This will be true when the payment redirection page couldnt be opened in the same window
        // This is an exceptional case only when the page is opened inside an inAppBrowser
        // In this case the customer will be redirected to return url once payment is completed
        console.log("Payment will be redirected");
      }
      if (result.paymentDetails) {
        // This will be called whenever the payment is completed irrespective of transaction status
        console.log("Payment has been completed, Check for Payment Status");
        console.log(result.paymentDetails.paymentMessage);

        axios
          .get(`http://localhost:5000/payments/payment-status/${orderId}`)          // the return url which got stored in the metadata in services file is redirected from here and with this payment status route is executed for the passed orderId
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            alert("your payment is :", data);
          });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});


window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  console.log(window.location.href);
  console.log(new URLSearchParams(window.location.search).get("status"));

  const orderId = params.get("orderId");
  const status = params.get("status");

  console.log("status:", status);

  if (!status) {
    return;
  }

  const statusElement = document.getElementById("paymentStatus");
  const payBtn = document.getElementById("renderBtn");
  const payInstruction = document.getElementById("paymentInstruction");
  const row = document.querySelector(".row");

  statusElement.style.display = "block";

  if (status === "Success") {
    statusElement.className = "success";

    statusElement.innerHTML = `
      <div class="status-icon">✓</div>
      <h2>Payment Successful</h2>
      <p>Your membership has been activated.</p>
      <p>Order ID: ${orderId}</p>
    `;

    row.style.display = "none";
  } else if (status === "Pending") {
    statusElement.className = "pending";

    statusElement.innerHTML = `
      <div class="status-icon">⏳</div>
      <h2>Payment Pending</h2>
      <p>Your payment is still being processed.</p>
      <p>Order ID: ${orderId}</p>
    `;
    row.style.display = "none";
  } else if (status === "Failed") {
    statusElement.className = "failed";

    statusElement.innerHTML = `
      <div class="status-icon">!</div>
      <h2>Payment Failed</h2>
      <p>Your payment was not successful.</p>
      <p>Order ID: ${orderId}</p>
    `;
    row.style.display = "flex";
    payInstruction.style.display = "none";
    payBtn.style.display = "block";
    payBtn.textContent = "Retry Payment";
  }
});