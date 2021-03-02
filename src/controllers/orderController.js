const {
  Order,
  User,
  Product,
  Products_Order,
} = require("../database/models/dbModel");

const { Op } = require("sequelize");

/**
 * Middlewares
 */

/* Check User - Body & req*/

async function checkUser(req, res, next) {
  let user = await User.findOne({ where: { userID: req.body.userID } });
  if (!user) {
    res.status(404).json({ msg: "User not found" });
  } else if (user.userID === req.user.userID) {
    next();
  } else {
    res.status(401).json({ msg: "Unauthorized User" });
  }
}

/* Check User - params & req*/

async function checkUserParams(req, res, next) {
  let user = await User.findOne({ where: { userID: req.params.userID } });
  if (!user) {
    res.status(404).json({ msg: "User not found" });
  } else if (user.userID === req.user.userID) {
    next();
  } else {
    res.status(401).json({ msg: "Unauthorized User" });
  }
}

/* Middleware Find Order by ID */

async function findOrder(req, res, next) {
  let order = await Order.findOne({ where: { orderID: req.params.id } });
  if (!order) {
    res.status(404).json({ msg: "Order not found" });
  } else {
    req.order = order;
    next();
  }
}

/* Middleware Check Order Data */

async function checkOrderData(req, res, next) {
  try {

    const prodPromises = req.body.prodArray.map((everyProd) => {
      const { pdtID } = everyProd;
      return Product.findOne({ where: { pdtID: pdtID } })
    })

    const products = await Promise.all(prodPromises);

    const checkProducts = products.filter(onlyOneProduct => onlyOneProduct === null);

    if (checkProducts.length === 0) {
      next();
    }
    else {
      res.status(404).json({ msg: "Product not found" });
    }

  } catch (error) {
    res.status(404).json({ msg: "Product not found" });
  }

};

/**
 * CRUD
 */

/* Creating one */

async function createOrder(req, res) {
  try {
      let order = Order.build({
        userID: req.body.userID,
        orderPrice: req.body.orderPrice,
        paymentMethods: req.body.paymentMethods,
      });

      await order.save().then((order) => {
        if (!order.orderID) {
          res.status(400).json({ msg: "Order not created" });
        } else {
          /* Read and insert Products*/
          req.body.prodArray.forEach((everyProd) => {
            const { pdtID, pdtQty, priceOrder } = everyProd;
            createProductsOrder(order.orderID, pdtID, pdtQty, priceOrder);
          });
          res.status(200).json(order);
        }
      });
   
  } catch (error) {
    res.status(400).json({ msg: "Order wasn't created" });
  }
}

/* Create Products in an order */

async function createProductsOrder(orderID, pdtID, pdtQty, priceOrder) {
  await Products_Order.create({
    pdtID: pdtID,
    orderID: orderID,
    pdtQty: pdtQty,
    priceOrder: priceOrder,
  });
}

/* Getting all Orders, order by date */

async function getAll(req, res) {

  let order = await Order.findAll({ 
    order: [['orderDate', 'DESC']],
    include: [ {
      model: User,
      attributes:['userName', 'userFullName', 'userEmail', 'userPhone', 'userAddress' ]
    },
    {
      model: Product,
      attributes:['pdtLargeName', 'pdtPrice', 'pdtThumbnail' ]
    } ]
  });

  if (!order) {
    res.status(404).json({ msg: "Order not found" });
  } else {
    res.status(200).json(order);
  }
  
}

/* Get one Order by ID */

async function getOne(req, res) {
  let order = await Order.findAll({ 
    where: { orderID: req.params.id },
    include: [ {
      model: User,
      attributes:['userName', 'userFullName', 'userEmail', 'userPhone', 'userAddress' ]
    },
    {
      model: Product,
      attributes:['pdtLargeName', 'pdtPrice', 'pdtThumbnail' ]
    } ]
  });

  if (!order) {
    res.status(404).json({ msg: "Order not found" });
  } else {
    res.status(200).json(order);
  }
}

/* Getting all User's Orders, order by date */



/* Get Orders by userID */

async function getUserOrders(req, res) {
  let orders = await Order.findAll({ where: { userID: req.params.userID } });

  if (!orders) {
    res.status(404).json({ msg: "Order not found" });
  } else {
    let order = await Order.findAll({ 
      where: { userID: req.params.userID },
      include: [ {
        model: User,
        attributes:['userName', 'userFullName', 'userEmail', 'userPhone', 'userAddress' ]
      },
      {
        model: Product,
        attributes:['pdtLargeName', 'pdtPrice', 'pdtThumbnail' ]
      } ]
    });
    res.status(200).json(order);
  }
}

/* Updating one */

async function updatingOne(req, res) {
  req.order.orderStatus = req.body.orderStatus;

  req.order.save().then((order) => {
    res.status(200).json({ msg: "Order has been updated.", order });
  });
}

/* Deleting one */

async function deletingOne(req, res) {
  req.order.orderStatus = "Canceled";

  req.order.save().then((order) => {
    res.status(200).json({ msg: "Order has been Canceled.", order });
  });
}



module.exports = {
  checkUser,
  checkUserParams,
  findOrder,
  checkOrderData,
  createOrder,
  getAll,
  getOne,
  getUserOrders,
  updatingOne,
  deletingOne,
};
