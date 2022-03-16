import React, { useEffect, useState } from "react";
import Axios from "axios";

export const AddFriendSection = () => {
  const [addFriendInput, setAddFriendInput] = useState("");
  const [addFriendMessage, setAddFriendMessage] = useState(null);

  const handleChangeAddFriend = (e) => {
    let value = e.target.value;

    if (e.nativeEvent.data !== " ") {
      setAddFriendInput(value.replace(/\s/g, ""));
    }
  };

  const handleAddFriend = () => {
    Axios.post(`${process.env.REACT_APP_HOST}addFriend`, {
      accessKey: localStorage.getItem("accessKey"),
      friendUsername: addFriendInput,
    })
      .then(async (res) => {
        if (res.status === 200) {
          await setAddFriendMessage(res.data.message);
        }

        setTimeout(() => {
          setAddFriendMessage("");
        }, 1300);
      })
      .catch((err) => {
        window.location.pathname = "/me/friends";
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
          onKeyPress={(e) => {
            if (e.code == "Enter") {
              handleAddFriend();
            }
          }}
        />
        <div className="knopDiv">
          <button
            className={
              addFriendInput == "" || addFriendInput == null
                ? "disabledAddFriend"
                : ""
            }
            disabled={
              addFriendInput !== "" && addFriendInput !== null ? false : true
            }
            onClick={handleAddFriend}
          >
            Send Friend Request
          </button>
        </div>
      </div>
      {addFriendMessage !== null && addFriendMessage !== "" && (
        <p className="addFriendMessage">{addFriendMessage}</p>
      )}
    </>
  );
};
