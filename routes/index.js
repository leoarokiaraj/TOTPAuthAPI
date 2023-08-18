const express = require('express')
const { TOTPController } = require('../controllers/totpauth.controller')

const router = express.Router()

router.get('/register-totp', TOTPController.registerTOTPController)
router.get('/validate-totp', TOTPController.validateTOTPController)



module.exports = router
