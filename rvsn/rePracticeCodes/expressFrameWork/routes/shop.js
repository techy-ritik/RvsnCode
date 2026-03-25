const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname,'..','views','shop.html'))  //we can use '../' or '..' to go to one level upper folder
});


module.exports = router;