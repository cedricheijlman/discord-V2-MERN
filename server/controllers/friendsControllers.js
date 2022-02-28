const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");
const User = require("../models/users");
const Friend = require("../models/friends");

const addFriend = async (req, res) => {
  try {
    const { user, friend } = req.body;

    const objectIdUser = mongoose.Types.ObjectId(user);
    const objectIdFriend = mongoose.Types.ObjectId(friend);

    const userRequestExists = await Friend.find({
      requestBy: objectIdUser,
      requestTo: objectIdFriend,
    });

    const friendRequestExists = await Friend.find({
      requestBy: objectIdFriend,
      requestTo: objectIdUser,
    });

    if (userRequestExists || friendRequestExists) {
      let userStatus = 0;
      let friendStatus = 0;

      if (userRequestExists.length > 0) {
        userStatus = userRequestExists[0].status;
      }

      if (friendRequestExists.length > 0) {
        friendStatus = friendRequestExists[0].status;
      }

      if (userStatus == 2 || friendStatus == 2) {
        return res.status(200).json({ message: "You already are Friends" });
      }

      if (userStatus == 1) {
        return res
          .status(200)
          .json({ message: "You already sent a friend request" });
      }

      if (friendStatus == 1) {
        const test = await Friend.updateOne(
          { requestBy: objectIdFriend, requestTo: user },
          { $set: { status: 2 } }
        );
        return res.json({ message: test });
      }
    }

    const newRequest = await Friend.create({
      requestBy: mongoose.Types.ObjectId(user),
      requestTo: mongoose.Types.ObjectId(friend),
      status: 1,
    });

    return res.status(200).json({ message: newRequest });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error" });
  }
};
module.exports = {
  addFriend,
};
