const express = require("express");
const path = require("path");

const rootDir = require("../util/path");

const router = express.Router();

router.get(["/",'/shop'], (req, res, next) => {
  // res.sendFile(path.join(__dirname,'..','views','shop.html'))  //we can use '../' or '..' to go to one level upper folder
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});


module.exports = router;