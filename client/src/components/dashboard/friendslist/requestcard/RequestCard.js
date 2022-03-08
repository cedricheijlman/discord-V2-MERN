import React from "react";
import "./requestcard.css";
import Axios from "axios";

export const RequestCard = ({ request, setChange, change }) => {
  const handleAcceptRequest = () => {
    Axios.post("http://localhost:3001/addFriend", {
      accessKey: localStorage.getItem("accessKey"),
      friendUsername: request.username,
    }).then((res) => {
      setChange(change + 1);
    });
  };

  const handleDeleteRequest = () => {
    Axios.delete("http://localhost:3001/deleteFriend", {
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
        <img src="./logo192.png" />
        <h2>{request.username}</h2>
      </div>
      <div className="requestCard__right">
        <button onClick={handleAcceptRequest}>Accept</button>
        <button onClick={handleDeleteRequest}>Decline</button>
      </div>
    </div>
  );
};
