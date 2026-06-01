const { DataTypes, UUID, FLOAT } = require("sequelize")
const sequelize  = require('../database')

const Gym = sequelize.define('Gym',{
    gym_id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true
    },
    id:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Rating:{
        type:DataTypes.FLOAT,
        allowNull:false,
        defaultValue:0.0
    }
})

module.exports = Gym;