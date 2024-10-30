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
    getRelationMovies,
    postMovie,
    getMovieByName,
    getMovieById,
    getMovieByDirector,
    getMovieByActor,
    getMovieByScreenwritter,
    getMovieByGenre,
    countMovies
    
} = require('../controller/movie.controller.js')
const {
    checkAdmin,
    checkToken
} = require("../middleware/checkToken.js")
router.get('/movie/order/:order', async (req, res) => await getMovies(req, res, Movie))
router.get('/movie/:id', async (req, res) => await getMovieById(req, res, Movie))
router.get('/movie/suggestions/:movieName', async(req,res) => await getMovieByName(req,res,Movie))
router.get('/movie/genre/:genreId',async(req,res) => await getMovieByGenre(req,res,Movie))
router.get('/movie/director/:directorId',async(req,res) => await getMovieByDirector(req,res,Movie))
router.get('/movie/actor/:actorId',async(req,res) => await getMovieByActor(req,res,Movie))
router.get('/movie/screenwritter/:screenwritterId',async(req,res) => await getMovieByScreenwritter(req,res,Movie))
router.get('/movie/genre/:genreId/movieId/:movieId',async(req,res) => await getRelationMovies(req,res,Movie))
router.get('/count', async(req,res) => await countMovies(req,res, Movie))
router.post('/movie', async (req, res) => await postMovie(req, res, Movie))
router.put('/movie/:id', checkAdmin, async (req, res) => await updateItem(req, res, Movie))
router.delete('/movie/:id', checkAdmin, async (req, res) => await deleteItem(req, res, Movie))

module.exports = router