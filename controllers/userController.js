const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc Register A User
//@route POST /users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }
  //Hashed Password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User Info provided is invalid");
  }

  res.json({ message: "Register User" });
});

//@desc Log In A User
//@route POST /users/register
//@access public
const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: "Login User" });
});

//@desc Current User Info
//@route GET /users/current
//@access private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Show current user info" });
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};
