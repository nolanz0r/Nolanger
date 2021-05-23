const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const authController = require("../controllers/auth.controller");

router
  .route("/login")
  .post(
    [check("email").isEmail(), check("password").isLength(6)],
    authController.login
  );
router
  .route("/register")
  .post(
    [check("email").isEmail(), check("password").isLength(6)],
    authController.register
  );
router.route("/logout").get(authController.logout);

module.exports = router;
