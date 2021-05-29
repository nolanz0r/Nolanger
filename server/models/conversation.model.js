const { Schema, model } = require("mongoose");

const ConversationsSchema = new Schema(
  {
    partner: { type: Schema.Types.ObjectId, ref: "users" },
    author: { type: Schema.Types.ObjectId, ref: "users" },
    lastMessage: { type: Schema.Types.ObjectId, ref: "messages" },
  },
  {
    timestamps: true,
  }
);

const DialogModel = model("conversations", ConversationsSchema);

module.exports = DialogModel;
