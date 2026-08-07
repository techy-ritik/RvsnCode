const db = require("../util/database");

async function createTables() {
  try {
    await db.execute(
      `CREATE TABLE IF NOT EXISTS Users (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),email VARCHAR(255));`,
    );
    await db.execute(
      `CREATE TABLE IF NOT EXISTS Buses (id INT AUTO_INCREMENT PRIMARY KEY,busNumber VARCHAR(255),totalSeats INT,availableSeats INT);`,
    );
    await db.execute(
      `CREATE TABLE IF NOT EXISTS Bookings (id INT AUTO_INCREMENT PRIMARY KEY,seatNumber INT);`,
    );
    await db.execute(
      `CREATE TABLE IF NOT EXISTS Payments (id INT AUTO_INCREMENT PRIMARY KEY,amountPaid DECIMAL(10,2),paymentStatus VARCHAR(255));`,
    );
  } catch (error) {
    console.log(error);
  }
}

module.exports = createTables;
