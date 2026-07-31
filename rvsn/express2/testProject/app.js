const express = require('express');

const app = express();

const addUser = (req, res, next) => {
  req.user = "Guest";
  next();
};

app.get("/welcome",addUser,(req, res) => {
  res.send(`<h1>Welcome, ${req.user}!</h1>`);
});

app.get("/welcome/:username",(req, res)=>{

  const username = req.params.username;
  const role = req.query.role;

  res.send(`Welcome ${username}, your role is of ${role}`);

});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});