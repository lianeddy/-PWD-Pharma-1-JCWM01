const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const PORT = 3300;
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Incorrect100%",
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

app.get("/", (req, res) => {
  res.status(200).send("<h4>Integrated MySQL with express</h4>");
});

app.get("/user", (req, res) => {
  let scriptQuery = "Select * from user;";
  if (req.query.username) {
    scriptQuery = `Select * from user where username = ${db.escape(
      req.query.username
    )};`;
  }
  db.query(scriptQuery, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
});

app.post("/add-user", (req, res) => {
  console.log(req.body);
  let {
    nama_depan,
    nama_belakang,
    username,
    email,
    password,
    jenis_kelamin,
    verifikasi,
    alamat,
    tanggal_lahir,
    usia,
    foto_profil,
  } = req.body;
  let insertQuery = `Insert into user values (null, ${db.escape(
    nama_depan
  )}, ${db.escape(nama_belakang)}, ${db.escape(username)}, ${db.escape(
    email
  )}, ${db.escape(password)}, ${db.escape(jenis_kelamin)}, ${db.escape(
    verifikasi
  )}, ${db.escape(alamat)}, ${db.escape(tanggal_lahir)}, ${db.escape(
    usia
  )}, ${db.escape(foto_profil)});`;
  console.log(insertQuery);
  db.query(insertQuery, (err, results) => {
    if (err) res.status(500).send(err);
    res.status(200).send(results);
  });
});

app.listen(PORT, () => console.log("API Running: ", PORT));
