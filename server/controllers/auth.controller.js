const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");

const User = require("../models/user.model");

exports.login = (req, res) => {
  try {
    const { email, password } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.findOne({ email }).then((user) => {
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
          };

          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
              expiresIn: 31556926,
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  } catch (err) {
    console.log(err);
  }
};

exports.register = (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
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
                };

                jwt.sign(
                  payload,
                  process.env.JWT_SECRET,
                  {
                    expiresIn: 31556926,
                  },
                  (err, token) => {
                    res.json({
                      success: true,
                      token: "Bearer " + token,
                    });
                  }
                );
              })
              .catch((err) => console.log(err));
          });
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.logout = (req, res) => {
  res.send("login");
};
