const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  console.log("in the 3rd middleware");
  //   console.log("URL:", req.url, "Method:", req.method);
  res.send("<h1>Jay Hanuman Gyan Gun sagar</h1>"); // send default html responses to the server without manually setting the content type Header
});


module.exports = router;