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

let users = [];

io.on("connection", (socket) => {
  socket.on("send-email", function (email) {
    socket.email = email;
    users.push(socket.email);
    console.log(users, "test");
    socket.emit("recievedNewUser");
  });

  socket.on("disconnect", () => {
    console.log("user discconected");
    users = users.filter((item) => item !== "test");
    console.log(users);
  });
});

mongoose.connect(process.env.DB).then(() => {
  server.listen(3001, () => {
    console.log(`running on port 3001`);
  });
});
