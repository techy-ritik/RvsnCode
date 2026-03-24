const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/login", (req, res) => {
  res.send(
    '<form  action="/login" method="POST" onsubmit="localStorage.setItem(`Username`,document.getElementById(`username`).value)">Enter username:- <input id="username" type="text" name="userName"><button type="submit">login</button></form>',
  );
});

router.post("/login", (req, res) => {
  // console.log(".post of /login", req.body);

  res.redirect("/");
});

router.get("/", (req, res) => {
  // console.log(".get of /", req.body);

  fs.readFile("chatData", "utf8", (err, data) => {
    if (err) {
      console.log(err);
    }
    let chatData = "no chat yet!!";
    if (data) {
      chatData = data;
    }

    res.send(
      `<p>${chatData}</p>
      <form action="/" method="POST" 
        onsubmit="const user = localStorage.getItem('Username');
          if(!user){
            alert('Please login');
            return false;
          }
          this.currentUser.value= user "
      >
      <input type="hidden" name="currentUser">
      Send message:- <input type="text" name="message">
      <button>send</button>
      </form>`, // here we have to use this keyword because userName is not global variable and without using this keyword it tries to find it in global scope which will not be found so to point on the form scope we have to use this keyword
      // here only single quotes should be used for strings in between onsubmit function statement else it doesn't work
    );
  });
});

router.post("/", (req, res) => {
  // console.log(".post of /", req.body);
  const storedChat = Object.values(req.body).join(": "); //.join() is an array method which helps to store extracted object values which was in the form array to in the form of string and joins each values together
  fs.appendFile("chatData", "| " + storedChat + "\n", () => {
    // .appendFile is used in place of writeFile so that new chat get added in the file without removing the previous chat
    res.redirect("/");
  });
});

module.exports = router;
