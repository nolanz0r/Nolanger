const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");

class ConversationController {
  constructor(io) {
    this.io = io;
  }

  getAll(req, res) {
    const { _id } = req.user;

    Conversation.find()
      .or([{ author: _id }, { partner: _id }])
      .populate(["author", "partner"])
      .populate({
        path: "lastMessage",
        populate: {
          path: "user",
        },
      })
      .exec((err, conversations) => {
        if (err) {
          return res.status(404).json({
            message: "Conversations not found",
          });
        }
        return res.json(conversations);
      });
  }

  create(req, res) {
    const { author, partner, message } = req.body;

    Conversation.findOne(
      {
        author,
        partner,
      },
      (err, conversation) => {
        if (err) {
          return res.status(500).json({
            message: err,
          });
        }
        if (conversation) {
          return res.status(403).json({
            message: "Conversation already exists",
          });
        } else {
          const conversation = new Conversation({
            author,
            partner,
          });
          conversation.save().then((createdConversation) => {
            const messageText = new Message({
              text: message,
              createdBy: author,
              conversation: createdConversation._id,
            });
            messageText
              .save()
              .then(() => {
                createdConversation.lastMessage = messageText._id;
                createdConversation.save().then(() => {
                  res.json(createdConversation);

                  createdConversation.populate(
                    ["author", "partner", "lastMessage"],
                    (err, conversation) => {
                      this.io.emit("SERVER:CONVERSATION_CREATED", conversation);
                    }
                  );
                });
              })
              .catch((err) => {
                res.json(err);
              });
          });
        }
      }
    );
  }
}

module.exports = ConversationController;
