const mongoose = require("mongoose");
const User = require("../models/users");
const Friend = require("../models/friends");

const addFriend = async (req, res) => {
  res.status(200).json({ message: "add Friend" });
};
module.exports = {
  addFriend,
};
