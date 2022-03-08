import React from "react";
import "./server.css";

export const Server = () => {
  return (
    <div id="server">
      <div className="server__messagesContainer"></div>
      <div className="server__userList">
        <div className="server__userInfo">User 1</div>
        <div className="server__userInfo">User 2</div>
      </div>
    </div>
  );
};
