const express = require('express');

const router=express.Router();

router.get('/login',(req,res)=>{
    res.send('<form action="/" method="POST">Enter username:- <input type="text" name="login"><button>login</button></form>')
    
})

router.post("/", (req, res) => {
  res.send(
    '<form action="/" method="POST">Send message:- <input type="text" name="message"><button>send</button></form>',
  );
});

module.exports=router;