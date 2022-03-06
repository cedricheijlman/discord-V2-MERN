const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");
const friendsRoutes = require("./routes/friendsRoutes");

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

app.use("/", authRoutes);
app.use("/", friendsRoutes);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("loggedIn", (email, userId) => {
    socket.email = email;
    socket.userId = userId;
    onlineUsers.push(userId);
    console.log(onlineUsers);
  });

  socket.on("join_privateMessage", (privateMessageId) => {
    socket.join(privateMessageId);
    console.log(privateMessageId);
  });

  socket.on("send_message", (messageInput) => {
    console.log(messageInput);
  });

  socket.on("disconnect", () => {
    console.log("user discconected");
    onlineUsers = onlineUsers.filter((id) => id !== socket.userId);
  });
});

mongoose.connect(process.env.DB).then(() => {
  server.listen(3001, () => {
    console.log(`running on port 3001`);
  });
});
