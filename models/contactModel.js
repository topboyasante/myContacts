const mongoose = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id:{
      type: mongoose.Schema.Types.ObjectId,
      required:true,
      ref:"User"
    },
    name: {
      type: String,
      required: [true, "The contact name is required."],
    },
    email: {
      type: String,
      required: [true, "The contact email is required."],
    },
    phone_number: {
      type: String,
      required: [true, "The contact phone number is required."],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contact", contactSchema);
