const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Server = require("../models/servers");

const getUserJoinedServers = async (req, res) => {
  try {
    // accessKey Decode
    const { accessKey } = req.body;
    const decodedJwt = jwt.decode(accessKey);

    // find user all servers
    const allServers = await Server.find({
      "members.userId": decodedJwt.id,
    });

    // send all servers Info's back
    res.status(200).json({ message: "all servers", allServers });
  } catch (error) {
    console.log(error);
    res.status(200).json({ message: "error" });
  }
};

// join server
const joinServer = async (req, res) => {
  try {
    // Decode JWT Token
    const { accessKey, serverId } = req.body;
    const decodedJwt = jwt.decode(accessKey);

    // check if user is in server or server doens't exist
    const serverInfo = await Server.findOne({
      _id: serverId,
      "members.userId": decodedJwt.id,
    });

    if (serverInfo) {
      return res.status(200).json({ message: "Server already joined" });
    }

    const serverExists = await Server.findOne({
      _id: serverId,
    });

    if (!serverExists) {
      return res.status(200).json({ message: "Server doesn't exist" });
    }

    const pushUserToServer = await Server.findOneAndUpdate(
      { _id: serverId },
      { $push: { members: { userId: decodedJwt.id, role: "User" } } }
    );

    return res.status(200).json({ message: "Joined Server" });
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};

const openServer = async (req, res) => {
  try {
    // Decode JWT Token
    const { accessKey, serverId } = req.body;
    const decodedJwt = jwt.decode(accessKey);

    // check if user is in server
    const serverInfo = await Server.findOne({
      _id: serverId,
      "members.userId": decodedJwt.id,
    })
      .populate({
        path: "messages.sentBy",
        select: "username",
      })
      .populate({
        path: "members.userId",
        select: "username",
      });

    // send server info back
    res.status(200).json({ message: "Open Server", serverInfo });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Error" });
  }
};

const createServer = async (req, res) => {
  try {
    // Decode JWT Token
    const { accessKey, serverName, private, password } = req.body;
    const decodedJwt = jwt.decode(accessKey);

    // set serverName to lowercase
    serverName = await serverName.toLowerCase();

    // Check if serverName Already Exists
    const serverExists = await Server.findOne({ serverName });

    // If Server name already exists
    if (serverExists) {
      return res.status(200).json({ message: "Server Name Already Used" });
    }

    // Create New Server
    const newServer = await Server.create({
      serverName: serverName,
      private: private,
      owner: decodedJwt.id,
      password: password,
      members: [{ userId: decodedJwt.id, role: "Admin" }],
    });

    // Return Server Info Created Message
    return res.status(200).json({ message: "Created Server", newServer });
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};

module.exports = {
  createServer,
  openServer,
  getUserJoinedServers,
  joinServer,
};
