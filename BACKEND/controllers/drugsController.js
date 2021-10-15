const { db } = require("../database");

module.exports = {
  getData: (req, res) => {
    let scriptQuery = "Select * from obat;";
    if (req.query.idobat) {
      scriptQuery = `Select * from obat where idobat = ${db.escape(
        req.query.idobat
      )};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  addData: (req, res) => {
    let {
      nama_obat,
      deskripsi,
      manfaat,
      komposisi,
      dosis,
      golongan,
      kemasan,
      harga_pokok,
      harga_jual,
      foto_obat,
    } = req.body;
    console.log(req.body);
    let insertQuery = `Insert into obat values (null, ${db.escape(
      nama_obat
    )}, ${db.escape(deskripsi)}, ${db.escape(manfaat)}, ${db.escape(
      komposisi
    )}, ${db.escape(dosis)}, ${db.escape(golongan)}, ${db.escape(
      kemasan
    )}, ${db.escape(harga_pokok)}, ${db.escape(harga_jual)}, ${db.escape(
      foto_obat
    )});`;
    console.log(insertQuery);
    db.query(insertQuery, (err, results) => {
      if (err) res.status(500).send(err);
      db.query(
        `Select * from obat where nama_obat = ${db.escape(nama_obat)};`,
        (err2, results2) => {
          if (err2) res.status(500).send(err2);
          res
            .status(200)
            .send({ message: "Penambahan user berhasil", data: results2 });
        }
      );
    });
  },
  editData: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }

    let updateQuery = `UPDATE obat set ${dataUpdate} where idobat = ${req.params.id};`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  deleteData: (req, res) => {
    let deleteQuery = `DELETE from obat where idobat = ${db.escape(
      req.params.idobat
    )};`;

    db.query(deleteQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
  getRawDrug: (req, res) => {
    let scriptQuery = "Select * from obat_bahan;";
    if (req.query.idobat) {
      scriptQuery = `Select * from obat where id_bahan_obat = ${db.escape(
        req.query.idobat
      )};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
