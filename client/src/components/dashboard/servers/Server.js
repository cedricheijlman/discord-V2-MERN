import Axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./server.css";

export const Server = () => {
  // Get Id Server
  let { id } = useParams();
  console.log(id);
  // When user on Server Page
  useEffect(() => {
    console.log(id);
    Axios.post("http://localhost:3001/openServer", {
      accessKey: localStorage.getItem("accessKey"),
      serverId: id,
    })
      .then((res) => {
        console.log(res);
      })
      .catch(() => {
        window.location.pathname = "/me/friends";
      });
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
