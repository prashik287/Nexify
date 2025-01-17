const express = require('express')
const authController = require('../controllers/authController')
const router = express.Router()
const cors = require("cors")

router.use(cors())
router.use(express.json())


router.post('/register',authController.adduser)
router.post('/login',authController.loginController)
module.exports = router