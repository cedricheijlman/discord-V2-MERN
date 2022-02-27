const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");

require("dotenv").config();

const app = express();

const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

app.use("/", authRoutes);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000" },
});

io.on("connection", (socket) => {
  console.log(socket.id);

  socket.on("disconnect", () => {
    console.log("user discconected");
  });
});

mongoose.connect(process.env.DB).then(() => {
  server.listen(3001, () => {
    console.log(`running on port 3001`);
  });
});
