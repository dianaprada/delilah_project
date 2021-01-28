/* Configure serv & */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


/* Configure Database */
const db = require('../database/models/dbModel');
const { Op } = require('sequelize');

/* Controllers */
const AuthController = require('../controllers/AuthController');


/**
 * Middlewares
 */

 /* create application/json parser */
const jsonParser = bodyParser.json();

/* create application/x-www-form-urlencoded parser */
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/**
 * connection test
 *//*
router.get('/products', function(req, res){
    //res.send('Hello world');
    res.json({
      success: 1,
      message: "This rest API is working"
    })
})*/

/**
* Products CRUD
*/

/* Getting all Products by status */

router.get('/products', ((req, res) => {
   db.Product.findAll({ where: { pdtStatus: "enabled" } }).then((products) => {
     res.status(200).json(products);
   }).catch ((err) => {
     res.status(400).json({ message: err.message })
   })
 }));

/* Creating one */

router.post('/products/new', jsonParser, ((req, res) => {
   db.Product.create({
       pdtLargeName: req.body.pdtLargeName,
       pdtShortName: req.body.pdtShortName,
       pdtDescription: req.body.pdtDescription,
       pdtPrice: req.body.pdtPrice,
       pdtBigImg: req.body.pdtBigImg,
       pdtThumbnail: req.body.pdtThumbnail,
       pdtStatus: req.body.pdtStatus
   })
    .then((newProduct) => {
      res.status(201).json(newProduct);
    }).catch ((err) => {
      res.status(400).json({ message: err.message })
    })
 }));
 
/* Getting one by ID */

router.get('/products/:id', ((req, res) => {
  let id = req.params.id;
  db.Product.findOne( { where: { pdtID: id } })
  .then((product) => {
    res.status(200).json(product);
  }).catch ((err) => {  
    res.status(400).json({ message: err.message })
  })
}));


/* Updating one */

router.put('/products/:id', jsonParser, ((req, res) => {
  let id = req.params.id;
  let newData = req.body;
    db.Product.findOne ( { where: { pdtID: id }} )
      .then((product) => {
        product.update(newData)
          .then((pdtUpdated) => {
            res.status(200).json(pdtUpdated);
          }).catch ((err) => {  
            res.status(400).json({ message: err.message })
          })
      })
}));

/* Deleting one */

router.delete('/products/:id', ((req, res) => {
  let id = req.params.id;
  db.Product.destroy( { where: { pdtID: id } })
  .then((product) => {
    res.status(204).json(product);
  }).catch ((err) => {  
    res.status(400).json({ message: err.message })
  })
}));

/**
 * User Login
 */

router.post('/login',  AuthController.signIn);

/**
 * Register - Create new user
 */

router.post('/register', jsonParser, AuthController.signUp);



/**
* Users CRUD
*/

/* Getting all */

router.get('/users', ((req, res) => {
  res.send('Returns all users');
}));

/* Getting one by ID */

router.get('/users/:id', ((req, res) => {
  let id = req.params.id;
  db.User.findOne( { where: { userID: id } })
  .then((user) => {
    res.status(200).json(user);
  }).catch ((err) => {  
    res.status(400).json({ message: err.message })
  })
}));

/* Updating one */
router.put('/users/:id', jsonParser, ((req, res) => {
  let id = req.params.id;
  let newData = req.body;
    db.User.findOne ( { where: { userID: id }} )
      .then((user) => {
        user.update(newData)
          .then((userUpdated) => {
            res.status(200).json(userUpdated);
          }).catch ((err) => {  
            res.status(400).json({ message: err.message })
          })
      })
}));

/* Deleting one */

router.delete('/users/:id', ((req, res) => {
  let id = req.params.id;
  db.User.destroy( { where: { userID: id } })
  .then((user) => {
    res.status(204).json(user);
  }).catch ((err) => {  
    res.status(400).json({ message: err.message })
  })
}));

/**
* Favorites CRUD
*/

/* Creating one */

/* Getting all */

/* Getting one by ID */

/* Updating one */

/* Deleting one */


/**
* Orders CRUD
*/

/* Creating one */

/* Getting all */

/* Getting one by ID */

/* Updating one */

/* Deleting one */

/**
* Products_Orders CRUD
*/

/* Creating one */

/* Getting all */

/* Getting one by ID */

/* Updating one */

/* Deleting one */



module.exports = router