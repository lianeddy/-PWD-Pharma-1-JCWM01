const express = require("express");
const { cartController } = require("../controllers");
const routers = express.Router();

routers.get("/get-cart", cartController.getCart);
routers.get("/render-cart", cartController.renderCart);
routers.get("/render-prescription", cartController.getPrescriptionCart);
routers.post("/add-to-cart", cartController.addToCart);
routers.patch("/edit-cart/:id", cartController.editCart);

module.exports = routers;
