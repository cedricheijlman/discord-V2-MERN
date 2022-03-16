import Axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./friendcard.css";

export const FriendCard = ({ username, objectId }) => {
  let navigate = useNavigate();
  const handleFriendDelete = () => {
    Axios.delete(`${process.env.REACT_APP_HOST}deleteFriend`, {
      data: {
        accessKey: localStorage.getItem("accessKey"),
        friend: objectId,
      },
    })
      .then((result) => {
        window.location.reload();
      })
      .catch((err) => {
        window.location.pathname = "/login";
      });
  };

  const handleMessagePage = () => {
    navigate(`/me/${objectId}`);
  };

  return (
    <div id="friendCard">
      <div className="friendCard__left">
        <h2>{username}</h2>
      </div>
      <div className="friendCard__right">
        <button
          onClick={() => {
            handleMessagePage();
          }}
        >
          Message
        </button>
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
