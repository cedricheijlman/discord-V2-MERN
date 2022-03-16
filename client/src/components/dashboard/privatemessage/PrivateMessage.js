import React, { useEffect } from "react";
import { Message } from "./Message";
import "./privatemessage.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export const PrivateMessage = () => {
  // Get Socket Instance from dashboard
  const { socket, username } = useOutletContext();

  // Message Input, Messages, Friend Info Account
  const [messageInput, setMessageInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [friendInfo, setFriendInfo] = React.useState({});

  // Handle When Message Is sent
  const handleSendMessage = async () => {
    if (
      messageInput !== "" &&
      messageInput !== null &&
      messageInput.replace(/\s/g, "").length
    ) {
      await socket.emit("send_message", friendInfo.privateMessageId, {
        message: messageInput,
        sentBy: { username: username },
      });
      setMessages((list) => [
        ...list,
        { message: messageInput, sentBy: { username: username } },
      ]);
      setMessageInput("");
    }
  };

  useEffect(async () => {
    await socket.on("message_recieved", (messageInput) => {
      setMessages((list) => [...list, messageInput]);
    });
  }, [socket]);

  // get id from url
  let { id } = useParams();

  // Post Request Private Message
  useEffect(() => {
    Axios.post(`${process.env.REACT_APP_HOST}privateMessage`, {
      accessKey: localStorage.getItem("accessKey"),
      friend: id,
    })
      .then((res) => {
        if (
          res.data.message == "Error" ||
          res.data.message == "Wrong" ||
          res.data.message == "Too long" ||
          res.data.message == "Your id"
        ) {
          window.location.pathname = "/me/friends";
        }

        setFriendInfo(res.data);
        setMessages(res.data.messages);
        socket.emit("join_privateMessage", res.data.privateMessageId);
      })
      .catch(() => {
        window.location.pathname = "/me/friends";
      });
  }, []);

  return (
    <div id="privateMessage">
      <div id="privateMessage__header">
        <div className="privateMessage__headerLeft">{friendInfo.username}</div>
        <div className="privateMessage__headerRight">
          <input placeholder="Search Message" />
        </div>
      </div>
      <ScrollToBottom className="privateMessage__box">
        {messages &&
          messages.map((message, index) => {
            return (
              <Message
                key={index}
                username={message.sentBy.username}
                messageValue={message.message}
              />
            );
          })}
      </ScrollToBottom>
      <div className="privateMessage__sendMessage">
        <input
          onKeyPress={(e) => {
            if (e.code == "Enter") {
              handleSendMessage();
            }
          }}
          value={messageInput}
          onChange={(e) => {
            setMessageInput(e.target.value);
          }}
          placeholder="Send Message"
        />
      </div>
    </div>
  );
};
