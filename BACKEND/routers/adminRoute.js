const express = require('express')
const { adminController } = require('../controllers')
const router = express.Router()

router.get('/getDataProduct', adminController.getDataProduct)
router.get('/getDataProductId/:id', adminController.getDataProductId)
router.post('/uploadDataProduct', adminController.uploadDataProduct)
router.post('/editDataProduct', adminController.updateDataProduct)
module.exports = router