'use strict';

module.exports = (sequelize, DataTypes) => sequelize.define('Allergy', {
  allegy: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
{
  timestamps: false //using the CLI I won't have to fill createTime and UpdateTime, that are columns made by Sequelize
});
