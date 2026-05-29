const {DataTypes} = require('sequelize');
const sequelize = require('../database');

const Transaction = sequelize.define('Transaction',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    user_id:{
        type:DataTypes.UUID,
        allowNull:false
    },
    gym_id:{
        type: DataTypes.UUID,
        allowNull:false
    },
    amount:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    type:{
        type:DataTypes.ENUM('TOP_UP','DEBIT'), //Restricts values to only these two options
        allowNull: false
    }
},{timestamps:true})

module.exports = Transaction;