const { db } = require("../database");
const { createToken } = require("../helper/createToken");
const Crypto = require("crypto");
const transporter = require("../helper/nodemailer");

module.exports = {
  getUser: (req, res) => {
    let scriptQuery = "Select * from user;";
    if (req.query.id_user) {
      scriptQuery = `Select * from user where id_user = ${db.escape(
        req.query.id_user
      )};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  //{
  //   req.body.password = Crypto.createHmac("sha1", "hash123")
  //     .update(req.body.password)
  //     .digest("hex");
  //   let scriptQuery = `Select * from user where username = ${db.escape(
  //     req.query.username
  //   )} and password = ${db.escape(req.body.password)};`;
  //   console.log(req.body, scriptQuery);
  //   db.query(scriptQuery, (err, results) => {
  //     if (err) return res.status(500).send(err);
  //     if (results[0]) {
  //       let { id_user, username, email, password, role, status } = results[0];
  //       let token = createToken({
  //         id_user,
  //         username,
  //         email,
  //         password,
  //         role,
  //         status,
  //       });
  //       if (status != "VERIFIED") {
  //         res.status(200).send({ message: "Akun anda belum terverifikasi" });
  //       } else {
  //         res
  //           .status(200)
  //           .send({ dataLogin: results[0], token, message: "Login Success" });
  //       }
  //     }
  //   });
  // },

  addUser: (req, res) => {
    console.log(req.body);
    let {
      nama_depan,
      nama_belakang,
      email,
      password,
      jenis_kelamin,
      status,
      tanggal_lahir,
      role,
    } = req.body;
    password = Crypto.createHmac("sha1", "hash123")
      .update(password)
      .digest("hex");
    console.log(password);
    let insertQuery = `Insert into user (nama_depan, nama_belakang, email, password, jenis_kelamin, status, tanggal_lahir, role) values (${db.escape(
      nama_depan
    )}, ${db.escape(nama_belakang)}, ${db.escape(email)}, ${db.escape(
      password
    )}, ${db.escape(jenis_kelamin)}, ${db.escape(status)}, ${db.escape(
      tanggal_lahir
    )}, ${db.escape(role)});`;
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
          let { id_user, email, role } = results2[0];
          // membuat token
          let token = createToken({ id_user, email, role });

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

  editUser: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }
    let updateQuery = `UPDATE user set ${dataUpdate} where id_user = ${req.params.id};`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
