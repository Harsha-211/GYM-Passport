const { model } = require('mongoose');
const {Sequelize} = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        logging: false
    }
);

//function to run a quick test

const testConnection = async ()=>{
    try{
        await sequelize.authenticate();
        console.log("Database connection is established successfully via Sequelize..!");
    }catch(error){
        console.log(error);
    }
}

testConnection();

module.exports = sequelize;