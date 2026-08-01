const express = require("express");

const router = express.Router();

// const courseData = require("../data/allData");
const {courses} = require("../data/allData");

router.get("/courses", (req, res) => {
  const allCourses = courses.map((course) => course.name).join(", ");

  res.send(`Courses: ${allCourses}`);
});

router.get("/courses/:id", (req, res) => {
  const id = Number(req.params.id);

  const currentCourse = courses.find((course) => course.id === id);

  if (!currentCourse) {
    return res.send("Course not found");
  }

  res.send(
    `Course: ${currentCourse.name}, Description: ${currentCourse.description}`,
  );
});

module.exports = router;