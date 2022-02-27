import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import io from "socket.io-client";
import { FriendsList } from "./components/dashboard/friendslist/FriendsList";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { Switch } from "@mui/material";

const socket = io.connect("http://localhost:3001");

function App() {
  const customStylesModal = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      width: "390px",
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
        <form className="createServerForm">
          <CloseIcon
            onClick={() => {
              setServerModal(false);
            }}
            className="closeIcon"
          />
          <div className="form">
            <input type="file" id="myFile" name="filename" />

            <h5>Server Name</h5>
            <input placeholder="Server Name" />
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h5>Private?</h5>
                <Switch
                  checked={toggled}
                  onChange={(e) => setToggled(e.target.checked)}
                />
              </div>
              <input
                type={"password"}
                placeholder={
                  toggled == true
                    ? "Enter Password"
                    : "Turn private on to have a password!"
                }
                disabled={toggled == true ? false : true}
              />
            </div>
            <button>Create Server</button>
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
