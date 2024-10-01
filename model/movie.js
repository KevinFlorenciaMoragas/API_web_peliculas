const sequelize = require('../database/database.js')
const { DataTypes } = require('sequelize')

const Movie = sequelize.define('movies', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    movieName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duration: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    releaseDate: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    score: {
        type: DataTypes.DOUBLE,
        allowNull: true
    },
    banner: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    poster: {
        type: DataTypes.STRING,
        allowNull: true
    },
    trailer: {
        type: DataTypes.STRING,
        allowNull: true
    }
})
module.exports = Movie