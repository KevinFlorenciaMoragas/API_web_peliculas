const express = require("express")
const router = express.Router()

const {
    movieComment,
    movieWatched,
    movieLike,
    movieToSee,
    getUserMovie,
    getMovieCountByMovieId,
    getMovieComments
} = require('../controller/user_movies.controller.js')
const {
    checkAdmin,
    checkToken
} = require("../middleware/checkToken.js")
router.get('/usermovie/:userId/movie/:movieId', async (req, res) => await getUserMovie(req, res))
router.get('/comment/:movieId', async (req, res) => await getMovieComments(req, res))
router.get('/like/movie-count/:movieId', async(req,res) => await getMovieCountByMovieId(req,res))
router.post('/comment', async (req, res) => await movieComment(req, res))
router.post('/watched', async (req, res) => await movieWatched(req, res))
router.post('/like', async(req,res) => await movieLike(req,res))
router.post('/toSee', async(req,res) => await movieToSee(req,res))

module.exports = router