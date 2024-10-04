const sequelize = require('../database/database.js')
const {DataTypes} = require('sequelize')

const Genre = sequelize.define('genres',{
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    }
})

module.exports = Genre