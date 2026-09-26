const userModel = require('./user');
const expenseModel = require('./expense');
const orderModel = require('./order');
const forgotPassowrdRequestModel = require('../models/forgotPasswordRequestes');


userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);

userModel.hasMany(orderModel);
orderModel.belongsTo(userModel);

userModel.hasMany(forgotPassowrdRequestModel);
forgotPassowrdRequestModel.belongsTo(userModel);


module.exports = {
    userModel,
    expenseModel,
    orderModel,
    forgotPassowrdRequestModel
}