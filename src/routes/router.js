/* Configure serv & */
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');


/* Configure Database */
const db = require('../database/models/dbModel');
const { Op } = require('sequelize');

/* Controllers */
const AuthController = require('../controllers/authController');
const ProdController = require('../controllers/prodController');
const RolController = require('../policies/rolPolicy');


/**
 * Middlewares
 */

 /* create application/json parser */
const jsonParser = bodyParser.json();

/* create application/x-www-form-urlencoded parser */
const urlencodedParser = bodyParser.urlencoded({ extended: false });

 /* Authentication */
 const auth = require('../middlewares/auth');


/**
* Products CRUD
*/

/* Getting all Products by status */
router.get('/products', auth, ProdController.gettingAll);

/* Creating one - Only admin users */
router.post('/products/new', jsonParser, auth, RolController.isAdmin, ProdController.creatingOne);

/* Getting one by ID */
router.get('/products/:id', auth, RolController.isAdmin, ProdController.findProduct,  ProdController.gettingOne);

/* Updating one - Only admin users */
router.put('/products/:id', jsonParser, auth, RolController.isAdmin, ProdController.findProduct, ProdController.updatingOne);

/* Deleting one - Only admin users */
router.delete('/products/:id', auth, RolController.isAdmin, ProdController.findProduct, ProdController.deletingOne);


/**
 * User Login
 */

router.post('/login', jsonParser, AuthController.signIn);

/**
 * Register - Create new user
 */

router.post('/register', jsonParser, AuthController.signUp);

/**
* Users CRUD
*/

/* Getting all - Only admin users consults all users */
router.get('/users', auth, RolController.isAdmin, AuthController.gettingAll);

/* Getting one by ID - Only admin users consults users by ID */
router.get('/users/:id', auth, RolController.isAdmin, AuthController.findUser, AuthController.gettingOne);

/* Updating one - Only admin users */
router.put('/users/:id', jsonParser, auth, RolController.isAdmin, AuthController.findUser, AuthController.updatingOne);

/* Deleting one - Only admin users */
router.delete('/users/:id', auth, RolController.isAdmin, AuthController.findUser, AuthController.deletingOne);


/**
* Favorites CRUD
*/

/* Creating one */
/* TO DO IN SWAGGER */

/* only Client users add a dish to their favorites */
router.post('/favorites/users/:id', jsonParser, ((req, res) =>{
  //res.send('Hello world');
  res.send('User Client adds a dish to his list of favorites');
}));

/* Getting all */
/* Return all favorite dishes of a user */


/* TO DO: Yo creo que está mal la ruta, que no puede ser :id 
*  el favoriteId, sino el userID
*/

router.get('/favorites/users/:id', ((req, res) => {
  let id = req.params.id;
  db.Favorite.findAll( { where: { userID: id } })
  .then((favs) => {
    res.status(200).json(favs);
  }).catch ((err) => {  
    res.status(401).json({ message: err.message })
  })
}));



/* Getting one by ID */
/* I think this route is not necessary */

router.get('/favorites/users/:id', ((req, res) => {
  res.send('Return a favorite dish by ID');
}));


/* Updating one */
/* I think this route is not necessary */

router.put('/favorites/users/:id', jsonParser, ((req, res) => {
   res.send('Update a favorite dish');
}));

/* Deleting one */

router.delete('/favorites/users/:id', ((req, res) => {
  res.send('Delete a favorite dish');
}));



/**
* Orders CRUD
*/

/* Creating one */
/* User Client Create an order */
/* Can an admin user create an order? */

router.post('/orders', jsonParser, ((req, res) =>{
  //res.send('Hello world');
  res.send('User Client creates a new order');
}));

/* Getting all */
/* Admin user consults all orders that have been created by Client users */
/* Filter orders based on exact ISO date */
/* Admin will be able to fetch any info. User only can view its own*/
router.get('/orders', ((req, res) => {
  res.send('return all orders of the day');
}));


/* Getting one by ID */

/* Only Admin user consults one order that have been created by Client users */

router.get('/orders/:id', ((req, res) => {
  res.send('returns a specific order');
}));



/* Updating one */

/* Only Admin user update one order that have been created by Client users */

router.put('/orders/:id', jsonParser, ((req, res) => {
  res.send('Update an Order');
}));

/* Deleting one */

/* Only Admin user consults one order that have been created by Client users */

router.delete('/orders/:id', ((req, res) => {
  res.send('Delete an Order');
}));

/**
* Products_Orders CRUD
*/

/* Creating one */
/* TO DO IN SWAGGER */
router.post('/product_orders', jsonParser, ((req, res) =>{
  //res.send('Hello world');
  res.send('????');
}));


/* Getting all */
/* TO DO IN SWAGGER */
router.get('/product_orders', ((req, res) => {
  res.send('????');
}));

/* Getting one by ID */
/* TO DO IN SWAGGER */
router.get('/product_orders/:id', ((req, res) => {
  res.send('????');
}));

/* Updating one */
/* TO DO IN SWAGGER */
router.put('/product_orders/:id', jsonParser, ((req, res) => {
  res.send('Update an ???');
}));

/* Deleting one */
/* TO DO IN SWAGGER */
router.delete('/product_orders/:id', ((req, res) => {
  res.send('Delete an ?????');
}));


module.exports = router