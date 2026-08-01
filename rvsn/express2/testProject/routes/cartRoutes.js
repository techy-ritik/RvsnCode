const express = require("express");

const router = express.Router();

router.get("/cart/:userId", (req, res) => {
  res.send(`Fetching cart for user with ID: ${req.params.userId}`);

});

router.post("/cart/:userId", (req, res) => {
  res.send(`Adding product to cart for user with ID: ${req.params.userId}`);
  
});

module.exports = router;