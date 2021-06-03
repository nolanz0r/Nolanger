const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

class MessageController {
  constructor(io) {
    this.io = io;
  }

  getAll(req, res) {
    const { conversationId } = req.body;

    Message.find({ conversation: conversationId })
      .populate(["conversation", "createdBy"])
      .exec((err, messages) => {
        if (err) {
          return res.status(404).json({
            status: "error",
            message: "Messages not found",
          });
        }
        res.json(messages);
      });
  }
  create(req, res) {
    const { id, text, conversationId } = req.body;
    const postData = {
      text: text,
      conversation: conversationId,
      createdBy: id,
    };
    const message = new Message(postData);
    message
      .save()
      .then((message) => {
        message.populate(["conversation", "createdBy"], (err, message) => {
          if (err) {
            return res.status(500).json({
              message: err,
            });
          }

          Conversation.findOneAndUpdate(
            { _id: postData.conversation },
            { lastMessage: message._id },
            (err) => {
              if (err) {
                return res.status(500).json({
                  message: err,
                });
              }
            }
          );

          res.json(message);

          this.io.emit("SERVER:NEW_MESSAGE", message);
        });
      })
      .catch((reason) => {
        res.json(reason);
      });
  }
}
module.exports = MessageController;
