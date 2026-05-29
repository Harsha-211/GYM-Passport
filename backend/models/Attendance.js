const {DataType, DataTypes} = require('sequelize');
const sequelize = require('../database');

const Attendance = sequelize.define('Attendance',{
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
        type:DataTypes.UUID,
        allowNull:false
    },
    scanned_at:{
        type:DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
},{
    timestamps:false
});

module.exports = Attendance;