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

/* Getting all Products by status */
router.get("/products", auth, ProdController.gettingAll);

/* Creating one - Only admin users */
router.post(
  "/products/new",
  jsonParser,
  auth,
  RolController.isAdmin,
  ProdController.creatingOne
);

/* Getting one by ID */
router.get(
  "/products/:id",
  auth,
  RolController.isAdmin,
  ProdController.findProduct,
  ProdController.gettingOne
);

/* Updating one - Only admin users */
router.put(
  "/products/:id",
  jsonParser,
  auth,
  RolController.isAdmin,
  ProdController.findProduct,
  ProdController.updatingOne
);

/* Deleting one - Only admin users */
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

/* Getting all - Only admin users consults all users */
router.get("/users", auth, RolController.isAdmin, AuthController.gettingAll);

/* Getting one by ID - Only admin users consults users by ID */
router.get(
  "/users/:id",
  auth,
  RolController.isAdmin,
  AuthController.findUser,
  AuthController.gettingOne
);

/* Updating one - Only admin users */
router.put(
  "/users/:id",
  jsonParser,
  auth,
  RolController.isAdmin,
  AuthController.findUser,
  AuthController.updatingOne
);

/* Deleting one - Only admin users */
router.delete(
  "/users/:id",
  auth,
  RolController.isAdmin,
  AuthController.findUser,
  AuthController.deletingOne
);

/* TO DO IN SWAGGER */

/**
 * Favorites CRUD
 */

/* Creating one */ router.post(
  "/favorites/users/",
  jsonParser,
  auth,
  RolController.isClient,
  FavController.checkUser,
  FavController.findProduct,
  FavController.checkDuplicates,
  FavController.creatingOne
);

/* Getting all - Return all favorite dishes of a user  */
router.get(
  "/favorites/users/:id",
  auth,
  RolController.isClient,
  FavController.checkUserParams,
  FavController.gettingAll
);

/* Deleting one */
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

/* Creating one */
/* User Client Create an order */
/* Can an admin user create an order? */

router.post(
  "/orders",
  jsonParser,
  auth,
  OrderController.checkUser,
  OrderController.createOrder
);

/* Getting all */
/* Admin user consults all orders that have been created by Client users */
/* Admin will be able to fetch any info. User only can view its own*/

router.get("/orders", auth, RolController.isAdmin, OrderController.gettingAll );

/* Getting all */
/* Admin user consults all orders that have been created by Client users */
/* Filter orders based on exact ISO date */
/* Admin will be able to fetch any info. User only can view its own*/

router.get("/orders/today", auth);

/* Getting one by ID */
/* Only Admin user consults one order that have been created by Client users */

router.get(
  "/order/:id",
  auth,
  RolController.isAdmin,
  OrderController.findOrder,
  OrderController.gettingOne
);


/* Getting one by UserID */
/* Only Admin user consults one order that have been created by Client users */

router.get(
  "/orders/:userID",
  auth,
  OrderController.checkUserParams,
  OrderController.gettingAllUserOrders
);


/* Updating one */
/* Only Admin user update one order that have been created by Client users */
router.put(
  "/orders/:id",
  jsonParser,
  auth,
  RolController.isAdmin,
  OrderController.findOrder,
  OrderController.updatingOne
);

/* Deleting one */
/* Only Admin user consults one order that have been created by Client users */

router.delete("/orders/:id", auth, RolController.isAdmin, OrderController.findOrder, OrderController.deletingOne);

/**
 * Products_Orders CRUD
 */

/* Creating one */
/* TO DO IN SWAGGER */
router.post("/product_orders", jsonParser, auth);

/* Getting all */
/* TO DO IN SWAGGER */
router.get("/product_orders", auth);

/* Getting one by ID */
/* TO DO IN SWAGGER */
router.get("/product_orders/:id", auth);

/* Updating one */
/* TO DO IN SWAGGER */
router.put("/product_orders/:id", jsonParser, auth);

/* Deleting one */
/* TO DO IN SWAGGER */
router.delete("/product_orders/:id", auth);

module.exports = router;
