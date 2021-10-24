const { db } = require("../database");

module.exports = {
  getRawDrugs: (req, res) => {
    let scriptQuery =
      "select prescriptions.id_prescriptions, user.nama_depan, user.nama_belakang, user.email from prescriptions left join user on user.id_user = prescriptions.id_user;";
    if (req.query.id_prescriptions) {
      scriptQuery = `select user.id_user, user.nama_depan, user.nama_belakang, user.email, prescriptions.id_prescriptions, prescriptions.foto_prescription from prescriptions
            left join user on user.id_user = prescriptions.id_user
            where prescriptions.id_prescriptions = ${db.escape(
              req.query.id_prescriptions
            )};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  restockRawDrugs: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }
    let updateQuery = `UPDATE obat_bahan set ${dataUpdate} where id_bahan_obat = ${req.params.id};`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      return res.status(200).send(results);
    });
  },

  prescriptionToCart: (req, res) => {
    console.log(req.body);
    let { id_user, id_bahan_obat, kandungan } = req.body;
    let insertQuery = `Insert into prescription_cart (id_user, id_bahan_obat, kandungan, status) values (${db.escape(
      id_user
    )}, ${db.escape(id_bahan_obat)}, ${db.escape(
      kandungan
    )}, "MENUNGGU PEMBAYARAN");`;
    console.log(insertQuery);
    db.query(insertQuery, (err, result) => {
      if (err) return res.status(500).send(err);
      db.query(
        `Select * from prescription_cart where id_user = ${db.escape(
          id_user
        )};`,
        (err2, result2) => {
          if (err2) return res.status(500).send(err2);
          return res.status(200).send({
            message: `Berhasil menambah permintaan resep ke cart user`,
            data: result2,
          });
        }
      );
    });
  },

  deletePrescriptionRequest: (req, res) => {
    let deleteQuery = `Delete from prescriptions where id_prescriptions = ${db.escape(
      req.params.id_prescriptions
    )};`;
    console.log(deleteQuery);
    db.query(deleteQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
