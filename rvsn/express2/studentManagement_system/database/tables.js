const db = require('../util/database');

function createStudentTable(){
    db.execute( `CREATE TABLE IF NOT EXISTS students (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL, email VARCHAR(255) UNIQUE NOT NULL,age INT NOT NULL)`)
      .then(() => {
        console.log("Students table created");
      })
      .catch((err) => {
        console.log(err.message);
      });
}

module.exports = createStudentTable;