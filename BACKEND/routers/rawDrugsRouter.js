const express = require("express");
const { rawDrugsController } = require("../controllers");
const routers = express.Router();

routers.get("/get-prescriptions", rawDrugsController.getRawDrugs);
routers.post("/post-prescriptions", rawDrugsController.prescriptionToCart);
routers.delete(
  "/delete-prescription/:id_request",
  rawDrugsController.deletePrescriptionRequest
);

module.exports = routers;
