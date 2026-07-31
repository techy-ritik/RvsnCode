const express = require('express');

const app = express();

const addUser = (req, res, next) => {
  req.user = "Guest";
  next();
};

app.get("/welcome", addUser, (req, res) => {
  res.send(`<h1>Welcome, ${req.user}!</h1>`);
});

app.get("/orders", (req, res) => {
  res.send("Here is the list of all orders.");
});

app.post("/orders", (req, res) => {
  res.send("A new order has been created.");
});

app.get("/users", (req, res) => {
  res.send("Here is the list of all users.");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});