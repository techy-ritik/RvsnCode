const express = require('express');

const router = express.Router();

router.get("/add-product", (req, res, next) => { 
  console.log("in the add product middleware");
  res.send(
    '<form action="/admin/add-product" method="POST">product name:- <input type="text" name="title"> Product Size:-<input type="number" name="size"> <button type="submit">add product</button></form>',
  );
});

router.post("/add-product", (req, res, next) => {// we can use .get or .post in place of .use as for which method incoming request we are using this middleware and route. (Here .post is used bcz incoming request is post method of the form)
  console.log(req.body); // data sent back by the server which we Post on the server can we recived through req.body
  res.redirect("/shop");
});

//here we using same route name in both of the above middleware but the method is different so it's executing separately at different method call

module.exports = router;