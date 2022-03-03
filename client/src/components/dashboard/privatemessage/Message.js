import React from "react";
import "./message.css";

export const Message = ({ messageValue }) => {
  return (
    <div id="messageOne">
      <div className="imageContainer">
        <img src="../discordlogo.png" />
      </div>
      <div className="messageOne__message">
        <h3>Username</h3>
        <p>{messageValue}</p>
      </div>
    </div>
  );
};
