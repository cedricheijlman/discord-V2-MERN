import Axios from "axios";
import React, { useEffect, useState } from "react";
import { RequestCard } from "./requestcard/RequestCard";

export const FriendsRequestsSection = () => {
  const [allFriendRequests, setAllFriendRequests] = useState([]);

  useEffect(() => {
    console.log("hey");
    Axios.post("http://localhost:3001/allFriendRequests", {
      accessKey: localStorage.getItem("accessKey"),
    }).then((res) => {
      console.log(res);
      setAllFriendRequests(res.data.allRequests);
    });
  }, []);

  return (
    <>
      <input placeholder="Search" />
      <div className="allFriendsContainer">
        {allFriendRequests.length > 0 &&
          allFriendRequests.map((request, index) => {
            return (
              <RequestCard key={index} username={request.requestBy.username} />
            );
          })}
      </div>
    </>
  );
};
