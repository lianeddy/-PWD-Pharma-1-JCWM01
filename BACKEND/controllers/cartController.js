const { db } = require("../database");

module.exports = {
  getCart: (req, res) => {
    let scriptQuery = `Select * from cart where id_user = ${db.escape(
      req.query.id_user
    )} and status = "Menunggu Pembayaran";`;
    // if (req.query.id_user) {
    //   scriptQuery = `Select * from cart where id_user = ${db.escape(
    //     req.query.id_user
    //   )}`;
    // } else

    if (req.query.id_user && req.query.idobat && req.query.status) {
      scriptQuery = `Select * from cart where id_user = ${db.escape(
        req.query.id_user
      )} and idobat = ${db.escape(req.query.idobat)} and status = ${db.escape(
        req.query.status
      )};`;
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

  getCheckOut: (req, res) => {
    let scriptQuery = `select checkout.idcheckout, checkout.id_user, checkout.tanggal, user.nama_depan, user.nama_belakang, checkout.total, checkout.status, checkout.payment_proof from checkout
    left join user on
    user.id_user = checkout.id_user;`;
    if (req.query.status) {
      scriptQuery = `Select * from checkout where id_user = ${db.escape(
        req.query.id_user
      )} and status = ${db.escape(req.query.status)};`;
    }
    console.log(scriptQuery);
    db.query(scriptQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(results);
    });
  },

  userCheckOut: (req, res) => {
    console.log(req.body);
    let { id_user, total, status, tanggal } = req.body;
    let insertQuery = `Insert into checkout (id_user, total, status, tanggal) values(${db.escape(
      id_user
    )}, ${db.escape(total)}, ${db.escape(status)}, ${db.escape(tanggal)});`;
    console.log(insertQuery);
    db.query(insertQuery, (err, result) => {
      if (err) res.status(500).send(err);
      db.query(
        `Select * from checkout where id_user = ${db.escape(id_user)};`,
        (err2, result2) => {
          if (err2) res.status(500).send(err2);
          return res.status(200).send({
            message: `Berhasil checkout`,
            data: result2,
          });
        }
      );
    });
  },

  deleteCheckOut: (req, res) => {
    let deleteQuery = `Delete from checkout where idcheckout = ${db.escape(
      req.params.idcheckout
    )};`;
    console.log(deleteQuery);
    db.query(deleteQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  editCart: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }
    let updateQuery = `UPDATE cart set ${dataUpdate} where id_cart = ${req.params.id};`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      return res.status(200).send(results);
    });
  },

  renderCart: (req, res) => {
    let scriptQuery = "Select * from cart;";
    if (req.query.id_user) {
      scriptQuery = `select cart.id_cart, obat.idobat, obat.foto_obat, obat.satuan_jual, obat.nama_obat, cart.qty_obat, cart.harga from cart
      left join user on
      user.id_user = cart.id_user
      left join obat on obat.idobat = cart.idobat
      where cart.id_user = ${db.escape(
        req.query.id_user
      )} and cart.status = "Menunggu Pembayaran";`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  deleteCart: (req, res) => {
    let deleteQuery = `Delete from cart where id_cart = ${db.escape(
      req.params.id_cart
    )};`;
    console.log(deleteQuery);
    db.query(deleteQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  getPrescriptionCart: (req, res) => {
    let scriptQuery = `Select * from prescription_cart;`;
    if (req.query) {
      scriptQuery = `select prescription_cart.idprescription_cart, obat_bahan.nama_bahan_obat, prescription_cart.kandungan, user.nama_depan, user.nama_belakang, obat_bahan.harga_per_mg from prescription_cart
      left join user on user.id_user = prescription_cart.id_user
      left join obat_bahan on obat_bahan.id_bahan_obat = prescription_cart.id_bahan_obat
      where prescription_cart.id_user = ${db.escape(
        req.query.id_user
      )} and prescription_cart.status = ${db.escape(req.query.status)};`;
    }
    console.log(scriptQuery);
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  editPrescription: (req, res) => {
    let dataUpdate = [];
    for (let prop in req.body) {
      dataUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }
    let updateQuery = `UPDATE prescription_cart set ${dataUpdate} where idprescription_cart = ${req.params.id};`;
    console.log(updateQuery);
    db.query(updateQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(results);
    });
  },

  deletePrescription: (req, res) => {
    let deleteQuery = `Delete from prescription_cart where idprescription_cart = ${db.escape(
      req.params.idprescription_cart
    )};`;
    console.log(deleteQuery);
    db.query(deleteQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(results);
    });
  },

  substanceUsageHistory: (req, res) => {
    let scriptQuery = `select prescription_cart.idprescription_cart, obat_bahan.nama_bahan_obat, prescription_cart.kandungan, prescription_cart.tanggal,  prescription_cart.status, user.nama_depan, user.nama_belakang, obat_bahan.harga_per_mg from prescription_cart
    left join user on user.id_user = prescription_cart.id_user
    left join obat_bahan on obat_bahan.id_bahan_obat = prescription_cart.id_bahan_obat;`;
    db.query(scriptQuery, (err, results) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(results);
    });
  },

  searchUsageHistory: (req, res) => {
    let scriptQuery = `select * from obat_bahan;`;
    if (req.query.nama_bahan_obat) {
      scriptQuery = `select prescription_cart.idprescription_cart, obat_bahan.nama_bahan_obat, prescription_cart.kandungan, prescription_cart.tanggal, prescription_cart.status, user.nama_depan, user.nama_belakang, obat_bahan.harga_per_mg from prescription_cart
      left join user on user.id_user = prescription_cart.id_user
      left join obat_bahan on obat_bahan.id_bahan_obat = prescription_cart.id_bahan_obat
      where nama_bahan_obat like "%${req.query.nama_bahan_obat}%";`;
    }
    console.log(scriptQuery);
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
