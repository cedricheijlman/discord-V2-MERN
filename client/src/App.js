import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

import { FriendsList } from "./components/dashboard/friendslist/FriendsList";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { Switch } from "@mui/material";
import { PrivateMessage } from "./components/dashboard/privatemessage/PrivateMessage";
import { Server } from "./components/dashboard/servers/Server";
import Axios from "axios";

function App() {
  // Create Server Handle
  const handleCreateServer = () => {
    Axios.post("http://localhost:3001/createServer", {
      accessKey: localStorage.getItem("accessKey"),
      serverName: serverNameInput,
    }).then((res) => {
      console.log(res);
    });
  };

  // Create Server Modal Styles
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
  const [serverNameInput, setServerNameInput] = React.useState("");
  const [toggled, setToggled] = React.useState(false);
  const [serverPasswordInput, setServerPasswordInput] = React.useState("");
  Modal.setAppElement("#root");
  return (
    <div className="App">
      <Modal
        style={customStylesModal}
        onRequestClose={() => {
          setServerNameInput("");
          setServerPasswordInput("");
          setServerModal(false);
        }}
        isOpen={serverModal}
      >
        <h2>Create a server</h2>
        <p>A server is a place where you and your friends can meet.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreateServer();
          }}
          className="createServerForm"
        >
          <CloseIcon
            onClick={() => {
              setServerNameInput("");
              setServerPasswordInput("");
              setServerModal(false);
            }}
            className="closeIcon"
          />
          <div className="form">
            <h5>Server Name</h5>
            <input
              value={serverNameInput}
              onChange={(e) => {
                setServerNameInput(e.target.value);
              }}
              placeholder="Server Name"
            />
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
                value={serverPasswordInput}
                onChange={(e) => {
                  setServerPasswordInput(e.target.value);
                }}
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
          <Route path="me/:id" element={<PrivateMessage />} />
          <Route path="servers/:id" element={<Server />} />
        </Route>

        <Route path="*" element={<Navigate replace to="/register" />} />
      </Routes>
    </div>
  );
}

export default App;
