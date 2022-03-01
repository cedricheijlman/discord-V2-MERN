import React from "react";
import "./friendcard.css";

export const FriendCard = ({ username }) => {
  return (
    <div id="friendCard">
      <div className="friendCard__left">
        <img src="./logo192.png" />
        <h2>{username}</h2>
      </div>
      <div className="friendCard__right">
        <button>Message</button>
        <button>Remove friend</button>
      </div>
    </div>
  );
};
