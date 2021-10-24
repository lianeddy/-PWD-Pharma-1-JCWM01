const { db } = require("../database");
const { createToken } = require("../helper/createToken");
const Crypto = require("crypto");
const transporter = require("../helper/nodemailer");
const { uploader } = require("../helpers/uploader");
const fs = require("fs");

module.exports = {
  getUser: (req, res) => {
    let scriptQuery = "Select * from user;";
    if (req.query.email) {
      scriptQuery = `Select * from user where email= ${db.escape(
        req.query.email
      )};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  loginUser: (req, res) => {
    req.body.password = Crypto.createHmac("sha1", "hash123")
      .update(req.body.password)
      .digest("hex");
    let scriptQuery = `SELECT * FROM user WHERE email = ${db.escape(
      req.body.email
    )} AND password = ${db.escape(req.body.password)};`;

    db.query(scriptQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      if (results[0]) {
        let {
          id_user,
          nama_depan,
          nama_belakang,
          email,
          password,
          jenis_kelamin,
          tanggal_lahir,
          usia,
          foto_profil,
          role,
          status,
        } = results[0];

        let token = createToken({
          id_user,
          nama_depan,
          nama_belakang,
          email,
          password,
          jenis_kelamin,
          tanggal_lahir,
          usia,
          foto_profil,
          role,
          status,
        });

        if (status != "VERIFIED") {
          return res.status(200).send({
            dataLogin: null,
            token: null,
            message: "Your account is not verified",
          });
        } else {
          return res
            .status(200)
            .send({ dataLogin: results[0], token, message: "Login Success" });
        }
      } else {
        // Jika tidak dapat data (user not found)
        return res
          .status(200)
          .send({ dataLogin: 1, token: null, message: "Login Failed" });
      }
    });
  },

  addUser: (req, res) => {
    let {
      nama_depan,
      nama_belakang,
      email,
      alamat,
      usia,
      foto_profil,
      jenis_kelamin,
      tanggal_lahir,
      password,
      status,
      role,
    } = req.body;
    password = Crypto.createHmac("sha1", "hash123")
      .update(password)
      .digest("hex");
    let getQuery = `SELECT * FROM user WHERE email = ${db.escape(email)} `;
    db.query(getQuery, (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (result.length > 0) {
        return res.status(200).send({
          messages: "Email telah terdaftar !",
          registered: true,
          redirect: false,
          alert: "alert-warning",
        });
      }
      console.log(password);
      let insertQuery = `insert into user (nama_depan, nama_belakang, email, password, jenis_kelamin, status, tanggal_lahir, role) values (${db.escape(
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
            let { id_user, email, role } = results2[0];
            // membuat token
            let token = createToken({ id_user, email, role });

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

    let selectQuery = `SELECT password FROM user WHERE email = ${db.escape(
      req.body.email
    )}`;
    console.log(selectQuery);
    req.body.newPassword = Crypto.createHmac("sha1", "hash123")
      .update(req.body.newPassword)
      .digest("hex");
    selectQuery = `SELECT password FROM user WHERE email = ${db.escape(
      req.body.email
    )}`;
    console.log(selectQuery);
    let updateQuery = `UPDATE user SET password = ${db.escape(
      req.body.newPassword
    )} WHERE email = ${db.escape(req.body.email)}`;
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

  uploadPrescription: (req, res) => {
    console.log(req.params);
    let path = "/prescriptions";
    const upload = uploader(path, "IMG").fields([{ name: "file" }]);
    let id = parseInt(req.params.id);

    upload(req, res, (error) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      }

      // membuat nama file untuk image
      const { file } = req.files;
      const filePath = file ? path + "/" + file[0].filename : null;
      console.log("file", filePath);
      let insertQuery = `INSERT INTO prescriptions VALUES (null,${id},${db.escape(
        filePath
      )},default);`;

      db.query(insertQuery, (err, result) => {
        if (err) {
          console.log(err);
          console.log(err.message);
          fs.unlinkSync("./public" + filePath);
          return res.status(500).send(err);
        }
        res.status(200).send({
          message: "Data product berhasil ditambahkan",
          success: true,
        });
      });
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

  keepLogin: (req, res) => {
    let scriptQuery = `SELECT * FROM user WHERE id_user = ${db.escape(
      req.body.id_user
    )};`;

    db.query(scriptQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      if (results[0]) {
        let {
          id_user,
          nama_depan,
          nama_belakang,
          email,
          password,
          jenis_kelamin,
          tanggal_lahir,
          usia,
          foto_profil,
          role,
          status,
        } = results[0];

        let token = createToken({
          id_user,
          nama_depan,
          nama_belakang,
          email,
          password,
          jenis_kelamin,
          tanggal_lahir,
          usia,
          foto_profil,
          role,
          status,
        });

        return res.status(200).send({
          dataLogin: results[0],
          token,
          message: "Keep Login Success",
        });
      } else {
        // Jika tidak dapat data (user not found)
        return res
          .status(200)
          .send({ dataLogin: null, token: null, message: "Keep Login Failed" });
      }
    });
  },
};
