const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");
const friendsRoutes = require("./routes/friendsRoutes");
const serverRoutes = require("./routes/serverRoutes");

const PrivateMessage = require("./models/privatemessage");

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

app.use("/", authRoutes);
app.use("/", friendsRoutes);
app.use("/", serverRoutes);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

let onlineUsers = [];

io.on("connection", (socket) => {
  socket.on("loggedIn", (username, userId) => {
    socket.username = username;
    socket.userId = userId;
    onlineUsers.push(userId);
  });

  socket.on("join_serverLive", (serverId) => {
    socket.join(serverId);
  });

  socket.on("join_privateMessage", (privateMessageId) => {
    socket.join(privateMessageId);
  });

  socket.on("send_message", async (privateMessageId, messageInput) => {
    if (messageInput.message !== "" && socket.userId) {
      const test = await PrivateMessage.findOneAndUpdate(
        { _id: privateMessageId },
        {
          $push: {
            messages: {
              message: messageInput.message,
              sentBy: socket.userId,
            },
          },
        }
      );

      socket.to(privateMessageId).emit("message_recieved", messageInput);
    }
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
