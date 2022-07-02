const jwt = require("jsonwebtoken");
const { userSchema } = require("../models/userModel");
//a middleware that checks if users are logged in
const check = async (req, res, next) => {
  //logged in user should have authorization key in headers
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1];
      const verifyToken = jwt.verify(token, process.env.jwtkey);
      if (verifyToken) {
        const user = await userSchema.findOne({
          usernameDB: verifyToken.username,
        });
        console.log(verifyToken);
        if (user && user.loggedIn == true) {
          res.json({
            message: `welcome to your profile, ${verifyToken.username}`,
            presentInDatabase: true,
          });
          next();
        } else {
          return res.send("please login to access this route");
        }
      } else {
        res.send("token not verified");
      }
    } else {
      res.send("provide authorization key");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { check };
