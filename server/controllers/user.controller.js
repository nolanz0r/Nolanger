const User = require("../models/user.model");
const searchRegex = require("../utils/searchRegex");

class UserController {
  constructor(io) {
    this.io = io;
  }

  search(req, res) {
    const { search, page } = req.query;

    const regex = new RegExp(searchRegex(search), "gi");

    User.find({ name: regex }, { password: false }).then((users) => {
      if (!users.length) {
        return res.status(500).json({ message: "No results for this search" });
      }
      res.status(200).json(users);
    });
  }
}
module.exports = new UserController();
