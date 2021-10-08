const { db } = require("../database");
const { uploader } = require("../helpers/uploader");
const fs = require("fs");

module.exports = {
  uploadDataProduct: (req, res) => {
    console.log("berhasil");
    let path = "/images";
    const upload = uploader(path, "IMG").fields([{ name: "file" }]);

    upload(req, res, (error) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      }

      // membuat nama file untuk image
      const { file } = req.files;
      const filePath = file ? path + "/" + file[0].filename : null;

      // mengambil data dari request body
      let {
        namaObat,
        jumlahObat,
        satuan,
        deskripsi,
        manfaat,
        komposisi,
        dosis,
        golongan,
        hargaPokok,
        hargaJual,
      } = JSON.parse(req.body.data);

      // query menyimpan data
      let insertQuery = `INSERT INTO obat VALUES (null,${db.escape(
        namaObat
      )},${db.escape(jumlahObat)},${db.escape(satuan)},${db.escape(
        deskripsi
      )},${db.escape(manfaat)},${db.escape(komposisi)},${db.escape(
        dosis
      )},${db.escape(golongan)},${db.escape(hargaPokok)},${db.escape(
        hargaJual
      )},${db.escape(filePath)});`;

      // menjalankan insert query dan mengrimkan pesanke front-end
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
  },
  getDataProduct: (req, res) => {
    console.log("data product");
    let getQuery = `SELECT * FROM obat;`;

    db.query(getQuery, (err, result) => {
      if (err) res.status(500).send(err);

      res.status(200).send(result);
    });
  },
  getDataProductId: (req, res) => {
    // console.log(req.params)
    let getQueryId = `SELECT * FROM obat WHERE id_obat=${db.escape(
      req.params.id
    )}`;

    db.query(getQueryId, (err, result) => {
      if (err) res.status(500).send(err);

      res.status(200).send(result);
    });
  },
  updateDataProduct: (req, res) => {
    console.log(req.body.data);

    let path = "/images";
    const upload = uploader(path, "IMG").fields([{ name: "file" }]);

    upload(req, res, (error) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
      }

      // mengecek apakah ada data file
      const { file } = req.files;
      // mengambil data dari request body
      let {
        idObat,
        namaObat,
        jumlahObat,
        satuan,
        deskripsi,
        manfaat,
        komposisi,
        dosis,
        golongan,
        hargaPokok,
        hargaJual,
        fotoObat,
        fotoObatLama,
      } = JSON.parse(req.body.data);

      if (file) {
        // menghapus foto sebelumnya
        // console.log('foto',fotoObatLama)
        // fs.unlinkSync('./public' + fotoObatLama)
        fs.unlink("./public" + fotoObatLama, (err) => {
          if (err) throw err;
          console.log(`./public${fotoObatLama} telah dihapus`);
        });

        // membuat nama file untuk image
        const { file } = req.files;
        const filePath = file ? path + "/" + file[0].filename : null;

        // query menyimpan data
        // let updateQuery = `UPDATE obat SET`

        let updateQuery = `UPDATE obat SET nama_obat = ${db.escape(
          namaObat
        )}, jumlah_obat = ${db.escape(jumlahObat)}, satuan = ${db.escape(
          satuan
        )}, deskripsi = ${db.escape(deskripsi)}, manfaat = ${db.escape(
          manfaat
        )}, komposisi = ${db.escape(komposisi)}, dosis = ${db.escape(
          dosis
        )}, golongan = ${db.escape(golongan)}, harga_pokok = ${db.escape(
          hargaPokok
        )}, harga_jual = ${db.escape(hargaJual)}, foto_obat = ${db.escape(
          filePath
        )} WHERE id_obat = ${db.escape(idObat)} `;

        // menjalankan insert query dan mengrimkan pesanke front-end
        db.query(updateQuery, (err, result) => {
          if (err) {
            console.log(err);
            console.log(err.message);
            fs.unlinkSync("./public" + filePath);
            return res.status(500).send(err);
          }

          let getQueryId = `SELECT * FROM obat WHERE id_obat=${db.escape(
            idObat
          )}`;
          db.query(getQueryId, (err, result) => {
            if (err) res.status(500).send(err);

            res
              .status(200)
              .send({
                result,
                message: "Data berhasil di perbarui",
                success: true,
              });
          });
        });
      } else {
        let updateQuery = `UPDATE obat SET nama_obat = ${db.escape(
          namaObat
        )}, jumlah_obat = ${db.escape(jumlahObat)}, satuan = ${db.escape(
          satuan
        )}, deskripsi = ${db.escape(deskripsi)}, manfaat = ${db.escape(
          manfaat
        )}, komposisi = ${db.escape(komposisi)}, dosis = ${db.escape(
          dosis
        )}, golongan = ${db.escape(golongan)}, harga_pokok = ${db.escape(
          hargaPokok
        )}, harga_jual = ${db.escape(hargaJual)}, foto_obat = ${db.escape(
          fotoObat
        )} WHERE id_obat = ${db.escape(idObat)} `;

        db.query(updateQuery, (err, result) => {
          if (err) res.status(500).send(err);

          let getQueryId = `SELECT * FROM obat WHERE id_obat=${db.escape(
            idObat
          )}`;
          db.query(getQueryId, (err, result) => {
            if (err) res.status(500).send(err);

            res
              .status(200)
              .send({
                result,
                message: "Data berhasil di perbarui",
                success: true,
              });
          });
        });
      }
    });
  },
};
