const { Favorite, Product, User } = require("../database/models/dbModel");

module.exports = {

/**
* Middlewares
*/

/* Check User - Body & req*/

async checkUser(req, res, next) {
  let user = await User.findOne({ where: { userID: req.body.userID } });
  if (user.userID === req.user.userID) {
    next();
  } else {
    res.status(401).json({ msg: "Unauthorized User" });
  }
},

/* Check User - params & req*/

async checkUserParams(req, res, next) {
  let user = await User.findOne({ where: { userID: req.params.id } });
  if (user.userID === req.user.userID) {
    next();
  } else {
    res.status(401).json({ msg: "Unauthorized User" });
  }
},

/* Find Product  */

  async findProduct(req, res, next) {
    let product = await Product.findOne({ where: { pdtID: req.body.pdtID } });
    if (!product) {
      res.status(404).json({ msg: "Product not found" });
    } else {
      next();
    }
  },

/* Check duplicate favorites */

  async checkDuplicates(req, res, next) {
    let { userID, pdtID } = req.body;
    let favorite = await Favorite.findOne({
      where: { userID: userID, pdtID: pdtID },
    });
    if (!favorite) {
      next();
    } else {
      res.status(400).json({ msg: "This dish is already taken." });
    }
  },

  /* Find Favorite */

  async findFav(req, res, next) {
    let { userID, pdtID } = req.body;
    let favorite = await Favorite.findOne({
      where: { userID: userID, pdtID: pdtID },
    });
    if (!favorite) {
      res.status(404).json({ msg: "Favorite dish not found" });
    } else {
      req.favorite = favorite;
      next();
    }
  },

/**
* Favorites CRUD
*/

/* Creating one */

  async creatingOne(req, res) {
    let favorites = await Favorite.create({
      pdtID: req.body.pdtID,
      userID: req.body.userID,
    });
    res.status(200).json(favorites);
  },

/* Getting all Favorites dishes  */

  async gettingAll(req, res) {
    let userId = req.params.id;
    let favorites = await Favorite.findAll({ where: { userID: userId } });
    res.status(200).json(favorites);
  },

/* Deleting one */

  async deletingOne(req, res) {
    req.favorite.destroy().then(() => {
      res.status(200).json({ msg: "Favorite dish has been deleted" });
    });
  },
  
};
