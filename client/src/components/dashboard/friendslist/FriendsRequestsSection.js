import Axios from "axios";
import React, { useEffect, useState } from "react";
import { RequestCard } from "./requestcard/RequestCard";

export const FriendsRequestsSection = () => {
  const [allFriendRequests, setAllFriendRequests] = useState([]);
  const [change, setChange] = useState(0);

  useEffect(() => {
    Axios.post("http://localhost:3001/allFriendRequests", {
      accessKey: localStorage.getItem("accessKey"),
    }).then((res) => {
      setAllFriendRequests(res.data.allRequests);
    });
  }, [change]);

  return (
    <>
      <input placeholder="Search" />
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
      </div>
    </>
  );
};
