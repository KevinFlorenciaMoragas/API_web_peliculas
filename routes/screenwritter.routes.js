const express = require("express")
const router = express.Router()

const {
    readAllItems,
    readItem,
    createItem,
    deleteItem,
    updateItem
} = require('../controller/generic.controller.js')
const Screenwritter = require("../model/screenwritter.js")
const {
    checkAdmin,
    checkToken
} = require("../middleware/checkToken.js")
router.get('/screenwritter', async (req, res) => await readAllItems(req, res, Screenwritter))
router.get('/screenwritter/:id', async (req, res) => await readItem(req, res, Screenwritter))
router.post('/screenwritter', checkAdmin, async (req, res) => await createItem(req, res, Screenwritter))
router.put('/screenwritter/:id', checkAdmin, async (req, res) => await updateItem(req, res, Screenwritter))
router.delete('/screenwritter/:id', checkAdmin, async (req, res) => await deleteItem(req, res, Screenwritter))

module.exports = router