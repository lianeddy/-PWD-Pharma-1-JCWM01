const { db } = require("../database");
const { userUploader } = require("../helper/userUploader");
const fs = require("fs");

module.exports = {
  userUpload: (req, res) => {
    try {
      let path = "/images";
      const upload = userUploader(path, "IMG").fields([{ name: "file" }]);

      upload(req, res, (error) => {
        if (error) {
          console.log(error);
          res.status(500).send(error);
        }

        const { file } = req.files;
        const filepath = file ? path + "/" + file[0].filename : null;

        let data = JSON.parse(req.body.data);
        data.image = filepath;

        let sqlInsert = `UPDATE user set nama_depan = ${db.escape(
          data.nama_depan
        )}, nama_belakang = ${db.escape(
          data.nama_belakang
        )}, username = ${db.escape(data.username)}, email = ${db.escape(
          data.email
        )}, jenis_kelamin = ${db.escape(
          data.jenis_kelamin
        )}, alamat = ${db.escape(data.alamat)}, tanggal_lahir = ${db.escape(
          data.foto_profil
        )}, foto_profil = ${db.escape(data.foto_profil)}  ;`;
        db.query(sqlInsert, (err, results) => {
          if (err) {
            console.log(err);
            fs.unlinkSync("./public" + filepath);
            res.status(500).send(err);
          }
          res.status(200).send({ message: "Upload file success" });
        });
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
};
