const express = require("express");
const { drugsController } = require("../controllers");
const routers = express.Router();

routers.get("/get-drug", drugsController.getDrug);
routers.get("/drug-list", drugsController.drugList);
routers.get("/search-drug", drugsController.searchDrug);
routers.get("/get", drugsController.getData);
routers.get("/get-drug-max-page", drugsController.getMaxPage);
routers.get("/get-drug-category", drugsController.getDrugCategory);
routers.get("/get-drug-detail", drugsController.getDrugDetail);
routers.post("/add-obat", drugsController.addData);
routers.patch("/edit-obat/:id", drugsController.editData);
routers.delete("/delete-obat/:idobat", drugsController.deleteData);
routers.get("/sortby/:nama_obat", drugsController.sortBy);
routers.get("/get-raw-drug", drugsController.getRawDrug);

module.exports = routers;

// /get/:id select * from obat where id = req.params.id
