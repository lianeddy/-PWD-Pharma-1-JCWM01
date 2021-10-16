const express = require("express");
const { userUploaderController } = require("../controllers");
const route = express.Router();

route.patch("/upload/:id", userUploaderController.userUpload);

module.exports = route;
