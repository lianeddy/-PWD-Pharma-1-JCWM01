const { db } = require("../database");

module.exports = {
  getUser: (req, res) => {
    let scriptQuery = "Select * from user;";
    if (req.query.username) {
      scriptQuery = `Select * from obat where username = ${db.escape(
        req.query.username
      )};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  addUser: (req, res) => {
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
      db.query(
        `Select * from user where username = ${db.escape(username)};`,
        (err2, results2) => {
          if (err2) res.status(500).send(err2);
          res
            .status(200)
            .send({ message: "Penambahan user berhasil", data: results2 });
        }
      );
    });
  },
};
