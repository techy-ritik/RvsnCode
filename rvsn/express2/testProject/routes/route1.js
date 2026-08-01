const express = require("express");

const router = express.Router();


router.get("/books", (req, res) => {
  console.log("books request received !");

  res.send("Here is the list of books!");
});

router.post("/books", (req, res) => {
  console.log("Book Data:", req.body);

  res.send("Book has been added!");
});

module.exports = router;