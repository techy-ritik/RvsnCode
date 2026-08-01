const fetchProducts = (req) => {
  return "Fetching all products";
};

const addProducts = (req) => {
  return "Adding a new product";
};

const fetchProductById = (req) => {
  return `Fetching product with ID: ${req.params.id}`;
};

module.exports = {
  fetchProducts,
  addProducts,
  fetchProductById
};
