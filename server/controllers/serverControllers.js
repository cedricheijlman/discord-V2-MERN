const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Server = require("../models/servers");

const openServer = async (req, res) => {
  try {
    res.status(200).json({ message: "Open Server" });
  } catch (error) {
    res.status(400).json({ message: "Error" });
  }
};

const createServer = async (req, res) => {
  try {
    const { accessKey, serverName, private, password } = req.body;
    const decodedJwt = jwt.decode(accessKey);

    const serverExists = await Server.findOne({ serverName });

    if (serverExists) {
      return res.status(200).json({ message: "Server Name Already Used" });
    }

    const newServer = await Server.create({
      serverName: serverName,
      private: private,
      owner: decodedJwt.id,
      password: password,
      members: [{ userId: decodedJwt.id, role: "Admin" }],
    });

    return res.status(200).json({ message: "Created Server", newServer });
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};

module.exports = {
  createServer,
  openServer,
};
