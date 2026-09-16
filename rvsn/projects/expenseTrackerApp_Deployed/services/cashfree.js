const { Cashfree, CFEnvironment } = require("cashfree-pg");

const cashfree = new Cashfree( //  we have to create this object only once and then can be used in every function
  CFEnvironment.SANDBOX,
  "TEST430329ae80e0f32e41a393d78b923034",
  "TESTaf195616268bd6202eeb3bf8dc458956e7192a85",
);

exports.createOrder = (
  orderId,
  orderAmount,
  orderCurrency = "INR",
  customerId,
  customerPhone,
) => {
  const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
  const formattedExpiryDate = expiryDate.toISOString();

  const request = {
    order_amount: orderAmount,
    order_currency: orderCurrency,
    order_id: orderId,

    customer_details: {
      customer_id: customerId,
      customer_phone: customerPhone,
    },
    order_meta: {
      return_url: `http://localhost:5000/payments/payment-status/${orderId}`, //  the return url got hit only after the patyment reaches the redirect stage , till then it get stored in in the metadata with order , after that browser got redirected to this url where paymentStatus route is hit
      payment_methods: "cc,dc,upi",
    },
    order_expiry_time: formattedExpiryDate,
  };

  return cashfree
    .PGCreateOrder(request) //  here it's making the api call from cashfree server internally for all the details containing request object
    .then((response) => {
      console.log("Order created successfully:", response.data);
      return response.data.payment_session_id; //  here we are returning the payment_session_id which is received in the response from the api call of .PGCreateOrder() along with other data which will be fetched in paymentSessionId in controller
    })
    .catch((error) => {
      console.error("Error:", error.response.data.message);
    });
};

exports.paymentStatus = async (orderId) => {
  try {
    const response = await cashfree.PGOrderFetchPayments(orderId);

    let getOrderResponse = response.data;
    let orderStatus;

    if (
      getOrderResponse.filter(
        (transaction) => transaction.payment_status === "SUCCESS",
      ).length > 0
    ) {
      orderStatus = "Success";
    } else if (
      getOrderResponse.filter(
        (transaction) => transaction.payment_status === "PENDING",
      ).length > 0
    ) {
      orderStatus = "Pending";
    } else {
      orderStatus = "Failed";
    }
    return orderStatus;       // from here, after returning the orderStatus, the control goes back to controller.
    
  } catch (error) {
    console.error("Error:", error.response.data.message);
    throw error;
  }
};
