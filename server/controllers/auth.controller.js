const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");

exports.login = (req, res) => {
  const user = new User();
};

exports.register = (req, res) => {
  res.send("login");
};

exports.logout = (req, res) => {
  res.send("login");
};
