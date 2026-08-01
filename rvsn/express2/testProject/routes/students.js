const express = require("express");

const router = express.Router();

// const studentsData = require("../data/allData");

const {students} = require("../data/allData");

router.get("/students", (req, res) => {
  const allStudents = students.map((student) => student.name).join(", ");

  res.send(`Students: ${allStudents}`);
});

router.get("/students/:id", (req, res) => {
  const id = Number(req.params.id);

  const currentStudent = students.find((student) => student.id === id);

  if (!currentStudent) {
    return res.send("Student not found");
  }

  res.send(`Student: ${currentStudent.name}`);
});

module.exports = router;