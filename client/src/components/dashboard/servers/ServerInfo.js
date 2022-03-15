import React, { useEffect, useState } from "react";
import "./serverinfo.css";

const ServerInfo = ({ serverInfo, setServerInfo }) => {
  const [textChannel, setTextChannel] = useState("General");
  return (
    <div id="serverInfo">
      <div className="serverInfo__serverName">
        <h2>{serverInfo.serverName ? serverInfo.serverName : "Server"}</h2>
      </div>
      <div className="serverInfo__textChannelsContainer">
        <p>Text Channels</p>
        <div className="serverInfo__textChannels">
          <div
            onClick={() => setTextChannel("General")}
            className={`serverInfo__textChannel ${
              textChannel == "General" ? "check" : ""
            }`}
          >
            General Chat
          </div>
        </div>
      </div>
      <div style={{ margin: "10px 10px", wordBreak: "break-all" }}>
        <h3 style={{ color: "grey" }}>Server id:</h3>
        <h4 style={{ color: "grey" }}>{serverInfo._id}</h4>
      </div>
    </div>
  );
};

export default ServerInfo;
