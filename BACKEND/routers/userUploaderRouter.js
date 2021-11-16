const express = require("express");
const { userUploaderController } = require("../controllers");
const route = express.Router();

route.patch("/upload/:id", userUploaderController.userUpload);
route.patch("/uploadimg/:id", userUploaderController.userUpload);
route.patch("/payment-proof/:id", userUploaderController.paymentProof);
route.get("/get", userUploaderController.getProfileImage);

module.exports = route;
