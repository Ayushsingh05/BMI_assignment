const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
  },
  calculateHistory: [
    {
      height: { type: String },
      weight: { type: String },
      result: { type: String },
      date: { type: String },
    },
  ],
},{ timestamps: true });

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
