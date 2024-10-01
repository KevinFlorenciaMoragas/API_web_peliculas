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
const postMovie = async (req, res) => {
    const { movieName, duration, releaseDate, score, banner, poster, trailer, directorId, actorId, screenwritterId, genreId } = req.body
    try {
        const newMovie = await Movie.create({
            movieName,
            duration,
            releaseDate,
            score,
            banner,
            poster,
            trailer
        })
        // Asignar el director si se proporciona un ID
        if (directorId && directorId.length > 0) {
            const director = await Director.findAll({ where: { id: directorId } });
            if (director) {
                await newMovie.addDirector(director);
            } else {
                return res.status(404).json({ message: `Director con ID ${directorId} no encontrado` });
            }
        }

        // Asignar el actor si se proporciona un ID
        if (actorId && actorId.length > 0) {
            const actor = await Actor.findAll({ where: { id: actorId } });
            if (actor) {
                await newMovie.addActor(actor);
            } else {
                return res.status(404).json({ message: `Actor con ID ${actorId} no encontrado` });
            }
        }

        // Asignar el screenwriter si se proporciona un ID
        if (screenwritterId && screenwritterId.length > 0) {
            const screenwritter = await Screenwritter.findAll({ where: { id: screenwritterId } });
            if (screenwritter) {
                await newMovie.addScreenwritter(screenwritter);
            } else {
                return res.status(404).json({ message: `Screenwriter con ID ${screenwritterId} no encontrado` });
            }
        }

        // Asignar el género si se proporciona un ID
        if (genreId && genreId.length > 0) {
            const genre = await Genre.findAll({ where: { id: genreId } });
            if (genre) {
                await newMovie.addGenre(genre);
            } else {
                return res.status(404).json({ message: `Género con ID ${genreId} no encontrado` });
            }
        }

        res.status(201).json(newMovie)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
const getRelationMovies = async (req, res) => {
    const { genreId, id } = req.body
    try {
        if (genreId && genreId.length > 0) {
            const movies = await Movie.findAll({
                include: [{
                    model: Genre,
                    where: { id: genreId }
                }],
                where: {
                    id: {
                        [Op.not]: id
                    }
                }
            });
            res.status(200).json(movies)
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
module.exports = {
    getMovies,
    postMovie,
    getRelationMovies
}