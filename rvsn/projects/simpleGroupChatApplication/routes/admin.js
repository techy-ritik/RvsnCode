const express = require("express");

const router = express.Router();

router.get("/login", (req, res) => {
  res.send(
    '<form  action="/" method="POST" onsubmit="localStorage.setItem(`Username`,document.getElementById(`username`).value)">Enter username:- <input id="username" type="text" name="userName"><button type="submit">login</button></form>',
  );
});

router.use("/", (req, res) => {
  // console.log(req.body);

  res.send(
    '<form action="/" method="POST">Send message:- <input type="text" name="message"><button>send</button></form>',
  );
});

module.exports = router;
