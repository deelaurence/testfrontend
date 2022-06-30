const { userSchema } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//REGISTER FUNCTION THAT REGISTERS NEW USERS
const register = (req, res) => {
  const { usernameFromUser, emailFromUser, passwordFromUser } = req.body;

  //ACCORDING TO BCRYPT DOCUMENTATION, YOU TURN A PLAIN PASSWORD TO A HASHED PASSWORD
  //BY USING THE NEXT TWO LINES OF CODE WHERE THE 'passwordFromUser' IS THE PASSWORD GOTTEN FROM
  //THE FRONTEND USER(A String)
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(passwordFromUser, salt);

  //SAVE THE USER CREDENTIALS TO DATABASE

  const newUser = new userSchema({
    usernameDB: usernameFromUser,
    emailDB: emailFromUser,
    phoneNumberDB: phoneNumberFromUser,
    passwordDB: hashedPassword,
  });
  newUser.save(async (error) => {
    if (error) {
      console.log(error);
    } else {
      //IF THE USER CREDENTIALS IS SAVED SUCESSFULLY, FETCH IT IMMEDIATELY AFTER
      //SAVING AND SEND THE DETAILS BACK AS res.json
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

//LOGIN FUNCTION
const login = async (req, res) => {
  const { usernameFromUser, passwordFromUser } = req.body;

  const user = await userSchema.findOne({ usernameDB: usernameFromUser });
  //TO LOGIN, USE BCRYPT TO COMPARE THE PASSWORD SUPPLIED BY USER TO THE PASSWORD
  //FETCHED FROM THE DATABASE
  const verifyCredentials = bcrypt.compareSync(
    passwordFromUser,
    user.passwordDB
  );
  //IF THE PASSWORD MATCH verifyCredential has a value of "true"
  if (verifyCredentials) {
    //THIS METHOD AVAILABLE IN THE jwt OBJECT ALLOWS US TO GENERATE A TOKEN WITH
    //THE HELP OF A SECRET KEY STORED AND FETCHED FROM THE .env FILE IT TAKES 3 ARGUEMENTS
    //A QUERY, THE SECRET KEY AND A CALLBACK FUNCTION
    //INSIDE THE CALLBACK FUNCTION THERE IS AN err AND token PARAMETER
    //THE TOKEN IS UNIQUE TO EACH USER AND IS USED TO CONFIRM LOGIN
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
            userToken: token,
          },
        });
      }
    );
  } else {
    res.send("wrong username or password");
  }
};
//THIS FUNCTION ACESSED BY EVERYBODY
const general = (req, res) => {
  res.send("general");
};

//THIS FUNCTION IS CALLED WHEN A GET REQUEST IS MADE TO THE /restricted ROUTE
//IT IS ONLY CALLED IF THE USER PASSES THE REQUIREMENTS IN THE check function
//IN THE authMiddleware FILE ONLY USERS WITH THE TOKEN SUPPLIED IN THEIR HEADER 
//DURING REQUEST CAN ACCESS
const restricted = (req, res) => {
  console.log(req.headers.authorization);
};
module.exports = { register, login, general, restricted };
