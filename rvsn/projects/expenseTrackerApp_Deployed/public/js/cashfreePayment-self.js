/** process payment in self mode*/
console.log("in payment self mode");

const cashfree = Cashfree({
  mode: "sandbox",
});
const token = localStorage.getItem("token");
document.getElementById("renderBtn").addEventListener("click", () => {
  axios
    .post("/payments/pay", {}, { headers: { Authorization: token } })
    .then((paymentDetails) => {
      const paymentSessionId = paymentDetails.data.paymentSessionId;
      let checkoutOptions = {
        paymentSessionId: paymentSessionId,
        redirectTarget: "_self",
      };
      return cashfree.checkout(checkoutOptions);
    })
    .catch((err) => {
      alert(err.response.data.message);
      console.log(err);
    });
});

window.addEventListener("DOMContentLoaded", () => {
  console.log("domContentLoaded");
  const params = new URLSearchParams(window.location.search);

  console.log("href", window.location.href);
  console.log("params", params);

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

  if (status.toLowerCase() === "success") {
    statusElement.className = "success";

    statusElement.innerHTML = `
      <div class="status-icon">✓</div>
      <h2>Payment Successful</h2>
      <p>Your membership has been activated.</p>
      <p>Order ID: ${orderId}</p>
      <button type="button" id="successHomePageRedirect">Go to Home Page</button>
    `;

    const homeRedirectBtn = document.querySelector("#successHomePageRedirect");
    homeRedirectBtn.addEventListener("click", () => {
      localStorage.setItem("userType", "premium");
      window.location.href = "/expense/expense-page";
    });

    row.style.display = "none";

  } else if (status.toLowerCase() === "pending") {
    statusElement.className = "pending";

    statusElement.innerHTML = `
      <div class="status-icon">⏳</div>
      <h2>Payment Pending</h2>
      <p>Your payment is still being processed.</p>
      <p>Order ID: ${orderId}</p>
      <button type="button" id="pendingHomePageRedirect">Go to Home Page</button>
    `;

    const homeRedirectBtn = document.querySelector("#pendingHomePageRedirect");
    homeRedirectBtn.addEventListener("click", () => {
      window.location.href = "/expense/expense-page";
    });

    row.style.display = "none";
  } else if (status.toLowerCase() === "failed") {
    statusElement.className = "failed";

    statusElement.innerHTML = `
      <div class="status-icon">!</div>
      <h2>Payment Failed</h2>
      <p>Your payment was not successful.</p>
      <p>Order ID: ${orderId}</p>
      <button type="button" id="failedHomePageRedirect">Go to Home Page</button>
    `;

    const homeRedirectBtn = document.querySelector("#failedHomePageRedirect");
    homeRedirectBtn.addEventListener("click", () => {
      window.location.href = "/expense/expense-page";
    });

    row.style.display = "flex";
    payInstruction.style.display = "none";
    payBtn.id = "retryPmntBtn";
    payBtn.textContent = "Retry Payment";  
  }
});
