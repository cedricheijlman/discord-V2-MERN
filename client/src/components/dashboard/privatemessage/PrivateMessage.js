import React, { useEffect } from "react";
import "./privatemessage.css";

export const PrivateMessage = () => {
  useEffect(() => {}, []);
  return (
    <div id="privateMessage">
      <div id="privateMessage__header">
        <div className="privateMessage__headerLeft">Username</div>
        <div className="privateMessage__headerRight">
          <input placeholder="Search Message" />
        </div>
      </div>
      <div className="privateMessage__box">Messages</div>
      <div className="privateMessage__sendMessage">
        <input placeholder="Send Message" />
      </div>
    </div>
  );
};
