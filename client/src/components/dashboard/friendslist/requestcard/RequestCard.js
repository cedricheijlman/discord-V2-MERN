import React from "react";
import "./requestcard.css";
import Axios from "axios";

export const RequestCard = ({ request, setChange, change }) => {
  const handleAcceptRequest = () => {
    Axios.post(`${process.env.REACT_APP_HOST}addFriend`, {
      accessKey: localStorage.getItem("accessKey"),
      friendUsername: request.username,
    }).then((res) => {
      setChange(change + 1);
    });
  };

  const handleDeleteRequest = () => {
    Axios.delete(`${process.env.REACT_APP_HOST}deleteFriend`, {
      data: {
        accessKey: localStorage.getItem("accessKey"),
        friend: request._id,
      },
    }).then((result) => {
      window.location.reload();
    });
  };

  return (
    <div id="requestCard">
      <div className="requestCard__left">
        <h2>{request.username}</h2>
      </div>
      <div className="requestCard__right">
        <button onClick={handleAcceptRequest}>Accept</button>
        <button onClick={handleDeleteRequest}>Decline</button>
      </div>
    </div>
  );
};
