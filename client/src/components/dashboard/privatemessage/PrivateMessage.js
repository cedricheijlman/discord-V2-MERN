import React, { useEffect } from "react";
import { Message } from "./Message";
import "./privatemessage.css";
import ScrollToBottom from "react-scroll-to-bottom";

export const PrivateMessage = () => {
  const [messageInput, setMessageInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const handleSendMessage = () => {
    console.log(messageInput);

    if (messageInput !== "" && messageInput !== null) {
      setMessages([...messages, { message: messageInput }]);
    }
  };

  useEffect(() => {}, []);
  return (
    <div id="privateMessage">
      <div id="privateMessage__header">
        <div className="privateMessage__headerLeft">Username</div>
        <div className="privateMessage__headerRight">
          <input placeholder="Search Message" />
        </div>
      </div>
      <ScrollToBottom className="privateMessage__box">
        {messages.map((message) => {
          return <Message messageValue={message.message} />;
        })}
      </ScrollToBottom>
      <div className="privateMessage__sendMessage">
        <input
          onKeyPress={(e) => {
            if (e.code == "Enter") {
              handleSendMessage();
            }
          }}
          onChange={(e) => {
            console.log(e.target.value);
            setMessageInput(e.target.value);
          }}
          placeholder="Send Message"
        />
      </div>
    </div>
  );
};
