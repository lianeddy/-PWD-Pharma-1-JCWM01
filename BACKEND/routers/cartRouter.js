const express = require("express");
const { cartController } = require("../controllers");
const routers = express.Router();

routers.get("/get-cart", cartController.getCart);
routers.post("/add-to-cart", cartController.addToCart);
routers.patch("/edit-cart/:id", cartController.editCart);

module.exports = routers;
