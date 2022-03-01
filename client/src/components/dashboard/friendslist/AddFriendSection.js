import React, { useEffect, useState } from "react";
import Axios from "axios";

export const AddFriendSection = () => {
  const [addFriendInput, setAddFriendInput] = useState("");

  const handleChangeAddFriend = (e) => {
    let value = e.target.value;

    if (e.nativeEvent.data !== " ") {
      setAddFriendInput(value.replace(/\s/g, ""));
    }
  };

  const handleAddFriend = () => {
    console.log(addFriendInput);
    Axios.post("http://localhost:3001/addFriend", {
      accessKey: localStorage.getItem("accessKey"),
      friendUsername: addFriendInput,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <h3 style={{ marginTop: 10 }}>Add A Friend</h3>
      <p>You can add a friend with their username.</p>
      <div className="addFriendInput">
        <input
          value={addFriendInput}
          className="addFriendSearch"
          placeholder="Enter a username"
          onChange={(e) => {
            handleChangeAddFriend(e);
          }}
        />
        <div className="knopDiv">
          <button onClick={handleAddFriend}>Send Friend Request</button>
        </div>
      </div>
    </>
  );
};
