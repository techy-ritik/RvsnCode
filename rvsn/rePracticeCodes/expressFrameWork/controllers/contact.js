const path = require("path");

const rootDir = require("../util/path");

exports.getContact = (req, res) => {
  res.sendFile(path.join(rootDir, "views/contactUs.html"));
};

exports.postContact = (req, res) => {
  res.redirect("/success");
  // res.sendFile(path.join(rootDir, "views/successMsg.html"));
};

exports.postSuccess = (req, res) => {
  res.sendFile(path.join(rootDir, "views/successMsg.html"));
};