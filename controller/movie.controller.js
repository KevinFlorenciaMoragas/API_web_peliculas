const Movie = require('../model/movie.js')
const Director = require('../model/director.js')
const Actor = require('../model/actor.js')
const Screenwritter = require('../model/screenwritter.js')
const Genre = require('../model/genre.js')
const { Op } = require('sequelize')
const getMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll({
            include: [Director, Actor, Screenwritter, Genre]
        })
        res.json(movies)
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
        res.json(movie)
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
        // Asignar el director si se proporciona un ID
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

        // Asignar los actores si se proporciona un array de IDs
        if (actorsId && actorsId.length > 0) {
            const actors = await Actor.findAll({ where: { id: actorsId } });
            if (actors.length > 0) {
                await newMovie.addActors(actors); // Asegúrate de que este método está definido en tu modelo
            } else {
                return res.status(404).json({ message: `Actores no encontrados` });
            }
        }

        // Asignar el screenwriter si se proporciona un ID
        if (screenwritterId && screenwritterId.length > 0) {
            const screenwritter = await Screenwritter.findAll({ where: { id: screenwritterId } });
            if (screenwritter) {
                await newMovie.setScreenwritters(screenwritter);
            } else {
                return res.status(404).json({ message: `Screenwriter con ID ${screenwritterId} no encontrado` });
            }
        }

        // Asignar el género si se proporciona un ID
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
        console.log("Dentro del Try")
        if (genreId && genreId.length > 0) {
            console.log("Dentro del if")
            const movies = await Movie.findAll({
                include: [{
                    model: Genre,
                    where: { id: genreId }
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

    console.log("Estoy en movieName")
    const movieName = req.params.movieName
    console.log(movieName)
    try {
        const movie = await Movie.findOne({ where: { movieName: movieName } })
        if (!movie) {
            return res.status(400).json({ message: "Movie not found" })
        }
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
    getMovieById
}