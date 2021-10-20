const express = require("express");
const { userController } = require("../controllers/");
const { auth } = require("../helper/authToken");
const routers = express.Router();

routers.post("/login", userController.loginUser);
routers.get("/get", userController.getUser);

routers.post("/keep-login", userController.keepLogin);

routers.post("/add-user", userController.addUser);
routers.patch("/edit-profile/:id", userController.editUser);
routers.patch("/verified", auth, userController.verification);
routers.post("/change-password", userController.changePassword);
routers.post("/upload-prescriptions/:id", userController.uploadPrescription)



module.exports = routers;
