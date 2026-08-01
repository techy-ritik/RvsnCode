const express = require("express");

const router = express.Router();


router.get("/products", (req, res) => {
  res.send("Here is the list of all products.");
});

router.post("/products", (req, res) => {
  res.send("A new product has been added.");
});

router.get("/categories", (req, res) => {
  res.send("Here is the list of all categories.");
});

router.post("/categories", (req, res) => {
  res.send("A new category has been created.");
});

module.exports = router;