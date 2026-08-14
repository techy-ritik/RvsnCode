const courseModel = require('../models/courses');
const studentModel = require('../models/student');
const studentCourseModel = require('../models/studentCourses');

exports.addCourses = (req,res,next)=>{
    courseModel.create({'name':req.body.name})
    .then((course)=>{
        res.status(201).json(course)
    })
    .catch((err)=>{
        console.log(err)
        res.status(500).json({err:err.message})
    })
}

exports.addStudentToCourses = (req,res,next)=>{
    const {studentId,courseIds} = req.body;

    studentModel.findByPk(studentId)
    .then((student)=>{
        courseModel.findAll({where:{id:courseIds}})
        .then((courses)=>{
            return student.addCourses(courses)
        })
    })
    .then(()=>{
        return studentModel.findByPk(studentId,{include:courseModel})
    })
    .then((updatedStudent)=>{
        res.status(200).json(updatedStudent)
    })
    .catch((err)=>{
        res.status(500).json({err:err.message})
    })
}