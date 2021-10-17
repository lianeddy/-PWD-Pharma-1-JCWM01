const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
<<<<<<< Updated upstream
  password: "Mu$lim100%",
=======
  password: "Muslim100%",
>>>>>>> Stashed changes
  database: "db_pharma",
  port: 3306,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    return console.error(`error: ${err.message}`);
  }
  console.log("Connected to MySQL Server");
});

module.exports = { db };
