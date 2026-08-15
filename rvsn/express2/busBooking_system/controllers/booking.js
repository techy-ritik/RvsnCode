const sequelize = require("../util/database");

const bookingModel = require("../models/booking");
const userModel = require("../models/user");
const busModel = require("../models/bus");

exports.addBooking = (req, res, next) => {
  const { userId, busId, seatNumber } = req.body;

  userModel
    .findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({message:"user not found"})
      }
      return busModel.findByPk(busId);
    })
    .then((bus) => {
      if (!bus) {
        return res.status(404).json({message:"bus not found"})
      }
      return bookingModel.create({
        userId: userId,
        busId: busId,
        seatNumber: seatNumber,
      });
    })
    .then((booking) => {
      console.log(booking);
      res.status(201).json(booking);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({message:"something went wrong"})
    });
};

exports.fetchBookingForUser=(req,res,next)=>{
    const userId = req.params.id;
    bookingModel.findAll({where:{userId:userId},attributes:['id','seatNumber'], include:{model:busModel,attributes:["busNumber"]}})
    .then((booking)=>{
        res.status(200).json(booking)
    })
    .catch((err)=>{
        res.status(500).json({message:err.message})
    })
}

exports.fetchBookingForBus=(req,res,next)=>{
    const busId = req.params.id;
    bookingModel
      .findAll({
        where: { busId: busId },
        attributes: ["id", "seatNumber"],
        include: { model: userModel, attributes: ["name",'email'] },
      })
      .then((booking) => {
        res.status(200).json(booking);
      })
      .catch((err) => {
        res.status(500).json({ message: err.message });
      });
}