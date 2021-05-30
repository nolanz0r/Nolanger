const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

class ConversationController {
  async getAll(req, res) {
    const { conversationId } = req.body;

    Message.find({ conversation: conversationId })
      .populate(["conversation", "created_By"])
      .exec(function (err, messages) {
        if (err) {
          return res.status(404).json({
            status: "error",
            message: "Messages not found",
          });
        }
        res.json(messages);
      });
  }
  async create(req, res) {
    const { id, text, conversationId } = req.body;

    const postData = {
      text: text,
      conversation: conversationId,
      created_By: id,
    };

    const message = new Message(postData);

    message
      .save()
      .then((message) => {
        Conversation.findOneAndUpdate(
          { _id: postData.conversation },
          { lastMessage: message._id },
          function (err) {
            if (err) {
              return res.status(500).json({
                message: err,
              });
            }
          }
        );

        res.status(200).json(message);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = new ConversationController();
