const { db } = require("../database");

module.exports = {
  getCart: (req, res) => {
    let scriptQuery = `Select * from cart where id_user = ${db.escape(
      req.query.id_user
    )};`;
    // if (req.query.id_user) {
    //   scriptQuery = `Select * from cart where id_user = ${db.escape(
    //     req.query.id_user
    //   )}`;
    // } else

    if (req.query.id_user && req.query.idobat) {
      scriptQuery = `Select * from cart where id_user = ${db.escape(
        req.query.id_user
      )} and idobat = ${db.escape(req.query.idobat)};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(results);
    });
  },

  addToCart: (req, res) => {
    console.log(req.body);
    let { id_user, idobat, qty_obat, harga, status } = req.body;
    let insertQuery = `Insert into cart (id_user, idobat, qty_obat, harga, status) values(${db.escape(
      id_user
    )}, ${db.escape(idobat)}, ${db.escape(qty_obat)}, ${db.escape(
      harga
    )}, ${db.escape(status)});`;
    console.log(insertQuery);
    db.query(insertQuery, (err, result) => {
      if (err) res.status(500).send(err);
      db.query(
        `Select * from cart where id_user = ${db.escape(id_user)};`,
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

  editCart: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }
    let updateQuery = `UPDATE cart set ${dataUpdate} where id_cart = ${db.escape(
      req.params.id
    )};`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      return res.status(200).send(results);
    });
  },

  renderCart: (req, res) => {
    let scriptQuery = "Select * from obat;";
    if (req.query.id_user) {
      scriptQuery = `select obat.foto_obat, obat.nama_obat, cart.qty_obat, cart.harga from cart
      left join user on
      user.id_user = cart.id_user
      left join obat on obat.idobat = cart.idobat
      where cart.id_user = ${db.escape(req.query.id_user)};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
