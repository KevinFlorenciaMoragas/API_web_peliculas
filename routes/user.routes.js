const express = require("express")
const router = express.Router()
const {
    register,
    login,
    recoverPassword
    , changePassword,
    disableAccount
} = require("../controller/user.controller.js")
const {
    readAllItems,
    readItem,
    createItem,
    deleteItem,
    updateItem
} = require('../controller/generic.controller.js')
const User = require("../model/user.js")
const {
    checkAdmin,
    checkToken
} = require("../middleware/checkToken.js")
router.get('/user', checkAdmin, async (req, res) => await readAllItems(req, res, User))
router.get('/user/:id', checkAdmin, async (req, res) => await readItem(req, res, User))
router.post('/register', async (req, res) => await register(req, res, User))
router.post('/login', async (req, res) => await login(req, res, User))
router.put('/recoverpassword', async (req, res) => await recoverPassword(req, res, User))
router.put('/changepassword', async (req, res) => await changePassword(req, res, User))
router.put('/disableAccount', async (req, res) => await disableAccount(req, res, User))
router.delete('/user/:id', async (req, res) => await deleteItem(req, res, User))

module.exports = router