const {DataTypes} = require('sequelize');
const sequelize = require('../database');
const Gym = sequelize.define('Gym',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    gym_name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    owner_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    rating:{
        type:DataTypes.FLOAT,
        defaultValue:4.0
    },
    credit_per_day:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},{
    timestamps:true
})

module.exports = Gym;