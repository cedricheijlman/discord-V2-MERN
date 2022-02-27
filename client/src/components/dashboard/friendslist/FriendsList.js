import React, { useEffect, useState } from "react";
import "./friendslist.css";

export const FriendsList = () => {
  const [friendsOption, setFriendsOption] = useState("All");

  const friends = [
    { name: "cchd", online: "false" },
    { name: "cchd", online: "true" },
  ];

  return (
    <div id="friendsList">
      <h1>Friends</h1>
      <div className="friendsList__options">
        <p
          onClick={() => setFriendsOption("All")}
          className={friendsOption == "All" ? "selectedFriends" : ""}
        >
          All
        </p>
        <p
          onClick={() => setFriendsOption("Online")}
          className={friendsOption == "Online" ? "selectedFriends" : ""}
        >
          Online
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
          </>
        )}

        {friendsOption == "Online" && (
          <>
            <input placeholder="Search" />
          </>
        )}

        {friendsOption == "AddFriend" && (
          <>
            <h3 style={{ marginTop: 10 }}>Add A Friend</h3>
            <p>You can add a friend with their username.</p>
            <input className="addFriendSearch" placeholder="Enter a username" />
          </>
        )}
      </div>
    </div>
  );
};
