const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  date: Date,
});

module.exports = User = model("users", UserSchema);
