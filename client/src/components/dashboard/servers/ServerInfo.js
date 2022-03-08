import React from "react";
import "./serverinfo.css";

const ServerInfo = () => {
  return (
    <div id="serverInfo">
      <div className="serverInfo__serverName">
        <h2>Server Name</h2>
      </div>
      <div className="serverInfo__textChannelsContainer">
        <p>Text Channels</p>
        <div className="serverInfo__textChannels">
          <div className="serverInfo__textChannel">General Chat</div>
          <div className="serverInfo__textChannel">Admin Chat</div>
        </div>
      </div>
    </div>
  );
};

export default ServerInfo;
