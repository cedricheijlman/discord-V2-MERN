import React, { useEffect } from "react";
import { Message } from "./Message";
import "./privatemessage.css";
import ScrollToBottom from "react-scroll-to-bottom";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

export const PrivateMessage = () => {
  // Get Socket Instance from dashboard
  const { socket } = useOutletContext();

  // Message Input, Messages, Friend Info Account
  const [messageInput, setMessageInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const [friendInfo, setFriendInfo] = React.useState({});

  // Handle When Message Is sent
  const handleSendMessage = async () => {
    console.log(messageInput);

    if (messageInput !== "" && messageInput !== null) {
      await setMessages([...messages, { message: messageInput }]);
      await socket.emit(
        "send_message",
        friendInfo.privateMessageId,
        messageInput
      );
      setMessageInput("");
    }
  };

  useEffect(async () => {
    await socket.on("message_recieved", (messageInput) => {
      console.log(messageInput);
      setMessages([...messages, { message: messageInput }]);
    });
  }, [socket]);

  // get id from url
  let { id } = useParams();

  // Post Request Private Message
  useEffect(() => {
    Axios.post("http://localhost:3001/privateMessage", {
      accessKey: localStorage.getItem("accessKey"),
      friend: id,
    }).then((res) => {
      setFriendInfo(res.data);
      setMessages(res.data.messages);
      socket.emit("join_privateMessage", res.data.privateMessageId);
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
        {messages.map((message, index) => {
          return <Message key={index} messageValue={message.message} />;
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
