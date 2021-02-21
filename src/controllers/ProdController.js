const { Product } = require("../database/models/dbModel");

module.exports = {
  
/* Creating one */

  async creatingOne(req, res) {
    let products = await Product.create({
      pdtLargeName: req.body.pdtLargeName,
      pdtShortName: req.body.pdtShortName,
      pdtDescription: req.body.pdtDescription,
      pdtPrice: req.body.pdtPrice,
      pdtBigImg: req.body.pdtBigImg,
      pdtThumbnail: req.body.pdtThumbnail,
      pdtStatus: req.body.pdtStatus,
    });

    res.status(200).json(products);
  },

/* Getting all Products by status */

  async gettingAll(req, res) {
    let products = await Product.findAll({ where: { pdtStatus: "Enabled" } });

    res.status(200).json(products);
  },

/* Middleware Find Product by ID */

  async findProduct(req, res, next) {
    let product = await Product.findOne({ where: { pdtID: req.params.id } });

    if (!product) {
      res.status(404).json({ msg: "Product not found" });
    } else {
      req.product = product;
      next();
    }
  },

/* Getting one by ID */

  async gettingOne(req, res) {
    res.status(200).json(req.product);
  },

/* Updating one */

  async updatingOne(req, res) {
    req.product.pdtLargeName = req.body.pdtLargeName;
    req.product.pdtShortName = req.body.pdtShortName;
    req.product.pdtDescription = req.body.pdtDescription;
    req.product.pdtPrice = req.body.pdtPrice;
    req.product.pdtBigImg = req.body.pdtBigImg;
    req.product.pdtThumbnail = req.body.pdtThumbnail;
    req.product.pdtStatus = req.body.pdtStatus;

    req.product.save().then((product) => {
      res.status(200).json({ msg: "Product has been updated.", product });
    });
  },

/* Deleting one */

  async deletingOne(req, res) {
    req.product.destroy().then(() => {
      res.status(200).json({ msg: "Product has been deleted" });
    });
  },
  
};
