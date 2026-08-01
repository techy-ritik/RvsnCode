exports.getProducts = (req, res, next) => {
  res.send("Fetching all products");
};

exports.getProductById = (req, res, next) => {
  res.send(`Fetching product with ID: ${req.params.id}`);
};

exports.addProduct = (req, res, next) => {
  res.send("Adding a new product");
};
