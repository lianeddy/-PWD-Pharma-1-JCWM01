const { db } = require("../database");
const Crypto = require("crypto")
module.exports = {
  getUser: (req, res) => {
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
  },
  addUser: (req, res) => {
    
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
    
    // hasing password
    password = Crypto.createHmac("sha1", "hash123").update(password).digest("hex")
    

    // mengecek apakah username atau email telah terdaftar
    let getQuery = `SELECT * FROM user WHERE username = ${db.escape(username)} OR email = ${db.escape(email)} `
    db.query(getQuery, (err, result) => {
      if(err){
        return res.status(500).send(err)
      }

      // jika data telah terdaftar
      if(result.length > 0){
        res.status(200).send({messages : "Username atau email telah terdaftar !", registered: true, redirect:false, alert: "alert-warning"})
      }else{
        console.log("masuk")
        // jika data belum terdaftar
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
          if (err) {
            console.log(err)
            return res.status(500).send(err);
          }
          db.query(
            `Select * from user where username = ${db.escape(username)};`,
            (err2, results2) => {
              if (err2) res.status(500).send(err2);
              res
                .status(200)
                .send({ messages: "Anda berhasil ditambahkan", registered: true, redirect:true, alert: "alert-success"});
            }
          );
        })
      }
    })


  },
};
