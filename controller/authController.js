const { userSchema } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

//REGISTER FUNCTION THAT REGISTERS NEW USERS
const register = async (req, res) => {
  try {
    const {
      usernameFromUser,
      emailFromUser,
      passwordFromUser,
      phoneNumberFromUser
    } = req.body;
    //validate user input
    if (!(emailFromUser && passwordFromUser && phoneNumberFromUser)) {
      return res.status(400).json({
        status: "All input is required"
      });
    }
    //check if user already exist in database
    const oldUser = await userSchema.findOne({ emailDB: emailFromUser });
    if (oldUser) {
      return res.status(409).json({
        status: "user already exists, please Login instead"
      });
    }
    //ACCORDING TO BCRYPT DOCUMENTATION, YOU TURN A PLAIN PASSWORD TO A HASHED PASSWORD
    //BY USING THE NEXT TWO LINES OF CODE WHERE THE 'passwordFromUser' IS THE PASSWORD GOTTEN FROM
    //THE FRONTEND USER(A String)
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(passwordFromUser, salt);

    //SAVE THE USER CREDENTIALS TO DATABASE

    const newUser = new userSchema({
      usernameDB: usernameFromUser,
      emailDB: emailFromUser.toLowerCase(),
      phoneNumberDB: phoneNumberFromUser,
      passwordDB: hashedPassword,
      roleDB: 'user'
    });

    const createdUser = await newUser.save();

    //generate token
    const token = jwt.sign(
      { username: newUser.usernameDB },
      process.env.jwtkey
    );

    createdUser.tokenDB = token;

    res.status(201).json({
      status: "user registered successfully to database",
      details: createdUser
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({message: "An error has occured."});
  }
};

//LOGIN FUNCTION
const login = async (req, res) => {
  try {
    const { emailFromUser, passwordFromUser } = req.body;
    console.log(req.body);

    const user = await userSchema.findOne({ emailDB: emailFromUser });
    //TO LOGIN, USE BCRYPT TO COMPARE THE PASSWORD SUPPLIED BY USER TO THE PASSWORD
    //FETCHED FROM THE DATABASE
    if (!user) res.status(400).json({message: "user does not exist"});
    const verifyCredentials = bcrypt.compareSync(
      passwordFromUser,
      user.passwordDB
    );
    if (verifyCredentials) {
      //jwt.sign is a method that encrypts data we want to trasfer and the signature(jwtkey)
      //jwtkey is a random string stored in .env
      const findUser = await userSchema.findOne({ emailDB: emailFromUser });
      const token = jwt.sign(
        { userId: findUser._id, username: findUser.usernameDB },
        process.env.jwtkey
      );
      let addTokenToDB = await userSchema.findOneAndUpdate(
        { emailDB: emailFromUser },
        { loggedIn: true },
        { new: true }
      );

      // You are not expected to store json web tokens on your database
      res.json({status: "Successful", token});
      // res.sendFile(path.resolve(__dirname, "../public/loggedIn.html"));
    } else {
      res.status(400).json({message: "wrong username or password"});
    }
  } catch (error) {
    console.log(error);
    res.json({message: "Something went"});
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

const logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const verifiedToken = jwt.verify(token, process.env.jwtkey);
  console.log(verifiedToken);
  if (verifiedToken) {
    const user = await userSchema.findOneAndUpdate(
      { usernameDB: verifiedToken.username },
      { loggedIn: false, tokenDB: "" }
    );

    res.status(200).send(`${user.usernameDB} logged out`);
  }
};
module.exports = { register, login, general, restricted, logout };
