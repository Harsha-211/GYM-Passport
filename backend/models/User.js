const {DataTypes, UUIDV4} = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User',{
    id:{
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    },
    user_type:{
        type:DataTypes.ENUM('customer','vendor'),
        allowNull:false,
    }
});

module.exports = User;
