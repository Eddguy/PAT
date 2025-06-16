const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fname: { type: String, required: true },
  lname: { type: String, required: true },
  email: { type: String, required: true },
  skilllevel: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
