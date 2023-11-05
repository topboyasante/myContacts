const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//@desc Register A User
//@route POST /users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, email, password, confirm_password } = req.body;
  if (!fullname || !username || !email || !password || !confirm_password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvailable = await User.findOne({
    $or: [{ username: username }, { email: email }],
  });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already exists");
  }

  //check if passwords are the same
  if (password !== confirm_password) {
    res.status(400);
    throw new Error("The passwords are not the same");
  }
  //Hashed Password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    fullname,
    password: hashedPassword,
  });

  if (user) {
    res
      .status(201)
      .json({ _id: user.id, email: user.email, fullname: user.fullname });
  } else {
    res.status(400);
    throw new Error("User Info provided is invalid");
  }
});

//@desc Log In A User
//@route POST /users/register
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  //Check to see if user exists in the DB
  const userAvailable = await User.findOne({ email });
  //compare password with hashed password
  if (
    userAvailable &&
    (await bcrypt.compare(password, userAvailable.password))
  ) {
    const accessToken = jwt.sign(
      {
        //the payload contains the information we want the user to get access to:
        user: {
          fullname: userAvailable.fullname,
          username: userAvailable.username,
          email: userAvailable.email,
          id: userAvailable.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "43200m" } //30 days
    );
    res.status(200).json({
      accessToken,
    });
  } else {
    res.status(401);
    throw new Error("Email or Password is not valid");
  }
});

//@desc Current User Info
//@route GET /users/current
//@access private
const getCurrentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

//@desc Delete A User
//@route delete /users/delete/:id
//@access private
const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.params.id;

  try {
    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    // Delete the user
    await User.deleteOne({ _id: userId });

    res.status(200).json({ message: "Your account has been deleted!" });
  } catch (error) {
    res.status(500);
    throw new Error(
      "There was an error deleting your account: " + error.message
    );
  }
});

module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
  deleteUser,
};
