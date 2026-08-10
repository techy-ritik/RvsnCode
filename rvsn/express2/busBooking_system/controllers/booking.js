const db = require("../util/database");
const tables = require("../database/tables");

exports.addEntries = (req, res, next) => {
  console.log("req.body", req.body);
  const { id, name, email } = req.body;

  const insertQuerry = "INSERT INTO Users (id,name,email) VALUES (?,?,?)";

  db.execute(insertQuerry, [id, name, email])
    .then(([result]) => {
      console.log("value added");
      res.status(201).send(`user ${name} added`);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(err.message);
      return;
    });
};

exports.updateEntry = (req, res, next) => {
  const { id } = req.params;
  const { name,email } = req.body;

  const updateQuery = "UPDATE users set name = ? WHERE id = ?";

  db.execute(updateQuery, [name,id])
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send("user not found");
        return;
      }

      res.status(200).send("user has been updated");
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(err.message);
      return;
    });
};

exports.deleteEntry = (req, res, next) => {
  const { id } = req.params;
  const deleteQuery = `DELETE FROM users WHERE id=?`;

  db.execute(deleteQuery, [id])
    .then((result) => {
      if (result.affectedRows === 0) {
        res.status(404).send("user not found");
        return;
      }

      res.status(200).send(`user with ${id} is deleted`);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(err.message);
      return;
    });
};
