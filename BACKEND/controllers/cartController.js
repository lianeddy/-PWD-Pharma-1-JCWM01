const { db } = require("../database");

module.exports = {
  addToCart: (req, res) => {
    console.log(req.body);
    let { email, idobat, qty_obat, harga } = req.body;
    let insertQuery = `Insert into cart values (null, ${db.escape(
      email
    )}, ${db.escape(idobat)}, ${db.escape(qty_obat)}, ${db.escape(
      harga
    )}, "PENDING");`;
    console.log(insertQuery);
    db.query(insertQuery, (err, result) => {
      if (err) res.status(500).send(err);
      db.query(
        `Select * from cart where email = ${db.escape(email)};`,
        (err2, result2) => {
          if (err2) res.status(500).send(err2);
          return res.status(200).send({
            message: `Berhasil menambah barang ke Cart`,
            data: result2,
          });
        }
      );
    });
  },
  getCart: (req, res) => {
    let scriptQuery = "Select * from cart;";
    if (req.params.email) {
      scriptQuery = `Select * from cart where email = ${db.escape(
        req.params.email
      )} and idobat = ${req.params.idobat};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(results);
    });
  },
  editCart: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }
    let updateQuery = `UPDATE cart set ${dataUpdate} where email = ${db.escape(
      req.params.email
    )};`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      return res.status(200).send(results);
    });
  },
};
