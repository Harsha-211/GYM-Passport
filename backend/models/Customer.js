const {DataTypes} = require('sequelize');
const sequelize = require('../database');

const Customer = sequelize.define('Customer',{
    id:{
        type:DataTypes.UUID,
        primaryKey:true,
    },
    phoneNo:{
        type:DataTypes.STRING(10),
        allowNull:false,
        unique:true,
        validate:{
            is: /^[6-9]\d{9}$/ 
        }
    },
    WalletCredits:{
        type:DataTypes.INTEGER,
        allowNull:false,
        defaultValue:0
    }
});

module.exports = Customer;