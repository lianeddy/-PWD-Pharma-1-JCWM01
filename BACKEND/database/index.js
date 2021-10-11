const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "pp1j",
  port: 3307,
  multipleStatements: true,
});

db.connect((err) => {
  if (err) {
    return console.error(`error: ${err.message}`);
  }
  console.log("Connected to MySQL Server");
});

module.exports = { db };
