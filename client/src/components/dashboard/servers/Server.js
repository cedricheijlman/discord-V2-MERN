import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./server.css";

export const Server = () => {
  // Get Id Server
  let { id } = useParams();

  // When user on Server Page
  useEffect(() => {
    console.log(id);
  }, [id]);

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
