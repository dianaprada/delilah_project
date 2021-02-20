const { User } = require('../database/models/dbModel');

module.exports = { 

     /* Middelware Find User by ID */

     isAdmin(req, res, next) { 

        let userRol = req.user.userRol;
        console.log('El rol del usuario es: ', req.user);
        let userStatus = req.user.userStatus;

            if(userRol === "Admin" && userStatus === "Enabled") {
                
                next();
                
            } else{
                
                res.status(401).json({ msg: "Unauthorized user" })
                
            }  
          
    },

}