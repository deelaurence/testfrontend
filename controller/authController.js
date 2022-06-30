const { userSchema } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const register = (req, res) => {
  const { usernameFromUser, emailFromUser, passwordFromUser } = req.body;
  console.log(usernameFromUser);
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(passwordFromUser, salt);
  const newUser = new userSchema({
    usernameDB: usernameFromUser,
    emailDB: emailFromUser,
    passwordDB: hashedPassword,
  });
  console.log(req.body);
  newUser.save(async (error) => {
    if (error) {
      console.log(error);
    } else {
      const user = await userSchema.findOne({ usernameDB: usernameFromUser });

      res.json({
        status: "user registered to database successfully",
        details: {
          DBusername: user.usernameDB,
          UserInputusername: usernameFromUser,
          DBemail: user.emailDB,
          userInputEmail: emailFromUser,
          DBpassword: user.passwordDB,
          userInputpassword: passwordFromUser,
        },
      });
    }
  });
};

const login = async (req, res) => {
  const { usernameFromUser, passwordFromUser } = req.body;

  const user = await userSchema.findOne({ usernameDB: usernameFromUser });
  const verifyCredentials = bcrypt.compareSync(
    passwordFromUser,
    user.passwordDB
  );
  if (verifyCredentials) {
    jwt.sign(
      { username: user.usernameDB },
      process.env.jwtkey,
      (err, token) => {
        return res.json({
          status: "user logged in successfully",
          details: {
            DBusername: user.usernameDB,
            UserInputusername: usernameFromUser,
            DBpassword: user.passwordDB,
            userInputpassword: passwordFromUser,
            useToken: token,
          },
        });
      }
    );
  } else {
    res.send("wrong username or password");
  }
};

const general = (req, res) => {
  res.send("general");
};
const restricted = (req, res) => {
  console.log(req.headers.authorization);
};
module.exports = { register, login, general, restricted };
