const { Sequelize } = require('sequelize');
const { database } = require('../../config/config');

/**
 * Database config
 */
const sequelize = new Sequelize(
    database.database, 
    database.username, 
    database.password, {
        host: 'localhost',
        dialect: "mysql" 

    },
    database.dialectOptions, {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: true
  },
  database.timezone, '-05:00' //for writing to database

  );

  module.exports = sequelize