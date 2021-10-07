const express = require("express");
const { userController } = require("../controllers/");
const routers = express.Router();

routers.get("/get", userController.getUser);
routers.post("/add-user", userController.addUser);
routers.patch("/verified", userController.verification);


module.exports = routers;
