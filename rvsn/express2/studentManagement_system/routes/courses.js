const express = require('express');
const router = express.Router();

const courseController = require('../controllers/courses')

router.post('/addCourse',courseController.addCourses);

router.post('/addStudentCourses',courseController.addStudentToCourses);

module.exports = router;