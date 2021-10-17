const { db } = require("../database");

module.exports = {
  getRawDrugs: (req, res) => {
    let scriptQuery =
      "select prescription_request.id_request, user.nama_depan, user.nama_belakang, user.email, prescription_request.request_date from prescription_request left join user on user.id_user = prescription_request.id_user;";
    if (req.query.id_request) {
      scriptQuery = `select user.id_user, user.nama_depan, user.nama_belakang, user.email, prescription_request.request_date from prescription_request
            left join user on user.id_user = prescription_request.id_user
            where prescription_request.id_request = ${db.escape(
              req.query.id_request
            )};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  prescriptionToCart: (req, res) => {
    console.log(req.body);
    let { id_user, id_bahan_obat, kandungan } = req.body;
    let insertQuery = `Insert into prescription_cart (id_user, id_bahan_obat, kandungan) values (${db.escape(
      id_user
    )}, ${db.escape(id_bahan_obat)}, ${db.escape(kandungan)});`;
    console.log(insertQuery);
    db.query(insertQuery, (err, result) => {
      if (err) res.status(500).send(err);
      db.query(
        `Select * from prescription_cart where id_user = ${db.escape(
          id_user
        )};`,
        (err2, result2) => {
          if (err2) res.status(500).send(err2);
          return res.status(200).send({
            message: `Berhasil menambah permintaan resep ke cart user`,
            data: result2,
          });
        }
      );
    });
  },
};
