const express = require('express')
const { adminController } = require('../controllers')
const router = express.Router()

router.post('/uploadDataProduct', adminController.uploadDataProduct)

module.exports = router