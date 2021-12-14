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
routers.get("/unconfirmed-checkout", cartController.unconfirmedCheckout);
routers.get(
  "/render-unconfirmed-checkout",
  cartController.renderUnconfirmedCheckout
);
routers.post("/checkout", cartController.userCheckOut);
routers.delete("/delete-checkout/:idcheckout", cartController.deleteCheckOut);
routers.patch("/edit-cart/:id", cartController.editCart);
routers.delete("/delete-item/:id_cart", cartController.deleteCart);
routers.delete(
  "/delete-prescription/:idprescription_cart",
  cartController.deletePrescription
);
routers.get("/prescription-checkout", cartController.prescriptionCheckout);
routers.get("/drug-checkout", cartController.drugCheckout);
routers.get("/checkout-payment", cartController.checkoutPayment);
routers.get("/render-checkout", cartController.renderCheckOut);
routers.patch("/checkout-update/:id", cartController.checkoutUpdate);

module.exports = routers;
