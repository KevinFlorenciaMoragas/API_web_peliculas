const User = require('../model/user')
const Movie = require('../model/movie')
const UserMovies = require('../model/UserMovies')

const movieWatched = async (req, res) => {

    const { userId, movieId, watched } = req.body

    if (!userId) {
        return res.status(404).json({ error: "User is not defined" })
    }
    if (!movieId) {
        return res.status(404).json({ error: "Movie is not defined" })
    }
    try {
        const userMovie = await UserMovies.findOne({
            where: { userId: userId, movieId: movieId }
        })
        if (userMovie) {
            await userMovie.update({ watched: watched })
            await userMovie.save()
            return res.status(200).json({ message: "Update ok" })
        } else {
            const newUserMovie = await UserMovies.create({ userId, movieId, watched });
            return res.status(200).json({ message: "Watched created" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}
const movieComment = async (req, res) => {
    const { comment, userId, movieId } = req.body;

    if (!userId) {
        return res.status(404).json({ error: "User is not defined" });
    }
    if (!movieId) {
        return res.status(404).json({ error: "Movie is not defined" });
    }

    try {
        const userMovie = await UserMovies.findOne({
            where: { userId: userId, movieId: movieId }
        });

        if (userMovie) {
            await userMovie.update({ comment: comment });
            return res.status(200).json({ message: "Update ok" });
        } else {
            const newUserMovie = await UserMovies.create({ userId, movieId, comment });
            return res.status(201).json({ message: "Comment created", userMovie: newUserMovie });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
const movieToSee = async (req, res) => {

    const { userId, movieId, toSee } = req.body

    if (!userId) {
        return res.status(404).json({ error: "User is not defined" })
    }
    if (!movieId) {
        return res.status(404).json({ error: "Movie is not defined" })
    }
    try {
        const userMovie = await UserMovies.findOne({
            where: { userId: userId, movieId: movieId }
        })
        if (userMovie) {
            await userMovie.update({ toSee: toSee })
            await userMovie.save()
            return res.status(200).json({ message: "Update ok" })
        } else {
            const newUserMovie = await UserMovies.create({ userId, movieId, toSee });
            return res.status(200).json({ message: "To see created" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}
const movieLike = async (req, res) => {

    const { userId, movieId, like } = req.body
    console.log("Estoy en like")
    console.log(req.body)
    if (!userId) {
        return res.status(404).json({ error: "User is not defined" })
    }
    if (!movieId) {
        return res.status(404).json({ error: "Movie is not defined" })
    }
    try {
        const userMovie = await UserMovies.findOne({
            where: { userId: userId, movieId: movieId }
        })
        if (userMovie) {
            await userMovie.update({ like: like })
            await userMovie.save()
            return res.status(200).json({ message: "Update ok" })
        } else {
            console.log("Estoy en el else")
            const newUserMovie = await UserMovies.create({ userId, movieId, like });
            return res.status(200).json({ message: "Like created" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}
const getUserMovie = async (req, res) => {
    const { userId, movieId } = req.params
    try {
        const userMovie = await UserMovies.findOne({
            where: { userId: userId, movieId: movieId }
        })
        if (!userMovie) {
            return res.status(404).json({ message: "User movie not found" })
        }
        res.status(200).json(userMovie)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getMovieComments = async (req, res) => {
    const { movieId } = req.params
    try {
        const comments = await UserMovies.findAll({
            where: { movieId: movieId },
            include: [{model: User}]
        })
        if (!comments) {
            return res.status(404).json({ message: "Comments not found" })
        }
        res.status(200).json(comments)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    movieComment,
    movieWatched,
    movieLike,
    movieToSee,
    getUserMovie,
    getMovieComments
}