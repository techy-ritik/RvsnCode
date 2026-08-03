const { sendErrorResponse, sendResponse } = require("../util/response");

exports.getAllUsers = (req, res) => {
  try {
    const user = req.params.user;

    if (!user) {
      let err = new Error("User not found");
      err.statusCode = 404;

      throw err;
      // return sendErrorResponse(res, {message: "User not found", statusCode: 404,});
    }

    res.json(user);

    return sendResponse(res, user, 200);
  } catch (err) {
    return sendErrorResponse(res, err);
  }
};

exports.addUser = (req, res) => {
try {
  const { name, email } = req.body;

  if (!name || !email) {

    let err = new Error("name and email are required");
    err.statusCode = 400;
    
    throw err;
    // return sendErrorResponse(res, {message: "name and email are required",statusCode: 400 });
  }

  const user = { id: 1, name, email };

  return sendResponse(res, user, 201);
} catch (err) {
  return sendErrorResponse(res,err);
}

};

exports.getUserById = (req, res) => {
  res.send(`Fetching user with ID: ${req.params.id}`);
};
