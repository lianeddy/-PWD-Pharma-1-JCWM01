const express = require("express");
const { userController } = require("../controllers/");
const { auth } = require("../helper/authToken");
const routers = express.Router();

routers.get("/get", userController.getUser);
routers.post("/add-user", userController.addUser);
routers.patch("/verified", auth, userController.verification);
routers.post("/change-password", userController.changePassword);


module.exports = routers;
