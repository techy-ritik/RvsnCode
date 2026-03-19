const http = require('http');
console.log("Jay Hanuman")

const express = require('express');

const app = express();  // app is  basically a seerver object which handle requests and runs the server

app.use((req,res,next)=>{
    console.log("in the middleware");
    next(); // this method is used to accept the request from the next middleware in line
})

app.use((req,res,next)=>{
    console.log("in the 2nd middleware");
    res.send('<h1>Jay Hanuman ji</h1>')  // send default html responses to the server without manually setting the content type Header
})


const server = http.createServer(app)
server.listen(3000);