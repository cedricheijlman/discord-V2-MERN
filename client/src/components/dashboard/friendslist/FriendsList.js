import React, { useEffect, useState } from "react";
import "./friendslist.css";
import Axios from "axios";
import { FriendCard } from "./friendcard/FriendCard";
import { AddFriendSection } from "./AddFriendSection";
import { FriendsRequestsSection } from "./FriendsRequestsSection";

export const FriendsList = () => {
  const [friendsOption, setFriendsOption] = useState("All");
  const [allFriends, setAllFriends] = useState([]);
  const [allFriendRequests, setAllFriendsRequests] = useState([]);

  // Fetch Friends
  useEffect(() => {
    Axios.post("http://localhost:3001/allFriends", {
      accessKey: localStorage.getItem("accessKey"),
    })
      .then((result) => {
        setAllFriends(result.data.allFriends);
        console.log(result);
      })
      .catch((err) => {
        localStorage.removeItem("accessToken");
        window.location.pathname("/login");
      });
  }, []);

  return (
    <div id="friendsList">
      <h1>Friends</h1>
      <div className="friendsList__options">
        <p
          onClick={() => setFriendsOption("All")}
          className={friendsOption === "All" ? "selectedFriends" : ""}
        >
          All
        </p>
        <p
          onClick={() => setFriendsOption("Online")}
          className={friendsOption === "Online" ? "selectedFriends" : ""}
        >
          Online
        </p>
        <p
          onClick={() => setFriendsOption("allFriendRequests")}
          className={
            friendsOption === "allFriendRequests" ? "selectedFriends" : ""
          }
        >
          Friend Requests
        </p>
        <p
          style={{ backgroundColor: "#27ae60" }}
          onClick={() => setFriendsOption("AddFriend")}
          className={friendsOption == "AddFriend" ? "selectedFriends" : ""}
        >
          Add Friend
        </p>
      </div>

      <div className="friends__containerBottom">
        {friendsOption == "All" && (
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
        )}

        {friendsOption == "Online" && (
          <>
            <input placeholder="Search" />
            {allFriends.length > 0 &&
              allFriends
                .filter((f) => f == false)
                .map((friend, index) => {
                  return <h1 key={index}>{friend.username}</h1>;
                })}
          </>
        )}

        {friendsOption == "allFriendRequests" && <FriendsRequestsSection />}

        {friendsOption == "AddFriend" && <AddFriendSection />}
      </div>
    </div>
  );
};
