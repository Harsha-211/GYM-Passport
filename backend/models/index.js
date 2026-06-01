const User = require('./User');
const Vendor = require('./Vendor');
const Customer = require('./Customer');
const Gym = require('./Gym');
const CheckIn = require('./CheckIn');
const Transaction = require('./Transaction');
const sequelize = require('../database');

// Vendor User relation
User.hasOne(Vendor, {foreignKey:'id',onDelete:'CASCADE'});
Vendor.belongsTo(User,{foreignKey:'id'});

// Customer User relation
User.hasOne(Customer,{foreignKey:'id',onDelete:'CASCADE'});
Customer.belongsTo(User,{foreignKey:'id'});

//Vendor Gym relation
Vendor.hasMany(Gym,{foreignKey:'id',onDelete:'CASCADE'});
Gym.belongsTo(Vendor,{foreignKey:'id'});

//Customer CheckIn relation
Customer.hasMany(CheckIn,{foreignKey:'id',onDelete:'CASCADE'});
CheckIn.belongsTo(Customer,{foreignKey:'id'});

//CheckIn Gym relation
Gym.hasMany(CheckIn,{foreignKey:'gym_id',onDelete:'CASCADE'});
CheckIn.belongsTo(Gym,{foreignKey:'gym_id'});

//Transaction User relation
User.hasMany(Transaction,{foreignKey:'id',onDelete:'CASCADE'});
Transaction.belongsTo(User,{foreignKey:'id'});

module.exports = {
  sequelize,
  User,
  Vendor,
  Customer,
  Gym,
  CheckIn,
  Transaction
};