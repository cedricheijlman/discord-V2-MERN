const mongoose = require("mongoose");

const serversSchema = new mongoose.Schema(
  {
    serverName: { type: String },
    private: { type: Boolean },
    password: { type: String },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    members: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        role: { type: String },
      },
    ],
    messages: [
      {
        sentBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
        message: { type: String },
        channel: { type: String },
        timeSent: { type: Date },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Servers", serversSchema);
