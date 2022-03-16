import Axios from "axios";
import React, { useEffect, useState } from "react";
import { RequestCard } from "./requestcard/RequestCard";

export const FriendsRequestsSection = () => {
  const [allFriendRequests, setAllFriendRequests] = useState([]);
  const [change, setChange] = useState(0);

  useEffect(() => {
    Axios.post(`${process.env.REACT_APP_HOST}allFriendRequests`, {
      accessKey: localStorage.getItem("accessKey"),
    })
      .then((res) => {
        setAllFriendRequests(res.data.allRequests);
      })
      .catch((err) => {
        window.location.pathname = "/login";
      });
  }, [change]);

  return (
    <>
      <div className="allFriendsContainer">
        {allFriendRequests.length > 0 &&
          allFriendRequests.map((request, index) => {
            return (
              <RequestCard
                setChange={setChange}
                change={change}
                key={index}
                request={request.requestBy}
              />
            );
          })}
        {allFriendRequests.length == 0 && <p>No friend requests</p>}
      </div>
    </>
  );
};
