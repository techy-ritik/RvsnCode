exports.getAllUsers = (req, res) => {
  res.send("Fetching all users");
};

exports.addUser = (req, res) => {
  res.send("Adding a new user");
};

exports.getUserById = (req, res) => {
  res.send(`Fetching user with ID: ${req.params.id}`);
};
