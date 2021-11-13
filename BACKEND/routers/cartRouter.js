const express = require("express");
const { cartController } = require("../controllers");
const routers = express.Router();

routers.get("/get-cart", cartController.getCart);
routers.get("/render-cart", cartController.renderCart);
routers.get("/render-prescription", cartController.getPrescriptionCart);
routers.patch("/edit-prescription/:id", cartController.editPrescription);
routers.get("/substance-history", cartController.substanceUsageHistory);
routers.get("/search-substance", cartController.searchUsageHistory);
routers.post("/add-to-cart", cartController.addToCart);
routers.get("/get-checkout", cartController.getCheckOut);
routers.post("/checkout", cartController.userCheckOut);
routers.delete("/delete-checkout/:idcheckout", cartController.deleteCheckOut);
routers.patch("/edit-cart/:id", cartController.editCart);
routers.delete("/delete-item/:id_cart", cartController.deleteCart);
routers.delete(
  "/delete-prescription/:idprescription_cart",
  cartController.deletePrescription
);

module.exports = routers;
