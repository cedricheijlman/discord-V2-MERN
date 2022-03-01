import React, { useEffect, useState } from "react";
import "./friendslist.css";
import Axios from "axios";
import { FriendCard } from "./friendcard/FriendCard";
import { AddFriendSection } from "./AddFriendSection";
import { FriendsRequestsSection } from "./FriendsRequestsSection";
import { AllFriendsSection } from "./AllFriendsSection";

export const FriendsList = () => {
  const [friendsOption, setFriendsOption] = useState("All");

  const [allFriendRequests, setAllFriendsRequests] = useState([]);

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
        {friendsOption == "All" && <AllFriendsSection />}

        {friendsOption == "Online" && (
          <>
            <input placeholder="Search" />
            {[].length > 0 &&
              []
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
