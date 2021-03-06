import Axios from "axios";
import React, { useEffect } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import ScrollToBottom from "react-scroll-to-bottom";
import { Message } from "../privatemessage/Message";
import "./server.css";

export const Server = () => {
  const [allUsers, setAllUsers] = React.useState([]);
  const [serverMessages, setServerMessages] = React.useState([]);
  const [inputMessage, setInputMessage] = React.useState("");
  let navigate = useNavigate();
  const { setServerInfo, setSelectedGroup } = useOutletContext();

  // Get Id Server
  let { id } = useParams();

  const { socket, username } = useOutletContext();

  // When user on Server Page
  useEffect(() => {
    Axios.post(`${process.env.REACT_APP_HOST}openServer`, {
      accessKey: localStorage.getItem("accessKey"),
      serverId: id,
    })
      .then((res) => {
        setAllUsers(res.data.serverInfo.members);
        setServerInfo(res.data.serverInfo);
        setServerMessages(res.data.serverInfo.messages);
        setSelectedGroup(id);
        socket.emit("join_serverLive", id);
      })
      .catch(() => {
        window.location.pathname = "/me/friends";
      });

    return () => {
      setServerInfo("");
      setAllUsers([]);
    };
  }, [id]);

  const handleSendMessage = async () => {
    if (
      inputMessage !== "" &&
      inputMessage !== null &&
      inputMessage.replace(/\s/g, "").length
    ) {
      await socket.emit("send_messageServer", id, {
        message: inputMessage,
        sentBy: { username },
      });
      serverMessages.push({
        message: inputMessage,
        sentBy: { username: username },
      });
      setInputMessage("");
    }
  };

  useEffect(async () => {
    await socket.on("message_recievedServer", (messageInput) => {
      setServerMessages((messages) => [...messages, messageInput]);
    });
  }, [socket]);

  return (
    <div id="server">
      <div className="server__messagesContainer">
        <div className="server__messageHeader">General Chat</div>

        <ScrollToBottom className="server__messageList">
          {serverMessages.map((message, index) => {
            return (
              <Message
                key={index}
                username={message.sentBy.username}
                messageValue={message.message}
              />
            );
          })}
        </ScrollToBottom>
        <div className="server__messageInput">
          <input
            onKeyPress={(e) => {
              if (e.code == "Enter") {
                handleSendMessage();
              }
            }}
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
            }}
            placeholder="Send Message"
          />
        </div>
      </div>
      <div className="server__userList">
        {allUsers.map((user, index) => {
          return (
            <div
              onClick={() => {
                if (user.userId.username !== username) {
                  navigate(`/me/${user.userId._id}`);
                }
              }}
              key={index}
              className="server__userInfo"
            >
              {user.userId.username}
            </div>
          );
        })}
      </div>
    </div>
  );
};
