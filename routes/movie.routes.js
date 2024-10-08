const express = require("express")
const router = express.Router()

const {
    readAllItems,
    readItem,
    createItem,
    deleteItem,
    updateItem
} = require('../controller/generic.controller.js')
const Movie = require("../model/movie.js")
const {
    getMovies,
    postMovie,
    getMovieByName
} = require('../controller/movie.controller.js')
const {
    checkAdmin,
    checkToken
} = require("../middleware/checkToken.js")
router.get('/movie', async (req, res) => await getMovies(req, res, Movie))
router.get('/movie/:id', async (req, res) => await readItem(req, res, Movie))
router.get('/movie/movie-name/:movieName', async(req,res) => await getMovieByName(req,res,Movie))
router.post('/movie', checkAdmin, async (req, res) => await postMovie(req, res, Movie))
router.put('/movie/:id', checkAdmin, async (req, res) => await updateItem(req, res, Movie))
router.delete('/movie/:id', checkAdmin, async (req, res) => await deleteItem(req, res, Movie))

module.exports = router