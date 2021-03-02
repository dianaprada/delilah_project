const sequelize = require("../database/db");

const {
    User,
    Product,
  } = require("../database/models/dbModel");


const bcrypt = require("bcrypt");
const authConfig = require("../../config/auth");

const saltRounds = Number.parseInt(authConfig.rounds);

// Products
const products = [
  {
    pdtLargeName: "Ensalada Veggie",
    pdtShortName: "EnsdVegg",
    pdtDescription: "Con huevo, rúcula, champiñones y hummus de remolacha.",
    pdtPrice: "340",
    pdtBigImg: "/src/img/ensd_veg.png",
    pdtThumbnail: "/src/img/thumbnail/ensd_veg.png",
    pdtStatus: "Enabled"
},
{
  pdtLargeName: "Sandwich Veggie",
  pdtShortName: "SandVegg",
  pdtDescription: "Delicioso pan de orégano con rúcula, champiñones y hamburguesa de soja.",
  pdtPrice: "310",
  pdtBigImg: "/src/img/sand_veg.png",
  pdtThumbnail: "/src/img/thumbnail/ensd_veg.png",
  pdtStatus: "Enabled"
},
  {
    pdtLargeName: "Hamburguesa Clásica",
    pdtShortName: "HamClas",
    pdtDescription: "Carne aderezada para hacer hamburguesa casera americana auténtica.",
    pdtPrice: "350",
    pdtBigImg: "/src/img/ham_clas.png",
    pdtThumbnail: "/src/img/thumbnail/ham_clas.png",
    pdtStatus: "Enabled"
  },
  {
    pdtLargeName: "Bagel de Salmón",
    pdtShortName: "BagSal",
    pdtDescription: "Deliciosos bagels con Queso Philadelphia® en las bases del pan, salmón y las alcaparras, acompañado de aros de cebolla",
    pdtPrice: "425",
    pdtBigImg: "/src/img/bag_sal.png",
    pdtThumbnail: "/src/img/thumbnail/bag_sal.png",
    pdtStatus: "Enabled"
  },
  {
    pdtLargeName: "Focaccia",
    pdtShortName: "Focaccia",
    pdtDescription: "Focaccia tradicional italiana ",
    pdtPrice: "300",
    pdtBigImg: "/src/img/focaccia.png",
    pdtThumbnail: "/src/img/thumbnail/focaccia.png",
    pdtStatus: "Enabled"
  },
];

const hash_User_1 = bcrypt.hashSync("12345678901", saltRounds);
const hash_User_2 = bcrypt.hashSync("45678901234", saltRounds);
const hash_User_3 = bcrypt.hashSync("78901234567", saltRounds);
const hash_User_4 = bcrypt.hashSync("09876543210", saltRounds);
const hash_User_5 = bcrypt.hashSync("765765765765", saltRounds);
const users = [
  {
    userRol: "Client",
    userName: "queenfreddie",
    userFullName: "Freddie Mercury",
    password: hash_User_1,
    userEmail: "freddiemercury@gmail.com",
    userPhone: "7712345678",
    userAddress: "1 Logan PIKensington, London W8 6DE, UK",
    userStatus: "Enabled"
  },
  { 
    userRol: "Client",
    userName: "rollingmick",
    userFullName: "Mick Jagger",
    password: hash_User_2,
    userEmail: "mick_jagger@gmail.com",
    userPhone: "2072595392",
    userAddress: "66 Chiltern Street London W1M 2LS, UK",
    userStatus: "Enabled"
    
    },
    { 
      userRol: "Client",
      userName: "u2bono",
      userFullName: "Paul David Hewson",
      password: hash_User_3,
      userEmail: "u2_bono@gmail.com",
      userPhone: "2072355555",
      userAddress: "20 Draycott Place. Londres SW3 2RZ, UK",
      userStatus: "Enabled"
      
    },
    { 
      userRol: "Admin",
      userName: "johnsmith",
      userFullName: "John Smith",
      password: hash_User_4,
      userEmail: "john_smith_1@delilahresto.com",
      userPhone: "2072355555",
      userAddress: "64 N Row, London W1K 7DE, UK",
      userStatus: "Enabled"
      
    },
    { 
      userRol: "Admin",
      userName: "jeandoe",
      userFullName: "Jean Doe",
      password: hash_User_5,
      userEmail: "jean_doe_1@delilahresto.com",
      userPhone: "2072355555",
      userAddress: "64 N Row, London W1K 7DE, UK",
      userStatus: "Enabled"
      
      }
  
];


sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Conexión establecida con la base de datos");
  })
  .then(() => {
    products.forEach((prod) => Product.create(prod));
  })
  .then(() => {
    users.forEach((users) => User.create(users));
  });
