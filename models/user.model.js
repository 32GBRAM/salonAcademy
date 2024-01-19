const mongoose = require("mongoose");

const userDetails = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Owner", "Student"],
  },
});

const user = mongoose.model("Users", userDetails);

module.exports = { user };
