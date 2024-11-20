const express = require("express")
const router = express.Router()

const {
    readAllItems,
    readItem,
    createItem,
    deleteItem,
    updateItem,
    createItemWithImage,
    changeImagePlaceholder
} = require('../controller/generic.controller.js')
const Actor = require("../model/actor.js")
const Director = require('../model/director.js')
const Screenwritter = require('../model/screenwritter.js')
const {
    checkAdmin,
    checkToken
} = require("../middleware/checkToken.js")

const uploadImages = require("../middleware/uploadImages.js")
router.get('/actor', async (req, res) => await readAllItems(req, res, Actor))
router.get('/actor/:id', async (req, res) => await readItem(req, res, Actor))
router.post('/actor',uploadImages , async (req, res) => await createItem(req, res, Actor))
router.put('/actor/:id', checkAdmin, async (req, res) => await updateItem(req, res, Actor))
router.delete('/actor/:id', checkAdmin, async (req, res) => await deleteItem(req, res, Actor))
router.put('/photo', async(req,res)  => await changeImagePlaceholder(req,res,[Actor, Director,Screenwritter]))

module.exports = router