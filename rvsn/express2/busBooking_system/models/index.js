const userModel = require("./user");
const busModel = require("./bus");
const bookingModel = require("./booking");
const paymentModel = require("./payment");

/**one to many */
userModel.hasMany(bookingModel);
bookingModel.belongsTo(userModel);

busModel.hasMany(bookingModel);
bookingModel.belongsTo(busModel);


module.exports = {
    userModel,
    busModel,
    bookingModel,
    paymentModel
}