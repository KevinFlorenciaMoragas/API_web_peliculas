const sequelize = require('../database/database.js')
const { DataTypes } = require('sequelize')

const UserMovies = sequelize.define(('user-movies'), {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    like: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    watched: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    toSee: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
    },
    comment: {
        type: DataTypes.STRING(1000),
        allowNull: true
    }
})
module.exports = UserMovies;