const express = require("express");
const { cartController } = require("../controllers");
const routers = express.Router();

routers.get("/get-cart", cartController.getCart);
routers.post("/add-to-cart", cartController.addToCart);
routers.patch("/edit-cart/:email", cartController.editCart);

module.exports = routers;
