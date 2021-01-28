require('dotenv').config();

/* Server config */
const express = require('express');
const server = express();

/* Routes */
const Router = require('./src/routes/router');
server.use('/', Router);

/* Database and Schemas */
const sequelize = require('./src/database/db');

/* Port config */
const PORT = process.env.PORT;  

/**
 * Middlewares
 */

 /* Lets server accept JSON as a body */
server.use(express.json()); 
server.use(express.urlencoded({ extended: false }));

const { errorHandler } = require('./src/middlewares/errorHandler');

var cors = require('cors');
server.use(cors()); //Enable CORS Origin *

//server.use(errorHandler);

/**
 * Start Server
 */
server.listen(PORT, (() => {
  console.log(`Listening on port ${PORT}`);

/* Database connection */
/*
  sequelize.authenticate().then(() => {
    console.log("Database is connected")
  }).catch((error) => {
    console.log('An error has occurred: ', error);
  })
*/
}));

/**
* Force True: Drop Tables
*/
sequelize.sync({ force: false })
.then(() => {
  console.log("Tables have been created")
}).catch((error) => {
  console.log("Something was wrong: ", error);
});


