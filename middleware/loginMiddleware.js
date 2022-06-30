const jwt = require("jsonwebtoken");
const { userSchema } = require("../models/userModel");

//THIS IS A MIDDLEWARE FUNCTION THAT IS PASSED INTO THE ROUTE THAT CHECKS
//IF THE USER CAN ACCESS A RESTRICTED ROUTE
const check = (req, res, next) => {
    //INSIDE THE REQUEST HEADERS IT IS EXPECTED THAT LOGGED IN USERS
    //SHOULD HAVE AN AUTHORIZATION(THE jwt token generated on user-login) 
  if (req.headers.authorization) {
    // console.log(req.headers.authorization);
    // console.log(req.headers);

    // THE TOKEN CONSISTS OF DIFFERENT PARTS(CHECK JWT DOCUMENTATION)
    //THE .split METHOD SPLITS IT AND RETURNS AN ARRAY, 
    
    if (req.headers.authorization.split(" ")[0] == "Bearer") {
      //THE TOKEN IS THE SECOND ITEM IN THE ARRAY
      const token = req.headers.authorization.split(" ")[1];

      jwt.verify(token, process.env.jwtkey, async (err, payload) => {
        if (err) {
          console.log(err);
        } else {
          const user = await userSchema.findOne({
            usernameDB: payload.username,
          });
          if (user) {
            res.json({
              username: payload.username,
              presentInDatabase: true,
              tokenVerified: true,
            });
            // THE NEXT FUNCTION IS CALLED WHEN ALL THE CRITERIA IS MET
            next();
          } else {
            return res.send("username not found in the database");
          }
        }
      });
    } else {
      res.send("token type not Bearer");
    }
  } else {
    res.send("you are not authorized");
  }
};

module.exports = { check };
