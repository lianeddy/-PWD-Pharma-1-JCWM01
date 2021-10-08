const { db } = require("../database");
const { createToken } = require("../helper/createToken");
const Crypto = require("crypto");
const transporter = require("../helper/nodemailer");

module.exports = {
  getUser: (req, res) => {
    let scriptQuery = "Select * from user;";
    if (req.query.username) {
      scriptQuery = `Select * from user where username = ${db.escape(
        req.query.username
      )} and password = ${db.escape(
        Crypto.createHmac("sha1", "hash123")
          .update(req.query.password)
          .digest("hex")
      )};`;
      console.log(scriptQuery);
    }
    db.query(scriptQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      if (results.length === 0)
        return res.status(404).send({ message: "User not found" });
      return res.status(200).send(results);
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
      status,
      alamat,
      tanggal_lahir,
      usia,
      foto_profil,
      role,
    } = req.body;
    password = Crypto.createHmac("sha1", "hash123")
      .update(password)
      .digest("hex");
    console.log(password);
    let insertQuery = `Insert into user values (null, ${db.escape(
      nama_depan
    )}, ${db.escape(nama_belakang)}, ${db.escape(username)}, ${db.escape(
      email
    )}, ${db.escape(password)}, ${db.escape(jenis_kelamin)}, ${db.escape(
      status
    )}, ${db.escape(alamat)}, ${db.escape(tanggal_lahir)}, ${db.escape(
      usia
    )}, ${db.escape(foto_profil)}, ${db.escape(role)});`;
    console.log(insertQuery);
    db.query(insertQuery, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      if (result.insertId) {
        let sqlGet = `select * from user where id_user = ${result.insertId};`;
        db.query(sqlGet, (err2, results2) => {
          if (err2) {
            console.log(err2);
            res.status(500).send(err2);
          }
          // bahan buat token
          let { id_user, username, email, role } = results2[0];
          // membuat token
          let token = createToken({ id_user, username, email, role });

          let mail = {
            from: `Admin <devdwikyryan@gmail.com>`,
            to: `${email}`,
            subject: "Verifikasi Akun AMR Pharmacy Anda",
            html: `<a href= 'http://localhost:3000/verification/${token}'> Klik sini untuk verifikasi akun AMR Pharmacy anda</a>`,
          };
          transporter.sendMail(mail, (errMail, resMail) => {
            if (errMail) {
              console.log(errMail);
              res.status(500).send({
                message: "Registrasi gagal",
                success: false,
                err: errMail,
              });
            }
            res.status(200).send({
              message: "Registration success, check your mail inbox",
              success: true,
            });
          });
        });
      }
    });
  },

  verification: (req, res) => {
    console.log(req.user);
    let updateQuery = `update user set status = 'VERIFIED' where id_user = ${req.user.id_user};`;
    db.query(updateQuery, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send(err);
      }
      res.status(200).send({ message: "Akun terverifikasi", success: true });
    });
  },
};
