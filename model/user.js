const sequelize = require('../database/database.js')
const { DataTypes } = require('sequelize')

const User = sequelize.define('users',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    active:{
        type: DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue: true
    },
    role:{
        type: DataTypes.ENUMM,
        enum:['user','admin'],
        defaultValue: 'user'
    }
})
module.exports = User