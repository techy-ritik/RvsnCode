const express = require('express');

const app = express();

const productRoute = require('./routes/productRoutes')

app.use(express.json({ extended: false }));

app.use(productRoute);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});