const {DataTypes} = require('sequelize');
const sequelize = require('../database');

const CheckIn = sequelize.define('CheckIn',{
    check_in_id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        allowNull:false,
        primaryKey:true,
    },
    id:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    gym_id:{
        type:DataTypes.UUID,
        allowNull:false,
    },
    credits_deducted:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    checked_in_time:{
        type:DataTypes.DATE,
        allowNull:false,
    }
},{timestamps:true});

module.exports = CheckIn;