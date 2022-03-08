const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Server = require("../models/servers");

const createServer = async (req, res) => {
  try {
    const { accessKey, serverName } = req.body;
    const decodedJwt = jwt.decode(accessKey);

    const serverExists = await Server.findOne({ serverName });

    if (serverExists) {
      return res.status(200).json({ message: "Server Name Already Used" });
    }

    const newServer = await Server.create({
      serverName: serverName,
      private: false,
      owner: decodedJwt.id,
      members: [{ userId: decodedJwt.id, role: "Admin" }],
    });

    return res.status(200).json({ message: "Created Server" });
  } catch (error) {
    return res.status(400).json({ message: "Error" });
  }
};

module.exports = {
  createServer,
};
