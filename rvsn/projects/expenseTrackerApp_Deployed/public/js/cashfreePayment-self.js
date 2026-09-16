/** process payment in self mode*/
console.log("in payment self mode");

const cashfree = Cashfree({
  mode: "sandbox",
});
const token = localStorage.getItem("token");
document.getElementById("renderBtn").addEventListener("click", () => {
  axios
    .post(
      "http://localhost:5000/payments/pay",
      {},
      { headers: { Authorization: token } },
    )
    .then((paymentDetails) => {
      const paymentSessionId = paymentDetails.data.paymentSessionId;
      let checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_self",
      };
      return cashfree.checkout(checkoutOptions);
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

  statusElement.style.display = "block"

  if (status === "Success") {
    statusElement.className = "success";

    statusElement.innerHTML = `
      <div class="status-icon">✓</div>
      <h2>Payment Successful</h2>
      <p>Your membership has been activated.</p>
      <p>Order ID: ${orderId}</p>
    `;

    row.style.display = "none";
  }
  else if (status === "Pending") {
    statusElement.className = "pending";

    statusElement.innerHTML = `
      <div class="status-icon">⏳</div>
      <h2>Payment Pending</h2>
      <p>Your payment is still being processed.</p>
      <p>Order ID: ${orderId}</p>
    `;
    row.style.display = "none";
  }

else if (status === "Failed") {
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