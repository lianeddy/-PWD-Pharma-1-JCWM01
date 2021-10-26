const express = require("express");
const { rawDrugsController } = require("../controllers");
const routers = express.Router();

routers.get("/get-prescriptions", rawDrugsController.getRawDrugs);
routers.get("/get-rejected", rawDrugsController.getRejectedPrescriptions);
routers.post("/post-prescriptions", rawDrugsController.prescriptionToCart);
routers.post("/reject-prescription", rawDrugsController.rejectPrescription);
routers.patch("/restock-substance/:id", rawDrugsController.restockRawDrugs);
routers.delete(
  "/delete-prescription/:id_prescriptions",
  rawDrugsController.deletePrescriptionRequest
);

module.exports = routers;
