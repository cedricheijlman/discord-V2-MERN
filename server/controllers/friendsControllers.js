const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");
const User = require("../models/users");
const Friend = require("../models/friends");
const PrivateMessage = require("../models/privatemessage");
const jwt = require("jsonwebtoken");
const { find } = require("../models/privatemessage");

const allFriends = async (req, res) => {
  try {
    const { accessKey } = req.body;
    const decodedJwt = jwt.decode(accessKey);

    User.findOne({ _id: mongoose.Types.ObjectId(decodedJwt.id) })
      .select("-password")
      .populate("friends", "-password")
      .exec((err, friends) => {
        return res.status(200).json({ allFriends: friends.friends });
      });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "error" });
  }
};

// private Message Create
const privateMessage = async (req, res) => {
  try {
    const { accessKey, friend } = req.body;
    const decodedJwt = jwt.decode(accessKey);
    console.log(decodedJwt.id, "fwkofow");
    const userId = decodedJwt.id;

    if (String(friend).length > 24) {
      return res.status(200).json({ message: "too long" });
    }

    const checkIfUserExists = await User.findOne({
      _id: mongoose.Types.ObjectId(friend),
    });

    if (!checkIfUserExists) {
      return res.status(200).json({ message: "wrong" });
    }

    const check = await PrivateMessage.findOne({
      members: { $all: [userId, friend] },
    }).populate({
      path: "messages.sentBy",
      select: "username",
    });

    if (check) {
      console.log(check);
      return res.status(200).json({
        privateMessageId: check._id,
        friendId: checkIfUserExists._id,
        username: checkIfUserExists.username,
        messages: check.messages,
      });
    } else {
      const created = await PrivateMessage.create({
        members: [userId, friend],
      });
    }

    return res.status(200).json({ message: "worked" });
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: "dkowfkwo" });
  }
};

const allFriendRequests = async (req, res) => {
  try {
    const { accessKey } = req.body;
    const decodedJwt = jwt.decode(accessKey);

    Friend.find({
      requestTo: mongoose.Types.ObjectId(decodedJwt.id),
      status: 1,
    })
      .select("-status -requestTo -_id")
      .populate("requestBy", "-password -friends -email")
      .exec((err, friends) => {
        return res.status(200).json({ allRequests: friends });
      });
  } catch (error) {
    return res.status(400).json({ message: "error" });
  }
};

const deleteFriend = async (req, res) => {
  try {
    const { accessKey, friend } = req.body;

    const decodedJwt = jwt.decode(accessKey);
    const user = String(decodedJwt.id);

    //const userId = mongoose.Types.ObjectId(user);
    //const friendid = mongoose.Types.ObjectId(friend);

    const findFriend = await Friend.findOne({
      $or: [
        { requestBy: user, requestTo: friend },
        { requestBy: friend, requestTo: user },
      ],
    });

    if (!findFriend) {
      return res.status(404).json({ message: "no friendship" });
    }

    const userObjectId = mongoose.Types.ObjectId(user);
    const friendObjectId = mongoose.Types.ObjectId(friend);

    const removeFromArray = await User.findOneAndUpdate(
      { _id: userObjectId },
      { $pull: { friends: friendObjectId } }
    );

    const removeFromArray2 = await User.findOneAndUpdate(
      { _id: friendObjectId },
      { $pull: { friends: userObjectId } }
    );

    // deletes friendship document
    await Friend.deleteOne({
      $or: [
        { requestBy: user, requestTo: friend },
        { requestBy: friend, requestTo: user },
      ],
    });

    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
};

const addFriend = async (req, res) => {
  try {
    const { accessKey, friendUsername } = req.body;

    const decodedJwt = jwt.decode(accessKey);

    const findUsername = await User.findOne({
      username: friendUsername,
    }).select("-password");

    if (!findUsername) {
      return res.status(200).json({ message: "Name doesn't exist!" });
    }

    // create object ids
    const objectIdUser = mongoose.Types.ObjectId(decodedJwt.id);
    const objectIdFriend = mongoose.Types.ObjectId(findUsername._id);

    if (decodedJwt.id == findUsername._id) {
      return res.status(200).json({ message: "You can't add yourself!" });
    }

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
        return res.status(200).json({ message: "You already are Friends!" });
      }

      // Check if status == 1 (pending request)
      if (userStatus == 1) {
        return res
          .status(200)
          .json({ message: "You already sent a friend request!" });
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

        return res.status(200).json({ message: "You are now friends" });
      }
    }

    // if no pending friend request and not already friends - Create NEW pending friend request
    const newRequest = await Friend.create({
      requestBy: objectIdUser,
      requestTo: objectIdFriend,
      status: 1,
    });

    return res.status(200).json({ message: "Friend Request Sent" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "error" });
  }
};
module.exports = {
  addFriend,
  deleteFriend,
  allFriends,
  allFriendRequests,
  privateMessage,
};
