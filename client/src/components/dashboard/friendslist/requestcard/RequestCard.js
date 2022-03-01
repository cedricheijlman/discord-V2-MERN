import React from "react";
import "./requestcard.css";
import Axios from "axios";

export const RequestCard = ({ request, setChange, change }) => {
  const handleAcceptRequest = () => {
    console.log(request._id);
    Axios.post("http://localhost:3001/addFriend", {
      accessKey: localStorage.getItem("accessKey"),
      friendUsername: request.username,
    }).then((res) => {
      console.log(res);
      setChange(change + 1);
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
        <button>Decline</button>
      </div>
    </div>
  );
};
