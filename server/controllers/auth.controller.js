const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const User = require("../models/user.model");

const createJWT = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

class ConversationController {
  register(req, res) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.findOne(
      { $or: [{ name: req.body.name }, { email: req.body.email }] },
      (err, user) => {
        if (user) {
          return res
            .status(400)
            .json({ message: "User with that name or email already exists" });
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
          });

          bcrypt.genSalt(7, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then((user) => {
                  const payload = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                  };

                  const token = createJWT(payload);

                  res.status(200).json({ token: "Bearer " + token });
                })
                .catch((err) => console.log(err));
            });
          });
        }
      }
    );
  }

  login(req, res) {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(404).json({ message: "Email not found" });
      }

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            email: user.email,
          };

          const token = createJWT(payload);

          res.status(200).json({ token: "Bearer " + token });
        } else {
          return res.status(400).json({ message: "Password incorrect" });
        }
      });
    });
  }
}

module.exports = new ConversationController();
