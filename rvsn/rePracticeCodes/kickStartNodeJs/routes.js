const fs = require("fs");

const requestHandler = ((req,res)=>{
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    return fs.readFile("testFiles", "utf8", (err, data) => {
      if (err) {
        console.log(err);
      }

      // console.log("data", data);
      res.write("<html>");
      res.write("<head><title>node.Js revision</title></head>");
      res.write(data);
      res.write(
        '<body><form action="/message" method="POST"><input type="text" name="enterName" id="name"><button type="submit">submit</button></form></body>',
      );
      res.write("</html>");
      return res.end();
    });
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    req.on("data", (chunk) => {
      console.log(chunk);
      body.push(chunk);
    });

    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const inputData = parsedBody.split("=")[1];
      const originalInput = inputData.replaceAll("+", " ");
      console.log(originalInput);
      fs.writeFile("testFiles", originalInput, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>node.Js revision</title></head>");
  res.write("<body><h1>Jay shree Ram</h1></body>");
  res.write("</html>");
  res.end();
  // process.exit();
})


module.exports = requestHandler;

// // other methods for exports :-
// // mainly used for multiple exports :-

// //method 1:-
// module.exports = {
//     handler : requestHandler,
//     someText : "routes exports with method 1",
// }

// //method 2 :-
// module.exports.handler = requestHandler;
// module.exports.someText = "routes exports with method 2"

// //method 3 :-
// exports.handler = requestHandler;
// exports.someText = "routes exports with method 3"