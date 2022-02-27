import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import io from "socket.io-client";
import { FriendsList } from "./components/dashboard/friendslist/FriendsList";
import Modal from "react-modal";

import { Switch } from "@mui/material";

const socket = io.connect("http://localhost:3001");

function App() {
  const customStylesModal = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "350px",
      height: "400px",
      transform: "translate(-50%, -50%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.67)",
    },
  };
  const [serverModal, setServerModal] = React.useState(false);
  const [toggled, setToggled] = React.useState(false);
  return (
    <div className="App">
      <Modal
        style={customStylesModal}
        onRequestClose={() => setServerModal(false)}
        isOpen={serverModal}
      >
        <h2>Create a server</h2>
        <p>A server is a place where you and your friends can meet.</p>
        <form style={{ width: "100%" }}>
          <div
            style={{
              width: "100%",

              display: "flex",
              flexDirection: "column",
              margin: "10px 0",
            }}
          >
            <p>Server Name</p>
            <input />
            <div>
              <p>Private Server</p>
              <Switch
                checked={toggled}
                onChange={(e) => setToggled(e.target.checked)}
              />
            </div>
          </div>
        </form>
      </Modal>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Dashboard setServerModal={setServerModal} />}>
          <Route path="me/friends" element={<FriendsList />} />
          <Route path="me/messages" element={<h1>Messages</h1>} />
          <Route path="servers/:id" element={<h1>Server</h1>} />
        </Route>

        <Route path="*" element={<Navigate replace to="/register" />} />
      </Routes>
    </div>
  );
}

export default App;
