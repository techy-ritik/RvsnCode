const studentModel = require('../models/student')
const idCardModel = require('../models/identityCard');

exports.addStudent = (req, res, next) => {
  console.log("req.body:", req.body);

  const studentObj = {
    name:req.body.name,
    email: req.body.email,
    age:req.body.age 
  } 

    studentModel.create(studentObj)
    .then((result) => {
      console.log(result);

      res.status(201).send("student added");
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(err.message);
    });
};

exports.fetchAllStudents = (req, res, next) => {

  studentModel.findAll()
    .then((result) => {
        console.log(result)
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(err.message);
    });
};

exports.fetchStudentById = (req, res, next) => {
  const id = req.params.id;

    studentModel.findByPk(id)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(err.message);
    });
};

exports.updateStudent = (req, res, next) => {
  const id  = req.params.id;
  const updatedStudentObj = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
  }; 


  studentModel.update(updatedStudentObj,{where:{id:id}})
    .then((result) => {
      console.log(result);

      console.log(`Student with ID ${id} updated`);

      res.status(200).send("student has been updated");
    })
    .catch((err) => {
      console.log("UPDATE ERROR:", err.message);
      res.status(500).send(err.message);
    });
};

exports.deleteStudent = (req, res, next) => {
  const  id  = req.params.id;

  studentModel.findByPk(id)
    .then((student) => {
      return student.destroy();
    })
    .then((result)=>{
      console.log(`Student with ID ${id} deleted`);

      res.status(200).send(`student with id ${id} is deleted`);
    })
    .catch((err) => {
      console.log("DELETE ERROR:", err.message);
      res.status(500).send(err.message);
    });
};

exports.addValuesToStudentAndIdentityCard =(req,res,next)=>{

  studentModel.create(req.body.student)
  .then((student)=>{
    idCardModel.create({...req.body.idCard,StudentId : student.id}) // we can pass all the column data of the table in a single object by fetching the data from different source like this using spread operator 
    .then((idCard)=>{
      res.status(201).json({student,idCard});
    })
  })
  .catch((err)=>{
    console.log(err)
    res.status(500).json({err:err.message})
  })
}