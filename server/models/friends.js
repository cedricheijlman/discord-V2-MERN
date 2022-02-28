const mongoose = require("mongoose");

const friendsSchema = new mongoose.Schema(
  {
    requestBy: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    requestTo: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },

    status: {
      type: Number,
      enums: [
        0, //'add friend',
        2, //'pending',
        3, //'friends',
      ],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Friends", friendsSchema);
