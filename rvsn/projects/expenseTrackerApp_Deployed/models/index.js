const userModel = require('./user');
const expenseModel = require('./expense');


userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);


module.exports = {
    userModel,
    expenseModel
}