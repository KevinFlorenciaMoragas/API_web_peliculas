const Movie = require('../model/movie.js')
const Director = require('../model/director.js')
const Actor = require('../model/actor.js')
const Screenwritter = require('../model/screenwritter.js')
const Genre = require('../model/genre.js')
const UserMovie = require('../model/UserMovies.js')
const { Op } = require('sequelize')
const sequelize = require('../database/database.js')
const {
    getMovieCountByMovieId
} = require('./user_movies.controller.js')
const getMovies = async (req, res) => {
    const { order = 'movieName', page = 1, limit = 10 } = req.query; 
    const pageNumber = parseInt(page, 10);
    const pageLimit = parseInt(limit, 10);
    try {
        const movies = await Movie.findAndCountAll({
            include: [Director, Actor, Screenwritter, Genre],
            order: [[order, 'ASC']],
            limit: pageLimit,
            offset: (pageNumber - 1) * pageLimit
        });

        const totalPages = Math.ceil(movies.count / pageLimit);

        res.json({
            currentPage: pageNumber,
            totalPages,
            totalMovies: movies.count,
            movies: movies.rows
        });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const getMovieById = async (req, res) => {
    const id = req.params.id
    try {
        const movie = await Movie.findByPk(id, {
            include: [Director, Actor, Screenwritter, Genre]
        })
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" })
        }
        let visitTime = movie.visitTime + 1
        await Movie.update({ visitTime: visitTime }, { where: { id: id } })
        
        res.json(movie)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const countMovies = async (req,res) => {
    try{
        console.log("Estoy en count")
        const count = await Movie.count()
        console.log(count)
        if(!count){
            return res.status(404).json({message: "Count not found"})
        }
        res.json(count)
    }catch(error){
        return res.status(500).json({error: error.message})
    }
}
const getMovieByDirector = async (req, res) => {
    const directorId = req.params.directorId
    try {
        const movie = await Movie.findAll({
            include: [Actor, Genre, Screenwritter, 
                {model: Director,
                 where: {id: directorId}}
                ],
                order: [['score','ASC']]
        })
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" })
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const getMovieByActor = async (req, res) => {
    const actorId = req.params.actorId
    try {
        const movie = await Movie.findAll({
            include: [Director, Genre, Screenwritter, 
                {model: Actor,
                 where: {id: actorId}}
                ],
                order: [['score','ASC']]
        })
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" })
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getMovieByScreenwritter = async (req, res) => {
    const screenwriterId = req.params.screenwriterId
    try {
        const movie = await Movie.findAll({
            include: [Director, Genre, Actor, 
                {model: Screenwritter,
                 where: {id: screenwriterId}}
                ],
                order: [['score','ASC']]
        })
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" })
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getMovieByGenre = async (req, res) => {
    const genreId = req.params.genreId
    try {
        const movie = await Movie.findAll({
            include: [Director, Actor, Screenwritter, 
                {model: Genre,
                 where: {id: genreId}}
                ],
                order: [['score','ASC']]
        })
        if (!movie) {
            return res.status(404).json({ message: "Movie not found" })
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const postMovie = async (req, res) => {
    const { movieName, duration, synopsis, releaseDate, score, banner, poster, trailer, directorId, actorsId, screenwritterId, genreId } = req.body;
    console.log(req.body)
    try {
        const newMovie = await Movie.create({
            movieName,
            duration,
            releaseDate,
            score,
            banner,
            poster,
            synopsis,
            trailer
        });
        if (duration < 0) {
            return res.status(400).json({ message: "La duración no puede ser negativa" })
        }
        if (score < 0 || score > 10) {
            return res.status(400).json({ message: "El score no puede ser negativo o mayor a 10" })
        }
        if (!movieName || !duration || !releaseDate || !score || !banner || !poster || !trailer) {
            return res.status(400).json({ message: "Faltan datos" })
        }
        if (!directorId) {
            return res.status(400).json({ message: "Falta el director" })
        }
        if (!actorsId) {
            return res.status(400).json({ message: "Faltan los actores" })
        }
        if (!screenwritterId) {
            return res.status(400).json({ message: "Falta el guionista" })
        }
        if (!genreId) {
            return res.status(400).json({ message: "Falta el género" })
        }
        if (releaseDate < 1900) {
            return res.status(400).json({ message: "La fecha de estreno no puede ser menor a 1900" })
        }
        if (directorId) {
            const director = await Director.findOne({ where: { id: directorId } });
            console.log(director)
            if (director) {
                console.log("Director encontrado")
                await newMovie.setDirectors(director);
            } else {
                return res.status(404).json({ message: `Director con ID ${directorId} no encontrado` });
            }
        }
        if (actorsId && actorsId.length > 0) {
            const actors = await Actor.findAll({ where: { id: actorsId } });
            if (actors.length > 0) {
                await newMovie.addActors(actors); 
            } else {
                return res.status(404).json({ message: `Actores no encontrados` });
            }
        }
        if (screenwritterId && screenwritterId.length > 0) {
            const screenwritter = await Screenwritter.findAll({ where: { id: screenwritterId } });
            if (screenwritter) {
                await newMovie.setScreenwritters(screenwritter);
            } else {
                return res.status(404).json({ message: `Screenwriter con ID ${screenwritterId} no encontrado` });
            }
        }

        if (genreId && genreId.length > 0) {
            const genre = await Genre.findAll({ where: { id: genreId } });
            if (genre) {
                await newMovie.setGenres(genre);
            } else {
                return res.status(404).json({ message: `Género con ID ${genreId} no encontrado` });
            }
        }

        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getRelationMovies = async (req, res) => {
    const { genreId, movieId } = req.params
    try {
        if (genreId && genreId.length > 0) {
            const movies = await Movie.findAll({
                include: [{
                    model: Genre,
                    where: { id: genreId },
                    
                },{
                    model:Director
                }],
                where: {
                    id: {
                        [Op.not]: movieId
                    }
                }
            });
            console.log(movies)
            res.status(200).json(movies)
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getMovieByName = async (req, res) => {
    const movieName = req.params.movieName
    try {
        let movie = await Movie.findAll({
            include: [Director, Actor, Screenwritter, Genre],
            where: {
                movieName: {
                    [Op.like]: `%${movieName}%`
                }
            }
        })
        if (!movie) {
            return res.status(400).json({ message: "Movie not found" })
        }
        movie = JSON.parse(JSON.stringify(movie))
        res.status(200).json(movie)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    getMovies,
    postMovie,
    getRelationMovies,
    getMovieByName,
    getMovieById,
    getMovieByDirector,
    getMovieByActor,
    getMovieByScreenwritter,
    getMovieByGenre,
    countMovies
}