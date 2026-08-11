const express = require('express');

const router = express.Router();

const studentController = require('../controllers/student')

router.post('/students',studentController.addStudent);

router.get('/students',studentController.fetchAllStudents);

router.get('/students/:id',studentController.fetchStudentById);

router.put("/students/:id",studentController.updateStudent);

router.delete("/students/:id",studentController.deleteStudent);

module.exports = router;