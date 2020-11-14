'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { DB_USERNAME, DB_PASSWORD } = require('../config');
const db = {};


const sequelize = new Sequelize('allergy_checker', DB_USERNAME, DB_PASSWORD, {dialect: "postgres"});


fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
