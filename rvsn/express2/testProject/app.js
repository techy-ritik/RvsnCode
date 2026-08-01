const express = require('express');

const app = express();

const userRoute = require('./routes/userRoutes')
const productRoute = require('./routes/productRoutes')
const cartRoute = require('./routes/cartRoutes')

app.use(express.json({ extended: false }));

app.use(userRoute);
app.use(productRoute);
app.use(cartRoute);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});