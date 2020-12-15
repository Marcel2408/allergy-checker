'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { DB_USERNAME, DB_PASSWORD, DB_TEST_NAME } = require('../config');
const db = {};
const DB_NAME = process.env.NODE_ENV === 'test' ? DB_TEST_NAME : 'allergy_checker'


const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {dialect: "postgres", logging: false});


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
