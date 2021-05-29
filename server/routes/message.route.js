const express = require("express");
const router = express.Router();

const messageController = require("../controllers/message.controller");

router.post("/create", messageController.create);
router.post("/getAll", messageController.getAll);

module.exports = router;
