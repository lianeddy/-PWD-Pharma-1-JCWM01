const express = require("express");
const { drugsController } = require("../controllers");
const routers = express.Router();

routers.get("/get", drugsController.getData);
routers.get('/get-drug-max-page', drugsController.getMaxPage)
routers.get('/get-drug-category',drugsController.getDrugCategory)
routers.get('/get-drug-detail',drugsController.getDrugDetail)


routers.post("/add-obat", drugsController.addData);
routers.patch("/edit-obat/:id", drugsController.editData);
routers.delete("/delete-obat/:idobat", drugsController.deleteData);
<<<<<<< HEAD
routers.get("/sortby/:nama_obat", drugsController.sortBy);
=======
routers.get("/get-raw-drug", drugsController.getRawDrug);
>>>>>>> a34c9109ce4df6f73badc68744654356107b11cb

module.exports = routers;

// /get/:id select * from obat where id = req.params.id
