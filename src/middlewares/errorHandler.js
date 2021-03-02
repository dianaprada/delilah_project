const { ValidationError } = require("express-json-validator-middleware");

/**
 * @method errorHandler
 * @description Middleware that manages the errors
 */
const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(400).send("Invalid");
    next();
  } else {
    res.status(400).send("Something was wrong");
    next();
  }
};

module.exports = { errorHandler: errorHandler };
