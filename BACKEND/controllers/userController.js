const { db } = require("../database");
const { createToken } = require("../helper/createToken");
const Crypto = require("crypto");
const transporter = require("../helper/nodemailer");
const { uploader } = require("../helpers/uploader");
const fs = require("fs");

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
    let getQuery = `SELECT * FROM user WHERE username = ${db.escape(
      username
    )} OR email = ${db.escape(email)} `;
    db.query(getQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length > 0) {
        return res
          .status(200)
          .send({
            messages: "Username atau email telah terdaftar !",
            registered: true,
            redirect: false,
            alert: "alert-warning",
          });
      }
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
          return res.status(500).send(err);
        }
        if (result.insertId) {
          let sqlGet = `select * from user where id_user = ${result.insertId};`;
          db.query(sqlGet, (err2, results2) => {
            if (err2) {
              console.log(err2);
              return res.status(500).send(err2);
            }
            // bahan buat token
            let { id_user, username, email, role } = results2[0];
            // membuat token
            let token = createToken({ id_user, username, email, role });

            let mail = {
              from: `Admin <shabrinaartarini46@gmail.com>`,
              to: `${email}`,
              subject: "Verifikasi Akun AMR Pharmacy Anda",
              html: `<a href= 'http://localhost:3000/verification/${token}'> Klik sini untuk verifikasi akun AMR Pharmacy anda</a>`,
            };
            transporter.sendMail(mail, (errMail, resMail) => {
              if (errMail) {
                console.log(errMail);
                return res.status(500).send({
                  message: "Registrasi gagal",
                  success: false,
                  err: errMail,
                });
              }
              return res.status(200).send({
                messages: "Anda berhasil di daftarkan !",
                registered: true,
                redirect: true,
                alert: "alert-success",
              });
            });
          });
        }
      });
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

  changePassword: (req, res) => {
    req.body.currentPassword = Crypto.createHmac("sha1", "hash123")
      .update(req.body.currentPassword)
      .digest("hex");

    let selectQuery = `SELECT password FROM user WHERE username = ${db.escape(
      req.body.username
    )}`;
    console.log(selectQuery);
    req.body.newPassword = Crypto.createHmac("sha1", "hash123")
      .update(req.body.newPassword)
      .digest("hex");
    let updateQuery = `UPDATE user SET password = ${db.escape(
      req.body.newPassword
    )} WHERE username = ${db.escape(req.body.username)}`;
    console.log(updateQuery);

    db.query(selectQuery, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }

      if (results[0].password == req.body.currentPassword) {
        db.query(updateQuery, (err2, results2) => {
          if (err2) return res.status(500).send(err2);
          return res.status(200).send(results2);
        });
      } else {
        return res.status(500).json({ message: "Current Password is Wrong" });
      }
    });
  },

  uploadPrescription: (req,res) => {
    console.log(req.params)
    let path = "/prescriptions";
    const upload = uploader(path, "IMG").fields([{ name: "file" }]);
    let id = parseInt(req.params.id)

    upload(req, res, (error) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      }

      // membuat nama file untuk image
      const { file } = req.files;
      const filePath = file ? path + "/" + file[0].filename : null;
      console.log('file',filePath)
      let insertQuery = `INSERT INTO prescriptions VALUES (null,${id},${db.escape(filePath)},default);`

      db.query(insertQuery, (err, result) => {
        if (err) {
          console.log(err);
          console.log(err.message);
          fs.unlinkSync("./public" + filePath);
          return res.status(500).send(err);
        }
        res
          .status(200)
          .send({
            message: "Data product berhasil ditambahkan",
            success: true,
          });
      });
    });
  
  }
};
