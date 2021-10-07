const express = require("express");
const { userController } = require("../controllers/");
const { auth } = require("../helper/authToken");
const routers = express.Router();

routers.post("/get", userController.getUser);
routers.post("/add-user", userController.addUser);
routers.patch("/verified", auth, userController.verification);

module.exports = routers;
