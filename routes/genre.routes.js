const express = require("express")
const router = express.Router()

const {
    readAllItems,
    readItem,
    createItem,
    deleteItem,
    updateItem
} = require('../controller/generic.controller.js')
const Genre = require("../model/genre.js")
const {
    checkAdmin,
    checkToken
} = require("../middleware/checkToken.js")
router.get('/genre', async (req, res) => await readAllItems(req, res, Genre))
router.get('/genre/:id', async (req, res) => await readItem(req, res, Genre))
router.post('/genre', async (req, res) => await createItem(req, res, Genre))
router.put('/genre/:id', checkAdmin, async (req, res) => await updateItem(req, res, Genre))
router.delete('/genre/:id', checkAdmin, async (req, res) => await deleteItem(req, res, Genre))

module.exports = router