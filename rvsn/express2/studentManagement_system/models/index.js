const studentModel = require('./student');
const identityModel = require('./identityCard');
const departmentModel = require('./department');

/**one to one */
studentModel.hasOne(identityModel);
identityModel.belongsTo(studentModel);

/** one to many */
departmentModel.hasMany(studentModel);
studentModel.belongsTo(departmentModel);


module.exports = {
    studentModel,
    identityModel,
    departmentModel
}