const db = require("../util/database");
const tables = require("../database/tables");

exports.addBus = (req, res, next) => {
  const { busNumber, totalSeats, availableSeats } = req.body;

  const insertQuery =
    "INSERT INTO Buses (busNumber, totalSeats, availableSeats) VALUES (?, ?, ?)";

  db.execute(insertQuery, [busNumber, totalSeats, availableSeats])
    .then((result) => {
      console.log("Bus added");

      res.status(201).send(`bus ${busNumber} added`);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(err.message);
    });
};


exports.fetchBuses = (req, res, next) => {
  const { seats } = req.params;

  const selectQuery = "SELECT * FROM Buses WHERE availableSeats >= ?";

  db.execute(selectQuery, [seats])
    .then(([result]) => {
      console.log("Available buses fetched");

      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).send(err.message);
    });
};
