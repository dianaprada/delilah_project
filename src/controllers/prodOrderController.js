const {
  Order,
  User,
  Product,
  Products_Order,
} = require("../database/models/dbModel");


module.exports = {
  /**
   * Middlewares
   */

  /* Check User - Body & req*/

  async checkUser(req, res, next) {
    let user = await User.findOne({ where: { userID: req.body.userID } });
    //console.log('console.log Order user.USERID: ', user.userID);
    //console.log('console.log Order req.user.userID: ', req.user.userID);
    //console.log('console.log Order rreq.body.userID : ', req.body.userID );
    if (user.userID === req.user.userID) {
      next();
    } else {
      res.status(401).json({ msg: "Unauthorized User" });
    }
  },

  /* Check User - params & req*/

  async checkUserParams(req, res, next) {
    let user = await User.findOne({ where: { userID: req.params.userID } });
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    } else if (user.userID === req.user.userID) {
      next();
    } else {
      res.status(401).json({ msg: "Unauthorized User" });
    }
  },

  /* Middleware Find Order by ID */

  async findOrder(req, res, next) {
    let order = await Order.findOne({ where: { orderID: req.params.id } });
    if (!order) {
      res.status(404).json({ msg: "Order not found" });
    } else {
      req.order = order;
      next();
    }
  },

  /**
   * CRUD
   */

  /* Creating one */

  async createOrder(req, res) {
    let order = Order.build({
      userID: req.body.userID,
      orderPrice: req.body.orderPrice,
      paymentMethods: req.body.paymentMethods,
    });

    await order.save().then((order) => {
      if (!order.orderID) {
        res.status(400).json({ msg: "Order not created" });
      } else {
        /* Read Products*/
        req.body.prodArray.forEach((everyProd) => {
          const { pdtID } = everyProd;
          let product = Product.findOne({ where: { pdtID: pdtID } });
          if (!product) {
            res.status(404).json({ msg: "Product not found" });
          }
        });

        /* Read and insert Products*/
        req.body.prodArray.forEach((everyProd) => {
          const { pdtID, pdtQty, priceOrder } = everyProd;
          createProductsOrder(order.orderID, pdtID, pdtQty, priceOrder);
        });
        res.status(200).json(order);
      }
    });
  },



  /* Create Products in an order */

  createProductsOrder(orderID, pdtID, pdtQty, priceOrder) {
     await Products_Order.create({
      pdtID: pdtID,
      orderID: orderID,
      pdtQty: pdtQty,
      priceOrder: priceOrder,
    });

  },

  /* Getting all Orders, order by date */

  async gettingAll(req, res) {
    let orders = await Order.findAll({
      offset: 5,
      limit: 25,
      order: "createdAt DESC",
    });

    res.status(200).json(orders);
  },

  /* Getting one by ID */

  async gettingOne(req, res) {
    let order = await Order.findAll({ where: { orderID: req.params.id } });

    if (!order) {
      res.status(404).json({ msg: "Order not found" });
    } else {
      res.status(200).json(order);
    }
  },

  /* Getting all User's Orders, order by date */

  async gettingAllUserOrders(req, res) {
    let orders = await Order.findAll({
      offset: 5,
      limit: 25,
      order: "createdAt DESC",
    });

    res.status(200).json(orders);
  },

  /* Get Orders by userID */

  async getUserOrders(req, res) {
    let orders = await Order.findAll({ where: { userID: req.params.userID } });

    if (!orders) {
      res.status(404).json({ msg: "Order not found" });
    } else {
      res.status(200).json(orders);
    }
  },

  /* Updating one */

  async updatingOne(req, res) {
    req.order.userID = req.body.userID;
    req.order.orderStatus = req.body.orderStatus;
    req.order.orderTime = req.body.orderTime;
    req.order.orderDate = req.body.orderDate;
    req.order.orderPrice = req.body.orderPrice;
    req.order.paymentMethods = req.body.paymentMethods;

    req.order.save().then((order) => {
      res.status(200).json({ msg: "Order has been updated.", order });
    });
  },

  /* Deleting one */

  async deletingOne(req, res) {
    req.order.destroy().then(() => {
      res.status(200).json({ msg: "Order has been deleted" });
    });
  },
};
