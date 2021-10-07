const { db } = require("../database");
const {createToken} = require('../helper/createToken')
const Crypto = require ('crypto')
const transporter = require('../helper/nodemailer')

module.exports = {
  getUser: (req, res) => {
    let scriptQuery = "Select * from user;"
    if (req.query.username) {
      scriptQuery = `Select * from user where username = ${db.escape(
        req.query.username
      )};`
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  addData: (req, res)=>{
    console.log(req.body)
    let {username, email, password}= req.body
    password = Crypto.createHmac("sha1", "hash123").update(password)
    console.log(password)
    let insertQuery = `insert into users value (null,${db.escape(username)},${db.escape(email)},${db.escape(password)},null,null`
    console.log(insertQuery)
    db.query(insertQuery, (err, result)=>{
      if (err){
        console.log(err)
        res.status(500).send(err)
      }
      if(result.insertId){
        let sqlGet = `select * from user where iduser = ${result.insertId};`
        db.query(sqlGet, (err2,results2)=>{
          if (err2){
            console.log(err2);
            res.status(500).send(err2)
          }
          // bahan buat token
          let{iduser, username, email, role}= results2[0]
          // membuat token
          let token = createToken({ iduser, username, email, role})

          let mail = {
            from : `Admin <shabrinaartarini46@gmail.com>`,
            to: `${email}`, 
            subject : 'Account Verification', 
            html:`<a href= 'http://localhost:3000/authentication/${token}'> Click here for your verification your account</a>`
          }
          transporter.sendMail(mail, (errMail, resMail)=>{
            if(errMail){
              console.log(errMail)
            res.status(500).send({message: "Registration failed", success: false, err: errMail})

            }
            res.status(200).send({message: "Registration success, check your mail inbox", success: true})
          })
        })
      }
    })
  },
  // verification: (req, res)=>{
  //   let updateQuery = `update user set status = 'verified' where iduser = ${req.user.iduser};`
  //   db.query(updateQuery, (err, result)=>{
  //     if(err){
  //       console.log(err);
  //       res.status(500).send(err)
  //     }
  //     res.status(200).send({message: "verified account", success: true})
  //   })
  // },


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
      role,
    } = req.body;
    let insertQuery = `Insert into user values (null, ${db.escape(
      nama_depan
    )}, ${db.escape(nama_belakang)}, ${db.escape(username)}, ${db.escape(
      email
    )}, ${db.escape(password)}, ${db.escape(jenis_kelamin)}, ${db.escape(
      verifikasi
    )}, ${db.escape(alamat)}, ${db.escape(tanggal_lahir)}, ${db.escape(
      usia
    )}, ${db.escape(foto_profil)}, ${db.escape(role)});`;
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

  verification: (req, res)=>{
    let updateQuery = `update user set status = 'verified' where iduser = ${req.user.iduser};`
    db.query(updateQuery, (err, result)=>{
      if(err){
        console.log(err);
        res.status(500).send(err)
      }
      res.status(200).send({message: "verified account", success: true})
    })
  },

};
