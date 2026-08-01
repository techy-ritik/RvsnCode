const express = require("express");

const router = express.Router();

router.get("/users", (req, res) => {
  res.send("Fetching all users");
  
});

router.post("/users", (req, res) => {
  res.send("Adding a new user");

});

router.get("/users/:id", (req, res) => {
  res.send(`Fetching user with ID: ${req.params.id}`);

});

module.exports = router;