const express = require('express');
require('dotenv').config();
const app = express();
const port = 3000;
const cors = require('cors')
const cookieParser = require('cookie-parser')
const User = require('./model/user.js')
const Director = require('./model/director.js')
const Actor = require('./model/actor.js')
const Screenwritter = require('./model/screenwritter.js')
const Movie = require('./model/movie.js')
const Genre = require('./model/genre.js')
const UserMovies = require('./model/UserMovies.js')
const userRoutes = require('./routes/user.routes.js');
const directorRoutes = require('./routes/director.routes.js')
const movieRoutes = require('./routes/movie.routes.js')
const actorRoutes = require('./routes/actor.routes.js')
const screenwritter = require('./routes/screenwritter.routes.js')
const genreRoutes = require('./routes/genre.routes.js')
const userMoviesRoutes = require('./routes/user-movies.routes.js')
const sequelize = require('./database/database.js');

async function main() {
    app.use(express.json())
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));
    app.use(cookieParser())

    app.use('/api', userRoutes)
    app.use('/api', directorRoutes)
    app.use('/api', actorRoutes)
    app.use('/api', movieRoutes)
    app.use('/api', screenwritter)
    app.use('/api', genreRoutes)
    app.use('/api', userMoviesRoutes)

    Movie.belongsToMany(Screenwritter, { through: 'movie_screenwritter' })
    Screenwritter.belongsToMany(Movie, { through: 'movie_screenwritter' })
    Movie.belongsToMany(Director, { through: 'movie_director' })
    Director.belongsToMany(Movie, { through: 'movie_director' })
    Movie.belongsToMany(Actor, { through: 'movie_actor' })
    Actor.belongsToMany(Movie, { through: 'movie_actor' })
    Movie.belongsToMany(Genre, { through: 'movie_genre' })
    Genre.belongsToMany(Movie, { through: 'movie_genre' })
    User.hasMany(UserMovies);
    UserMovies.belongsTo(User);
    Movie.hasMany(UserMovies)
    UserMovies.belongsTo(Movie);
    app.listen(port, () => {
        console.log(`App running at http://localhost:${port}`);
    });
    await sequelize.sync({ alter: false })
}
main();
