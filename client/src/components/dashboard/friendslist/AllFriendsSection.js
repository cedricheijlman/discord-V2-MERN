import Axios from "axios";
import React, { useEffect, useState } from "react";
import { FriendCard } from "./friendcard/FriendCard";

export const AllFriendsSection = () => {
  const [allFriends, setAllFriends] = useState([]);
  useEffect(() => {
    Axios.post("http://localhost:3001/allFriends", {
      accessKey: localStorage.getItem("accessKey"),
    })
      .then((result) => {
        setAllFriends(result.data.allFriends);
      })
      .catch((err) => {
        localStorage.removeItem("accessToken");
        window.location.pathname("/login");
      });
  }, []);
  return (
    <>
      <input placeholder="Search" />
      <div className="allFriendsContainer">
        {allFriends.length > 0 &&
          allFriends.map((friend, index) => {
            return (
              <FriendCard
                key={index}
                objectId={friend._id}
                username={friend.username}
              />
            );
          })}
      </div>
    </>
  );
};
