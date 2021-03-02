const { User } = require("../database/models/dbModel");

module.exports = {
  /* Middelware Find User by ID */

  isAdmin(req, res, next) {
    let userRol = req.user.userRol;
    let userStatus = req.user.userStatus;

    if (userRol === "Admin" && userStatus === "Enabled") {
      next();
    } else {
      res.status(401).json({ msg: "Unauthorized user" });
    }
  },

  /* Middelware Find User by ID */

  isClient(req, res, next) {
    let userRol = req.user.userRol;
    let userStatus = req.user.userStatus;

    if (userRol === "Client" && userStatus === "Enabled") {
      next();
    } else {
      res.status(401).json({ msg: "Unauthorized user" });
    }
  },
};
