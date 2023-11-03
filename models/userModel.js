const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "The Full Name is required."],
    },
    username: {
      type: String,
      required: [true, "The username is required."],
    },
    email: {
      type: String,
      required: [true, "The email is required."],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "The password is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
