const User = require("../models/user.model");
const searchRegex = require("../utils/searchRegex");

class UserController {
  search(req, res) {
    const { search } = req.query;

    const page = parseInt(req.query.page, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || 10;
    const regex = new RegExp(searchRegex(search), "gi");

    User.find({ name: regex }, { password: false })
      .skip(page * limit)
      .limit(limit)
      .exec((err, users) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "No results for this search" });
        }
        if (!users.length) {
          return res
            .status(500)
            .json({ message: "No results for this search" });
        }
        User.find({ name: regex }, { password: false }).then((count) => {
          res.status(200).json({ users, count: count.length });
        });
      });
  }
}
module.exports = new UserController();
