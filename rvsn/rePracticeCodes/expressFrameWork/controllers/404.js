const path = require("path");

const rootDir = require("../util/path");

exports.use404 = (req, res, next) => {
  //this middleware is used to handle all the other routes which is not specificially handled by different route handling middlewares and thus it protects the website from showing irregular text to the user
  res.status(404).sendFile(path.join(rootDir, "views", "404.html")); // status code is set to 404(used for page not found) which will be responded by the sever when enterd route will not found
};
