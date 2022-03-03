const mongoose = require("mongoose");

const privateMessageSchema = new mongoose.Schema(
  {
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users" }],
    messages: [
      {
        sentBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        message: { type: String },
        timeSent: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PrivateMessages", privateMessageSchema);
