import React, { useEffect } from "react";
import { FriendCard } from "./friendcard/FriendCard";

export const FriendsRequestsSection = () => {
  useEffect(() => {
    console.log("hey");
  }, []);

  return (
    <>
      <input placeholder="Search" />
      <div className="allFriendsContainer"></div>
    </>
  );
};
