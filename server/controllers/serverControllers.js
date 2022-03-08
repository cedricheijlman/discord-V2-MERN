const mongoose = require("mongoose");

const createServer = async (req, res) => {
  res.status(200).json({ message: "Created Server" });
};

module.exports = {
  createServer,
};
