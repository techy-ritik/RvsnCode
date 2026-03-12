const http = require("http");

const routes = require('./routes');

const server = http.createServer(routes);

// //routes import with other export methods

// const server = http.createServer(routes.handler);
// console.log(routes.someText)

console.log("Ritikesh");

server.listen(4000);
