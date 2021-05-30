const { Router } = require("express");
const router = new Router();
const MessageController = require("../controllers/message.controller");

module.exports = (io) => {
  const messageController = new MessageController(io);

  router.post("/create", (...args) => messageController.create(...args));
  router.post("/getAll", messageController.getAll);

  return router;
};
