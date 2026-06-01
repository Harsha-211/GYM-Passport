const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Vendor = sequelize.define('Vendor', {
  id: { 
    type: DataTypes.UUID, 
    primaryKey: true 
  }, 
  business_name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  account_holder_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  account_number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ifsc_code: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [11, 11]
    }
  },
  bank_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  account_type: {
    type: DataTypes.ENUM('current', 'savings'),
    allowNull: false,
    defaultValue: 'current'
  }
});

module.exports = Vendor;