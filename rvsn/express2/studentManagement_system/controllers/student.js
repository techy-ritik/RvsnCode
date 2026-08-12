const db = require("../util/database");
const studentModel = require('../models/student')

exports.addStudent = (req, res, next) => {
  // console.log("req.body:", req.body);

  // const { name, email, age } = req.body;

  // const insertQuery =
  //   "INSERT INTO students (name, email, age) VALUES (?, ?, ?)";

  // db.execute(insertQuery, [name, email, age])
  //   .then(([result]) => {
  //     console.log(result);

  //     res.status(201).send(`student ${name} added`);
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //     res.status(500).send(err.message);
  //   });
};

exports.fetchAllStudents = (req, res, next) => {
  // const selectQuery = "SELECT * FROM students";

  // db.execute(selectQuery)
  //   .then(([result]) => {
  //       console.log(result)
  //     res.status(200).json(result);
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //     res.status(500).send(err.message);
  //   });
};

exports.fetchStudentById = (req, res, next) => {
  // const { id } = req.params;

  // const selectQuery = "SELECT * FROM students WHERE id = ?";

  // db.execute(selectQuery, [id])
  //   .then(([result]) => {
  //     if (result.length === 0) {
  //       return res.status(404).send("student not found");
  //     }

  //     res.status(200).json(result[0]);
  //   })
  //   .catch((err) => {
  //     console.log(err.message);
  //     res.status(500).send(err.message);
  //   });
};

exports.updateStudent = (req, res, next) => {
  // const { id } = req.params;
  // const { name, email, age } = req.body;

  // const updateQuery =
  //   "UPDATE students SET name = ?, email = ?, age = ? WHERE id = ?";

  // db.execute(updateQuery, [name, email, age, id])
  //   .then(([result]) => {
  //     if (result.affectedRows === 0) {
  //       return res.status(404).send("student not found");
  //     }

  //     console.log(`Student with ID ${id} updated`);

  //     res.status(200).send("student has been updated");
  //   })
  //   .catch((err) => {
  //     console.log("UPDATE ERROR:", err.message);
  //     res.status(500).send(err.message);
  //   });
};

exports.deleteStudent = (req, res, next) => {
  // const { id } = req.params;

  // const deleteQuery = "DELETE FROM students WHERE id = ?";

  // db.execute(deleteQuery, [id])
  //   .then(([result]) => {
  //     if (result.affectedRows === 0) {
  //       return res.status(404).send("student not found");
  //     }

  //     console.log(`Student with ID ${id} deleted`);

  //     res.status(200).send(`student with id ${id} is deleted`);
  //   })
  //   .catch((err) => {
  //     console.log("DELETE ERROR:", err.message);
  //     res.status(500).send(err.message);
  //   });
};
