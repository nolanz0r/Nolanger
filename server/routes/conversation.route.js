const { Router } = require("express");
const router = new Router();
const ConversationController = require("../controllers/conversation.controller");

module.exports = (io) => {
  const conversationController = new ConversationController(io);

  router.post("/create", (...args) => conversationController.create(...args));
  router.get("/getAll", conversationController.getAll);

  return router;
};
