const { Model, DataTypes, Op } = require("sequelize");
const sequelize = require("../db");

/**
 * Products Model
 */

class Product extends Model {}
Product.init(
  {
    // attributes
    pdtID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pdtLargeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter the product name",
        },
      },
    },
    pdtShortName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "This Product short name is already taken.",
      },
      validate: {
        len: [5, 20], // only allow values with length between 10 and 20
        notNull: {
          msg: "Please enter the product short name",
        },
      },
    },
    pdtDescription: {
      type: DataTypes.STRING,
    },

    pdtPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "pdtPrice",
      validate: {
        isDecimal: true, // checks for any numbers
        notNull: {
          msg: "Please enter the product price",
        },
      },
    },
    pdtBigImg: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter the product image",
        },
      },
    },
    pdtThumbnail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter the product image",
        },
      },
    },
    pdtStatus: {
      type: DataTypes.ENUM("Enabled", "Disabled"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter the product status",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "product",
    // options
  }
);

/**
 * Users Model
 */

class User extends Model {}
User.init(
  {
    // attributes
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userRol: {
      type: DataTypes.ENUM("Admin", "Client"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter the User Rol",
        },
      },
    },
    userName: {
      type: DataTypes.STRING,
      //is: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      allowNull: false,
      required: true,
      unique: {
        msg: "This Username is already taken.",
      },
      validate: {
        // TO DO => Validación para que reciba el _ y -
        isAlphanumeric: {
          msg:
            'User Name only allow alphanumeric characters, so "_abc" will fail',
        }, // will only allow alphanumeric characters, so "_abc" will fail
        len: {
          args: [5, 20],
          msg: "User Name must be between 5 and 20 characters in length.",
        },
        notNull: {
          msg: "Please enter the User Name",
        },
      },
    },
    userFullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 100],
          msg: "Full Name must be between 8 and 100 characters in length.",
        },
        notNull: {
          msg: "Please enter the Full Name",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      validate: {
        len: [8, 200],
        notNull: {
          msg: "Please enter the password",
        },
      },
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      required: true,
      unique: {
        msg: "This Email address is already taken.",
      },
      validate: {
        isEmail: {
          msg: "Email address must be valid.",
        }, // checks for email format (foo@bar.com)
        len: {
          args: [7, 100],
          msg: "Email address must be between 7 and 100 characters in length.",
        },
        notNull: {
          msg: "Please enter an Email address",
        },
      },
    },
    userPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isNumeric: true, // will only allow numbers
        len: {
          args: [7, 10],
          msg: "Phone number must be between 7 and 10 characters in length.",
        },
        notNull: {
          msg: "Please enter a phone number",
        },
      },
    },
    userAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter an address",
        },
      },
    },
    userStatus: {
      type: DataTypes.ENUM("Enabled", "Disabled"),
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter an address",
        },
      },
    },
  },

  { 
    sequelize,
    modelName: "user",
  }

);

/**
 * Favorites Model
 */

class Favorite extends Model {}
Favorite.init(
  {
    // attributes
    favoriteId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pdtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // This is a reference to another model
        model: Product,

        // This is the column name of the referenced model
        key: "pdtId",
      },
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // This is a reference to another model
        model: User,

        // This is the column name of the referenced model
        key: "userID",
      },
    },
  },
  {
    sequelize,
    modelName: "favorite",
  }
);

/**
 * Orders Model
 */

class Order extends Model {}
Order.init(
  {
    // attributes
    orderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // This is a reference to another model
        model: User,

        // This is the column name of the referenced model
        key: "userID",
      },
    },
    orderStatus: {
      type: DataTypes.ENUM(
        "Confirmed",
        "In preparation",
        "On track",
        "Delivered"
      ),
      allowNull: false,
    },
    orderTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    orderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
      validate: {
        isDate: true, // only allow date strings
      },
    },
    orderPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true, // checks for any numbers
      },
    },
    paymentMethods: {
      type: DataTypes.ENUM("Cash", "Credit card", "Debit card"),
      allowNull: false,
      notNull: {
        msg: "Please select the payment method",
      },
    },
  },
  {
    sequelize,
    modelName: "order",
    // options
  }
);

/**
 * Products_Orders Model
 */

class Products_Order extends Model {}
Products_Order.init(
  {
    // attributes
    pdtOrderId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    pdtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // This is a reference to another model
        model: Product,

        // This is the column name of the referenced model
        key: "pdtId",
      },
    },
    orderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // This is a reference to another model
        model: Order,

        // This is the column name of the referenced model
        key: "orderID",
      },
    },
    pdtQty: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: true, // will only allow numbers
        notNull: {
          msg: "Please select the quantity of products",
        },
      },
    },
    priceOrder: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "priceOrder",
      validate: {
        isDecimal: true, // will only allow numbers
      },
    },
  },
  {
    sequelize,
    modelName: "products_order",
    // options
  }
);




/*
Bands.hasMany(Albums);
Bands.hasMany(Songs); 
Albums.hasMany(Songs); */

module.exports = { Product, User, Order, Favorite, Products_Order };
