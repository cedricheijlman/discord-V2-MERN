import Axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./server.css";

export const Server = () => {
  const [allUsers, setAllUsers] = React.useState([]);
  const [serverInfo, setServerInfo] = React.useState({});

  // Get Id Server
  let { id } = useParams();

  // When user on Server Page
  useEffect(() => {
    console.log(id);
    Axios.post("http://localhost:3001/openServer", {
      accessKey: localStorage.getItem("accessKey"),
      serverId: id,
    })
      .then((res) => {
        setAllUsers(res.data.serverInfo.members);
        setServerInfo(res.data.serverInfo);
      })
      .catch(() => {
        window.location.pathname = "/me/friends";
      });
  }, [id]);

  return (
    <div id="server">
      <div className="server__messagesContainer"></div>
      <div className="server__userList">
        {allUsers.map((user, index) => {
          return (
            <div key={index} className="server__userInfo">
              {user.userId.username}
            </div>
          );
        })}
      </div>
    </div>
  );
};
