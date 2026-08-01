exports.getCartForUser = (req, res) => {
  res.send(`Fetching cart for user with ID: ${req.params.userId}`);
};

exports.addProductToCart = (req, res) => {
  res.send(`Adding product to cart for user with ID: ${req.params.userId}`);
};
