/* Configure Database */
const { User } = require('../database/models/dbModel');
const { Op } = require('sequelize');

/* Password hashing */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const bodyParser = require('body-parser');

const authConfig = require('../../config/auth')

/**
* Middlewares
*/

/* create application/json parser */
const jsonParser = bodyParser.json();

module.exports = {

    /* login */
   signIn(req, res)  {

        let { userAccount, password } = req.body;
        //console.log(userAccount);
      /* Find User */
      User.findAll({
        where: {
            [Op.or]: [{userName: userAccount}, {userEmail: userAccount}]
          }

      }).then((users) => {
         // console.log(users);
          if(!users) {
            res.status(400).json({ message: "User not found" })

            } 
          else {
                if(bcrypt.compareSync(password, users[0].password)){
                     /* Create Token */
                     let token = jwt.sign({ user: users[0]}, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    res.json({
                        user: users[0],
                        token: token
                    });
                 } 
                else {
                    // Unathorized Access
                    res.status(409).json({ message: "Invalid username or password" })
                }
            }
 
      }).catch((err) => {
        res.status(409).json({ message: "Invalid username or password" })
      })
      
   },

    /* Register - Create new user */
    signUp(req, res) { 
        
        let passwordLen = req.body.password;
        if( passwordLen === null || passwordLen === "null" || passwordLen.length <8 || passwordLen.length >20)
            {
                res.status(400).json({ message: "Password must be between 8 and 20 characters in length." })
            }
        else{
            /* Encrypt password */
            let hashPassword = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));

            /* Create a user */
            User.create ({
                userRol: req.body.userRol,
                userName: req.body.userName,
                userFullName: req.body.userFullName,
                password: hashPassword,
                userEmail: req.body.userEmail,  
                userPhone: req.body.userPhone,
                userAddress: req.body.userAddress,
                userStatus: req.body.userStatus
            }).then((user) => {
                    /* Create Token */
                    let token = jwt.sign({ user: user}, authConfig.secret, {
                        expiresIn: authConfig.expires
                    });
                    //res.status(201).json({ message: "User created" });
                    res.json({
                        user: user,
                        token: token
                    });
                    
                })  
            .catch ((err) => {  
                        res.status(400).json({ message: err.message })
                    });

        }
               

    }

}
// https://www.youtube.com/watch?v=VuYLMnaH1Hc&t=240s    


// https://www.youtube.com/watch?v=E-O2504WiwQ&t=13s

//Minuto 9

//https://www.youtube.com/watch?v=VuYLMnaH1Hc


//Nodejs api with express and mysql using sequelize part 1 - getting started
// https://www.youtube.com/watch?v=0qWOfXWC8jQ

//https://www.youtube.com/watch?v=0qWOfXWC8jQ&list=PLjfaBzlo-EiSBxKizxwQQbNBuTpv1x14e