const userModel = require('./user');
const expenseModel = require('./expense');
const orderModel = require('./order');


userModel.hasMany(expenseModel);
expenseModel.belongsTo(userModel);

userModel.hasMany(orderModel);
orderModel.belongsTo(userModel);


module.exports = {
    userModel,
    expenseModel,
    orderModel
}