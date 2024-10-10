const express = require("express")
const router = express.Router()

const {
    readAllItems,
    readItem,
    createItem,
    deleteItem,
    updateItem
} = require('../controller/generic.controller.js')
const Director = require("../model/director.js")
const {
    checkAdmin,
    checkToken
} = require("../middleware/checkToken.js")
router.get('/director', async (req, res) => await readAllItems(req, res, Director))
router.get('/director/:id', async (req, res) => await readItem(req, res, Director))
router.post('/director', async (req, res) => await createItem(req, res, Director))
router.put('/director/:id', checkAdmin, async (req, res) => await updateItem(req, res, Director))
router.delete('/director/:id', checkAdmin, async (req, res) => await deleteItem(req, res, Director))

module.exports = router