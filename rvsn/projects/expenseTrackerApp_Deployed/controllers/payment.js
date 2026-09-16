const cashfreeServices = require("../services/cashfree");
const orderModel = require("../models/order");
const path = require("path");
const rootDir = require("../util/path");

exports.getPaymentPage = (req, res) => {
  res.sendFile(path.join(rootDir, "views/payment.html"));
};

exports.processPayment = (req, res) => {
  const orderId = "ORDER-" + Date.now();
  const orderAmount = 2000;
  const orderCurrency = "INR";
  const customerId = "1";
  const customerPhone = "9999999999";

  cashfreeServices.createOrder(orderId, orderAmount, orderCurrency, customerId, customerPhone)   // here by calling this services function we are generating paymentSessionId by passing all the order details 
    .then((paymentSessionId) => {
      console.log("paymentSessionId", paymentSessionId);
      orderModel.create({
        orderId,
        paymentSessionId,
        orderAmount,
        orderCurrency,
        paymentStatus: "Pending",
      })
      res.json({ paymentSessionId, orderId });  // here now we will send the session id to frontend and then PG will get generated from there 
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getPaymentStatus = async (req, res) => {
  try{
    const orderId = req.params.orderId;

    const orderStatus = await cashfreeServices.paymentStatus(orderId);  // here we are calling the paymentStatus function from services file which will return the status of the order for the passed orderId
    
    console.log("orderStatus",orderStatus);
    await orderModel.update({ paymentStatus :orderStatus },{where:{orderId:orderId}});  // here we are updating the paymentStatus in the order table for the passed orderId with the status received from cashfree server


    console.log("orderStatus",orderStatus);
    res.redirect(`/payment.html?orderId=${orderId}&status="Success"`);  // here we are redirecting to the payment.html page with the orderId and status as query params so that we can show the status of the payment to the user
  }
  catch(err){
    console.log(err);
  }
};
