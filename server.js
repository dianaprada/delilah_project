require("dotenv").config();

/**
 * Server config
 */
const express = require("express");
const server = express();
/* Port config */
const PORT = process.env.PORT;

/**
 * Data Base and Schemas
 */
const sequelize = require("./src/database/db");

/**
 * Middlewares
 */

/* Cors */
var cors = require("cors");

/* Helmet */
const helmet = require("helmet");

/* errorHandler */
const { errorHandler } = require("./src/middlewares/errorHandler");

/**
 * Routes
 */
const Router = require("./src/routes/router");
server.use("/", Router);

/**
 * Middlewares
 */
server.use(cors()); //Enable CORS Origin *
server.use(helmet());

/* Lets server accept JSON as a body */
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use(errorHandler);

/**
 * Start Server
 */
server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

/**
 * Force True: Drop Tables
 */
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Tables have been created");
  })
  .catch((error) => {
    console.log("Something was wrong: ", error);
  });
