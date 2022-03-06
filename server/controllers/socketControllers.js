let onlineUsers = require("../index");

const test = (socket) => {
  socket.on("loggedIn", (email, userId) => {
    socket.email = email;
    socket.userId = userId;
    onlineUsers.push(userId);
    console.log(onlineUsers);
  });

  socket.on("disconnect", () => {
    console.log("user discconected");
    onlineUsers = onlineUsers.filter((id) => id !== socket.userId);
  });
};

module.exports = {
  test,
};
