const { db } = require("../database");

module.exports = {
  getDrug: (req, res) => {
    let scriptQuery = "Select * from obat;";
    if (req.query.idobat) {
      scriptQuery = `Select * from obat where idobat = ${req.query.idobat};`;
    } else if (req.query.sortBy) {
      switch (req.query.sortBy) {
        case "lowPrice":
          scriptQuery = `Select * from obat order by harga asc limit ${req.query.page}, ${req.query.item};`;
          break;
        case "highPrice":
          scriptQuery = `Select * from obat order by harga desc limit ${req.query.page}, ${req.query.item};`;
          break;
        case "az":
          scriptQuery = `Select * from obat order by nama_obat limit ${req.query.page}, ${req.query.item};`;
          break;
        case "za":
          scriptQuery = `Select * from obat order by nama_obat desc limit ${req.query.page}, ${req.query.item};`;
          break;
        default:
          scriptQuery = `Select * from obat limit ${req.query.page}, ${req.query.item};`;
          break;
      }
    }

    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  drugList: (req, res) => {
    let scriptQuery = `Select * from obat where golongan = ${db.escape(
      req.query.golongan
    )};`;
    if (req.query.sortBy) {
      switch (req.query.sortBy) {
        case "lowPrice":
          scriptQuery = `Select * from obat where golongan = ${db.escape(
            req.query.golongan
          )} order by harga asc limit ${req.query.page}, ${req.query.item};`;
          break;
        case "highPrice":
          scriptQuery = `Select * from obat where golongan = ${db.escape(
            req.query.golongan
          )} order by harga desc limit ${req.query.page}, ${req.query.item};`;
          break;
        case "az":
          scriptQuery = `Select * from obat where golongan = ${db.escape(
            req.query.golongan
          )} order by nama_obat limit ${req.query.page}, ${req.query.item};`;
          break;
        case "za":
          scriptQuery = `Select * from obat where golongan = ${db.escape(
            req.query.golongan
          )} order by nama_obat desc limit ${req.query.page}, ${
            req.query.item
          };`;
          break;
        default:
          scriptQuery = `Select * from obat where golongan = ${db.escape(
            req.query.golongan
          )} limit ${req.query.page}, ${req.query.item}`;
          break;
      }
    }

    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  searchDrug: (req, res) => {
    let scriptQuery = `select * from obat;`;
    if (req.query.nama_obat) {
      scriptQuery = `select * from obat
      where nama_obat like "%${req.query.nama_obat}%";`;
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
    )}, ${db.escape(deskripsi)},  ${db.escape(golongan)}, ${db.escape(
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

  sortBy: (req, res) => {
    let sortingQuery = `SELECT FROM obat ORDER BY nama_obat DESC = ${db.escape(
      req.params.nama_obat
    )};`;

    db.query(sortingQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  getRawDrug: (req, res) => {
    let scriptQuery = "Select * from obat_bahan;";
    if (req.query.idobat) {
      scriptQuery = `Select * from obat_bahan where id_bahan_obat = ${db.escape(
        req.query.idobat
      )};`;
    } else if (req.query.sortBy) {
      switch (req.query.sortBy) {
        case "lowPrice":
          scriptQuery = `Select * from obat_bahan order by harga_per_mg asc limit ${req.query.page}, ${req.query.item};`;
          break;
        case "highPrice":
          scriptQuery = `Select * from obat_bahan order by harga_per_mg desc limit ${req.query.page}, ${req.query.item};`;
          break;
        case "az":
          scriptQuery = `Select * from obat_bahan order by nama_bahan_obat limit ${req.query.page}, ${req.query.item};`;
          break;
        case "za":
          scriptQuery = `Select * from obat_bahan order by nama_bahan_obat desc limit ${req.query.page}, ${req.query.item};`;
          break;
        default:
          scriptQuery = `Select * from obat_bahan limit ${req.query.page}, ${req.query.item};`;
          break;
      }
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  rawDrugList: (req, res) => {
    let scriptQuery = `Select * from obat_bahan where golongan = ${db.escape(
      req.query.golongan
    )};`;
    if (req.query.sortBy) {
      switch (req.query.sortBy) {
        case "lowPrice":
          scriptQuery = `Select * from obat_bahan where golongan = ${db.escape(
            req.query.golongan
          )} order by harga_per_mg asc limit ${req.query.page}, ${
            req.query.item
          };`;
          break;
        case "highPrice":
          scriptQuery = `Select * from obat_bahan where golongan = ${db.escape(
            req.query.golongan
          )} order by harga_per_mg desc limit ${req.query.page}, ${
            req.query.item
          };`;
          break;
        case "az":
          scriptQuery = `Select * from obat_bahan where golongan = ${db.escape(
            req.query.golongan
          )} order by nama_bahan_obat limit ${req.query.page}, ${
            req.query.item
          };`;
          break;
        case "za":
          scriptQuery = `Select * from obat_bahan where golongan = ${db.escape(
            req.query.golongan
          )} order by nama_bahan_obat desc limit ${req.query.page}, ${
            req.query.item
          };`;
          break;
        default:
          scriptQuery = `Select * from obat_bahan where golongan = ${db.escape(
            req.query.golongan
          )} limit ${req.query.page}, ${req.query.item}`;
          break;
      }
    }

    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};
