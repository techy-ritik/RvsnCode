const express = require('express');

const app = express();

app.use(express.json({ extended: false }));

const studentRoute = require('./routes/students')
const courseRoute = require('./routes/courses')

app.get("/", (req, res) => {
  res.send("Welcome to the Student & Course Portal API!");
});

app.use(studentRoute);
app.use(courseRoute);

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(4000, () => {
  console.log("Server is running on http://localhost:4000");
});