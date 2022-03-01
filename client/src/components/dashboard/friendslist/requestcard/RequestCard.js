import React from "react";
import "./requestcard.css";

export const RequestCard = ({ username }) => {
  return (
    <div id="requestCard">
      <div className="requestCard__left">
        <img src="./logo192.png" />
        <h2>{username}</h2>
      </div>
      <div className="requestCard__right">
        <button>Accept</button>
        <button>Decline</button>
      </div>
    </div>
  );
};
