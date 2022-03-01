const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");
const User = require("../models/users");
const Friend = require("../models/friends");

const allFriends = async (req, res) => {
  try {
    User.findOne({ _id: mongoose.Types.ObjectId("621d1a7a53051771bfa07d7c") })
      .select("-password")
      .populate("friends", "-password")
      .exec((err, friends) => {
        if (err) {
          console.log(err);
        }
        return res.status(200).json({ allFriends: friends.friends });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "error" });
  }
};

const addFriend = async (req, res) => {
  try {
    const { user, friend } = req.body;

    // create object ids
    const objectIdUser = mongoose.Types.ObjectId(user);
    const objectIdFriend = mongoose.Types.ObjectId(friend);

    // check if user already sent a friend request
    const userRequestExists = await Friend.find({
      requestBy: objectIdUser,
      requestTo: objectIdFriend,
    });

    // check if other user (friend) already sent a friend rewquest
    const friendRequestExists = await Friend.find({
      requestBy: objectIdFriend,
      requestTo: objectIdUser,
    });

    // if someone already sent a friend request
    if (userRequestExists || friendRequestExists) {
      let userStatus = 0;
      let friendStatus = 0;

      if (userRequestExists.length > 0) {
        userStatus = userRequestExists[0].status;
      }

      if (friendRequestExists.length > 0) {
        friendStatus = friendRequestExists[0].status;
      }

      //  Check if status == 2 (friends)
      if (userStatus == 2 || friendStatus == 2) {
        return res.status(200).json({ message: "You already are Friends" });
      }

      // Check if status == 1 (pending request)
      if (userStatus == 1) {
        return res
          .status(200)
          .json({ message: "You already sent a friend request" });
      }

      // check if other user already sent friends request then* update request document to status: 2 (friends)
      if (friendStatus == 1) {
        const test = await Friend.updateOne(
          { requestBy: objectIdFriend, requestTo: objectIdUser },
          { $set: { status: 2 } }
        );

        const pushUser = await User.findOneAndUpdate(
          { _id: objectIdUser },
          { $push: { friends: objectIdFriend } }
        );

        const pushFriend = await User.findOneAndUpdate(
          { _id: objectIdFriend },
          { $push: { friends: objectIdUser } }
        );

        return res.json({ message: test });
      }
    }

    // if no pending friend request and not already friends - Create NEW pending friend request
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
  allFriends,
};
