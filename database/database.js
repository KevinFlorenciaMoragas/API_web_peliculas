const {Sequelize, DataTypes} = require('sequelize')
//Root en el pc de casa monlau21! en el portatil
const sequelize = new Sequelize("APIPeliculas",'root','root',{
    host:"localhost",
    dialect:"mysql",
    port:3306
})
module.exports = sequelize