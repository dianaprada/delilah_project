/* Configure serv & ... */
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

/**
 * Middlewares
 */

/* create application/json parser */
const jsonParser = bodyParser.json();

/* create application/x-www-form-urlencoded parser */
const urlencodedParser = bodyParser.urlencoded({ extended: false });

/* Authentication */
const auth = require("../middlewares/auth");

/* Controllers */
const AuthController = require("../controllers/authController");
const ProdController = require("../controllers/prodController");
const FavController = require("../controllers/favController");
const OrderController = require("../controllers/orderController");
const RolController = require("../policies/rolPolicy");

/**
 * Products CRUD
 */

/* Get all Products by status */
router.get("/products", auth, ProdController.gettingAll);

/* Create Product - Only admin users */
router.post(
  "/products/new",
  jsonParser,
  auth,
  RolController.isAdmin,
  ProdController.creatingOne
);

/* Get Product by ID */
router.get(
  "/products/:id",
  auth,
  RolController.isAdmin,
  ProdController.findProduct,
  ProdController.gettingOne
);

/* Update Product - Only admin users */
router.put(
  "/products/:id",
  jsonParser,
  auth,
  RolController.isAdmin,
  ProdController.findProduct,
  ProdController.updatingOne
);

/* Delete Product - Only admin users */
router.delete(
  "/products/:id",
  auth,
  RolController.isAdmin,
  ProdController.findProduct,
  ProdController.deletingOne
);

/**
 * User Login
 */

router.post("/login", jsonParser, AuthController.signIn);

/**
 * Register - Create new user
 */

router.post("/register", jsonParser, AuthController.signUp);

/**
 * Users CRUD
 */

/* Get all Users - Only admin users consults all users */
router.get("/users", auth, RolController.isAdmin, AuthController.getAllUsers);

/* Getting User by ID - Only admin users consults users by ID */
router.get(
  "/users/:id",
  auth,
  RolController.isAdmin,
  AuthController.findUser,
  AuthController.gettingOne
);

/* Update User - Only admin users */
router.put(
  "/users/:id",
  jsonParser,
  auth,
  RolController.isAdmin,
  AuthController.findUser,
  AuthController.updatingOne
);

/* Delete User - Only admin users */
router.delete(
  "/users/:id",
  auth,
  RolController.isAdmin,
  AuthController.findUser,
  AuthController.deletingOne
);

/**
 * Favorites CRUD
 */

/* Create Favorite Dish*/
router.post(
  "/favorites/users/",
  jsonParser,
  auth,
  RolController.isClient,
  FavController.checkUser,
  FavController.findProduct,
  FavController.checkDuplicates,
  FavController.creatingOne
);

/* Get all favorites - Return all favorite dishes of an client User */
router.get(
  "/favorites/users/:id",
  auth,
  RolController.isClient,
  FavController.checkUserParams,
  FavController.gettingAll
);

/* Delete Favorite*/
router.delete(
  "/favorites/users/",
  jsonParser,
  auth,
  RolController.isClient,
  FavController.checkUser,
  FavController.findFav,
  FavController.deletingOne
);

/**
 * Orders CRUD
 */

/* Create an Order */
router.post(
  "/orders",
  jsonParser,
  auth,
  OrderController.checkUser,
  OrderController.checkOrderData,
  OrderController.createOrder
);

/* Get all Orders*/
/* Admin user consults all orders that have been created by Client users */
/* Admin will be able to fetch any info. User only can view its own*/

router.get("/orders", auth, RolController.isAdmin, OrderController.getAll);

/* Get order by ID*/
/* Admin user consults the details of an order */

router.get(
  "/order/:id",
  auth,
  RolController.isAdmin,
  OrderController.findOrder,
  OrderController.getOne
);

/* Get orders by UserID */
/* Client user consults his orders */

router.get(
  "/orders/:userID",
  auth,
  OrderController.checkUserParams,
  OrderController.getUserOrders
);

/* Update an Order */
/* Only Admin user update one order that have been created by Client users */

router.put(
  "/orders/:id",
  jsonParser,
  auth,
  RolController.isAdmin,
  OrderController.findOrder,
  OrderController.updatingOne
);

/* Delete Order */
/* Only an admin user can delete an order */

router.delete(
  "/orders/:id",
  auth,
  RolController.isAdmin,
  OrderController.findOrder,
  OrderController.deletingOne
);

module.exports = router;
