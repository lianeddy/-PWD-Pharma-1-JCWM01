const { response } = require("express");
const { db } = require("../database");

module.exports = {
  getDrug: (req, res) => {
    let scriptQuery = "Select * from obat;";
    if (req.query.idobat) {
      scriptQuery = `Select * from obat where id_obat = ${db.escape(
        req.query.idobat
      )};`;
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
    console.log(scriptQuery);
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  getData: (request, response) => {
    const limit = 10;
    console.log(request.query.nama_obat);

    let scriptQuery = `select * from db_pharma.obat
    where nama_obat like '%${request.query.nama_obat}%'
    limit ${limit} offset ${request.query.page * limit};`;

    let sort = "";

    switch (request.query.sortby) {
      case "name_asc":
        sort = "order by nama_obat asc";
        break;
      case "name_desc":
        sort = "order by nama_obat desc";
        break;
      case "price_asc":
        sort = "order by harga asc";
        break;
      case "price_desc":
        sort = "order by harga desc";
        break;
      default:
        sort = "";
    }

    scriptQuery = `select * from db_pharma.obat 
                  where nama_obat like '%${request.query.nama_obat}%'
                  ${sort}
                  limit ${limit} offset ${request.query.page * limit};`;

    if (request.query.golongan) {
      scriptQuery = `select * from db_pharma.obat 
                      where golongan = ${db.escape(
                        request.query.golongan
                      )} and nama_obat like '%${request.query.nama_obat}%'
                      ${sort}
                      limit ${limit} offset ${request.query.page * limit};`;
    }
    console.log(scriptQuery);
    db.query(scriptQuery, (err, result) => {
      if (err) {
        return response.status(500).send(err);
      } else {
        return response.status(200).send(result);
      }
    });
  },

  getMaxPage: (request, response) => {
    let scriptQuery = `select count(idobat) as sumProduct from db_pharma.obat;`;

    if (request.query.golongan) {
      scriptQuery = `select count(idobat) as sumProduct from db_pharma.obat
      where golongan = ${db.escape(request.query.golongan)};`;
    }

    db.query(scriptQuery, (err, result) => {
      if (err) {
        return response.status(500).send(err);
      } else {
        // console.log(result);
        return response.status(200).send(result);
      }
    });
  },
  //   getProductsCategory: (request,response) => {
  //     let scriptQuery = `select category from fp_pwd_5.products p group by category;`

  //     db.query(scriptQuery, (err, result)=> {
  //         if (err) {
  //             return response.status(500).send(err)
  //         } else {
  //             return response.status(200).send(result)
  //         }
  //     })
  // },

  getDrugCategory: (request, response) => {
    let scriptQuery = `select golongan from db_pharma.obat o group by golongan;`;
    if (request.query.nama_obat) {
      scriptQuery = `select golongan from db_pharma.obat
      where nama_obat = ${db.escape(request.query.nama_obat)}`;
    }

    db.query(scriptQuery, (err, result) => {
      if (err) {
        return response.status(500).send(err);
      } else {
        return response.status(200).send(result);
      }
    });
  },

  getDrugDetail: (request, response) => {
    let scriptQuery = `select * from db_pharma.obat o
    where o.idobat = ${request.query.idobat};`;

    db.query(scriptQuery, (err, result) => {
      if (err) {
        return response.status(500).send(err);
      } else {
        return response.status(200).send(result);
      }
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
