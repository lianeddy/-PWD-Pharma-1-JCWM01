const express = require("express");
const { userController } = require("../controllers/");
const { auth } = require("../helper/authToken");
const routers = express.Router();

routers.get("/get", userController.getUser);
routers.post("/add-user", userController.addUser);
routers.patch("/edit-profile/:id", userController.editUser);
routers.patch("/verified", auth, userController.verification);

module.exports = routers;
