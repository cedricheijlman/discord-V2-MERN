import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./components/dashboard/Dashboard";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import io from "socket.io-client";
import { FriendsList } from "./components/dashboard/friendslist/FriendsList";

const socket = io.connect("http://localhost:3001");

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Dashboard />}>
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
