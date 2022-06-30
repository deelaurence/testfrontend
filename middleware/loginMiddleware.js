const jwt = require("jsonwebtoken");
const { userSchema } = require("../models/userModel");
const check = (req, res, next) => {
  if (req.headers.authorization) {
    // console.log(req.headers.authorization);
    // console.log(req.headers);
    if (req.headers.authorization.split(" ")[0] == "Bearer") {
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
