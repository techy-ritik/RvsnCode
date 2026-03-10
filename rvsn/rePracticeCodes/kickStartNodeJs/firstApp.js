const http = require("http");
const fs = require("fs");


const server = http.createServer((req, res) => {
  console.log(req.url,req.method,req.headers);

  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>node.Js revision</title></head>");
    res.write(
      '<body><form action="/message" method="POST"><input type="text" name="enterName" id="name"></input><button type="submit">submit</button></form></body>',
    );
    res.write("</html>");
    return res.end();
  } 

  if(url==='/message' && method === 'POST'){
    
    const body = [];

    req.on('data',(chunk)=>{
      console.log(chunk);
      body.push(chunk);
    })

    req.on('end',()=>{
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const inputData = parsedBody.split('=')[1];
      const originalInput = inputData.replaceAll('+'," ")
      console.log(originalInput);
      fs.writeFileSync("testFiles",originalInput);
      
    })

    
    res.statusCode=302;
    res.setHeader('Location',"/");
    return res.end();
  }

  res.setHeader('Content-Type','text/html');
  res.write('<html>')
    res.write('<head><title>node.Js revision</title></head>')
    res.write('<body><h1>Jay shree Ram</h1></body>')
  res.write('</html>');
  res.end();
  // process.exit();
});

console.log("Ritikesh");



server.listen(4000);




// //earlier code


// const http = require("http");

// function rqListener(req,res){

// };
// http.createServer(rqListener);


// const server = http.createServer((req, res) => {
//   console.log(req.url, req.method, req.headers);

//   res.setHeader("Content-Type", "text/html");
//   res.write("<html>");
//   res.write("<head><title>my response</title></head>");
//   res.write("<body><h1>Ritikesh Kumar</h1></body>");
//   res.write("</html>");
//   res.end();
//   // process.exit();
// });

// server.listen(4000);