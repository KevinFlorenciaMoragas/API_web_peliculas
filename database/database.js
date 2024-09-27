const {Sequelize, DataTypes} = require('sequelize')

const sequelize = new Sequelize("APIPeliculas",'root','monlau21!',{
    host:"localhost",
    dialect:"mysql",
    port:3306
})
module.exports = sequelize