/* Configure Database */
const { User } = require("../database/models/dbModel");
const { Op } = require("sequelize");

/* Password hashing */
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

/* Authentication */
const authConfig = require("../../config/auth");

module.exports = {
  /* login */
  signIn(req, res) {
    let { userAccount, password } = req.body;

    /* Find User */
    User.findAll({
      where: {
        [Op.or]: [{ userName: userAccount }, { userEmail: userAccount }],
      },
    })
      .then((users) => {
        if (!users) {
          res.status(404).json({ message: "User not found" });
        } else {
          if (bcrypt.compareSync(password, users[0].password)) {
            /* Create Token */
            let token = jwt.sign({ user: users[0] }, authConfig.secret, {
              expiresIn: authConfig.expires,
            });

            res.json({
              user: users[0],
              token: token,
            });
          } else {
            // Unathorized Access
            res.status(401).json({ message: "Invalid username or password" });
          }
        }
      })
      .catch((err) => {
        res.status(401).json({ message: "Invalid username or password" });
      });
  },

  /* Register - Create new user */
  signUp(req, res) {
    let passwordLen = req.body.password;

    if (
      passwordLen === null ||
      passwordLen === "null" ||
      passwordLen.length < 8 ||
      passwordLen.length > 20
    ) {
      res
        .status(400)
        .json({
          message: "Password must be between 8 and 20 characters in length.",
        });
    } else {
      /* Encrypt password */
      let hashPassword = bcrypt.hashSync(
        req.body.password,
        Number.parseInt(authConfig.rounds)
      );

      /* Create a user */
      User.create({
        userRol: req.body.userRol,
        userName: req.body.userName,
        userFullName: req.body.userFullName,
        password: hashPassword,
        userEmail: req.body.userEmail,
        userPhone: req.body.userPhone,
        userAddress: req.body.userAddress,
        userStatus: req.body.userStatus,
      })
        .then((user) => {
          /* Create Token */
          let token = jwt.sign({ user: user }, authConfig.secret, {
            expiresIn: authConfig.expires,
          });
          //res.status(201).json({ message: "User created" });
          res.json({
            user: user,
            token: token,
          });
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    }
  },

  /* Getting all */

  gettingAll(req, res) {
    User.findAll({ where: { userStatus: "Enabled" } }).then((users) => {
      res.status(200).json(users);
    });
  },

  /* Middelware Find User by ID */

  findUser(req, res, next) {
    User.findOne({ where: { userID: req.params.id } }).then((user) => {
      if (!user) {
        res.status(404).json({ msg: "User not found" });
      } else {
        req.user = user;
        next();
      }
    });
  },

  /* Getting one by ID */

  gettingOne(req, res) {
    res.status(200).json(req.user);
  },

  /* Updating one */

  updatingOne(req, res) {
    /* Encrypt password */
    let hashNewPassword = bcrypt.hashSync(
      req.body.password,
      Number.parseInt(authConfig.rounds)
    );

    req.user.userRol = req.body.userRol;
    req.user.userName = req.body.userName;
    req.user.userFullName = req.body.userFullName;
    req.user.password = hashNewPassword;
    req.user.userEmail = req.body.userEmail;
    req.user.userPhone = req.body.userPhone;
    req.user.userAddress = req.body.userAddress;
    req.user.userStatus = req.body.userStatus;

    req.user.save().then((user) => {
      res.status(200).json({ msg: "User has been updated.", user });
    });
  },

  /* Deleting one */

  deletingOne(req, res) {
    req.user.destroy().then(() => {
      res.status(200).json({ msg: "User has been deleted" });
    });
  },
};

// https://www.youtube.com/watch?v=VuYLMnaH1Hc&t=240s

// https://www.youtube.com/watch?v=E-O2504WiwQ&t=13s

//Minuto 9

//https://www.youtube.com/watch?v=VuYLMnaH1Hc

//Nodejs api with express and mysql using sequelize part 1 - getting started
// https://www.youtube.com/watch?v=0qWOfXWC8jQ

//https://www.youtube.com/watch?v=0qWOfXWC8jQ&list=PLjfaBzlo-EiSBxKizxwQQbNBuTpv1x14e

//Build a Node.js App With Sequelize [1] - Connection & Model
//https://www.youtube.com/watch?v=bOHysWYMZM0

//Build a Node.js App With Sequelize [2] - UI & Handlebars
//https://www.youtube.com/watch?v=67OhLlFPqFQ

//Build a Node.js App With Sequelize [3] - Add & Search
//https://www.youtube.com/watch?v=6jbrWF3BWM0
