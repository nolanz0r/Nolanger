const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
  {
    text: String,
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "conversations",
    },
    created_By: { type: Schema.Types.ObjectId, ref: "users", require: true },
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

module.exports = Message = model("messages", MessageSchema);
