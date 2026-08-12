const Sequelize = require('sequelize')
const sequelize = require("../util/database");
const busModel = require('../models/bus');

exports.addBus = (req, res, next) => {
  const busObj = {
    busNumber: req.body.busNumber,
    totalSeats: req.body.totalSeats,
    availableSeats: req.body.availableSeats,
  };

  busModel.create(busObj)
    .then((result) => {
      console.log("Bus added");

      res.status(201).send(`bus ${busObj.busNumber} added`);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(err.message);
    });
};


exports.fetchBuses = (req, res, next) => {
  const seats = req.params.seats;

  busModel.findAll({where:{availableSeats : {[Sequelize.Op.gte] : seats}}})
    .then((result) => {
      console.log("Available buses fetched");

      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(err.message);
    });
};
