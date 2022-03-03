import React, { useEffect } from "react";
import { Message } from "./Message";
import "./privatemessage.css";
import ScrollToBottom from "react-scroll-to-bottom";

export const PrivateMessage = () => {
  const [messageInput, setMessageInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const handleSendMessage = async () => {
    console.log(messageInput);

    if (messageInput !== "" && messageInput !== null) {
      await setMessages([...messages, { message: messageInput }]);
      setMessageInput("");
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
