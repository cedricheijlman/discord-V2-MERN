import React from "react";
import "./message.css";

export const Message = ({ messageValue, username }) => {
  return (
    <div id="messageOne">
      <div className="imageContainer">
        <img src="../discordlogo.png" />
      </div>
      <div className="messageOne__message">
        <h3>{username}</h3>
        <p>{messageValue}</p>
      </div>
    </div>
  );
};
