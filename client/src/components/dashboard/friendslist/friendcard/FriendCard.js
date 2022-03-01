import Axios from "axios";
import React from "react";
import "./friendcard.css";

export const FriendCard = ({ username, objectId }) => {
  const handleFriendDelete = () => {
    Axios.delete(
      "http://localhost:3001/deleteFriend",
      {},
      {
        data: {
          accessToken: localStorage.getItem("accessKey"),
          friend: objectId,
        },
      }
    ).then((result) => {
      console.log(result);
    });
  };

  return (
    <div id="friendCard">
      <div className="friendCard__left">
        <img src="./logo192.png" />
        <h2>{username}</h2>
      </div>
      <div className="friendCard__right">
        <button>Message</button>
        <button
          onClick={() => {
            handleFriendDelete();
          }}
        >
          Remove friend
        </button>
      </div>
    </div>
  );
};
