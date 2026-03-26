const express = require('express');
const path = require('path');

const rootDir = require('../util/path')

const router = express.Router();

router.get("/add-product", (req, res, next) => { 
  console.log("in the add product middleware");
  res.sendFile(path.join(rootDir,'views','add-product.html'))
});

router.post("/add-product", (req, res, next) => {// we can use .get or .post in place of .use as for which method incoming request we are using this middleware and route. (Here .post is used bcz incoming request is post method of the form)
  console.log(req.body); // data sent back by the server which we Post on the server can we recived through req.body
  res.redirect("/");
});

router.get('/contactus',(req,res)=>{
  res.sendFile(path.join(rootDir,'views/contactUs.html'))
})

router.post('/contactus',(req,res)=>{
  res.redirect("/success");
  // res.sendFile(path.join(rootDir, "views/successMsg.html"));
})

router.post("/success", (req, res) => {
  res.sendFile(path.join(rootDir, "views/successMsg.html"));
});

//here we using same route name in both of the above middleware but the method is different so it's executing separately at different method call

module.exports = router;