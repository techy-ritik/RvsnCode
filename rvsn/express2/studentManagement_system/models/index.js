const studentModel = require('./student');
const identityModel = require('./identityCard');
const departmentModel = require('./department');
const courseModel = require('./courses');
const studentCourseModel = require('./studentCourses');

/**one to one */
studentModel.hasOne(identityModel);
identityModel.belongsTo(studentModel);

/** one to many */
departmentModel.hasMany(studentModel);
studentModel.belongsTo(departmentModel);

/**many to many */
studentModel.belongsToMany(courseModel,{through:studentCourseModel});
courseModel.belongsToMany(studentModel,{through:studentCourseModel});


module.exports = {
    studentModel,
    identityModel,
    departmentModel,
    courseModel,
    studentCourseModel
}