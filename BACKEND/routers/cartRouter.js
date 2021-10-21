const express = require("express");
const { cartController } = require("../controllers");
const routers = express.Router();

routers.get("/get-cart", cartController.getCart);
routers.get("/render-cart", cartController.renderCart);
routers.get("/render-prescription", cartController.getPrescriptionCart);
routers.get("/substance-history", cartController.substanceUsageHistory);
routers.get("/search-substance", cartController.searchUsageHistory);
routers.post("/add-to-cart", cartController.addToCart);
routers.patch("/edit-cart/:id", cartController.editCart);
routers.delete("/delete-item/:id_cart", cartController.deleteCart);

module.exports = routers;
