const express = require("express");
const { userController } = require("../controllers/");
const routers = express.Router();

routers.get("/get", userController.getUser);
routers.post("/add-user", userController.addUser);

module.exports = routers;
