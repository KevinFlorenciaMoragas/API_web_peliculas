const express = require("express")
const router = express.Router()
const {
    register,
    login,
    recoverPassword
    ,changePassword
} = require("../controller/user.controller.js")
const User = require("../model/user.js")

router.post('/register',async(req,res) => await register(req,res,User))
router.post('/login',async(req,res) => await login(req,res,User))
router.post('/recoverpassword',async(req,res) => await recoverPassword(req,res,User))
router.post('/changepassword',async(req,res) => await changePassword(req,res,User))

module.exports = router