const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
  {
    text: String,
    conversation: {
      type: Schema.Types.ObjectId,
      ref: "conversations",
    },
    createdBy: { type: Schema.Types.ObjectId, ref: "users", require: true },
  },
  {
    timestamps: true,
    usePushEach: true,
  }
);

module.exports = Message = model("messages", MessageSchema);
