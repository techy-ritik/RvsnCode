const express = require('express');

const app = express();

const route1 = require('./routes/route1')

app.use(express.json({extended:false}))

app.use((req, res, next) => {
  console.log(`${req.method} request made to ${req.url}`);
  next();
});

app.use(route1);

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});