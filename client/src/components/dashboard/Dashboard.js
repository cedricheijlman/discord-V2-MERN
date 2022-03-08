import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css";
import HomeIcon from "@mui/icons-material/Home";
import { GroupItem } from "./GroupItem";
import io from "socket.io-client";
import ServerInfo from "./servers/ServerInfo";
const socket = io.connect("http://localhost:3001");

function Dashboard({ setServerModal }) {
  const [selectedGroup, setSelectedGroup] = useState("home");
  const [username, setUsername] = useState("");

  // to check if it equals the home page  /me/
  const pathName = window.location.pathname.slice(1, 3);
  let navigate = useNavigate();

  useEffect(() => {
    Axios.post("http://localhost:3001/validateUser", {
      accessTokenKey: localStorage.getItem("accessKey"),
    })
      .then(async (result) => {
        if (!result.status == 200) {
          window.location.pathname = "/login";
        } else {
          setUsername(result.data.payload.username);
          await socket.emit(
            "loggedIn",
            result.data.payload.username,
            result.data.payload.id
          );
        }
      })
      .catch(() => {
        window.location.pathname = "/login";
      });
  }, []);

  const items = [{ name: "home0" }, { name: "home1" }, { name: "home2" }];

  return (
    <div id="dashboard">
      <div className="groupsLeftDashboard">
        <GroupItem
          selected={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          name="home"
        />
        <div className="joinedGroupsDashboard">
          {items.map((item, index) => {
            return (
              <GroupItem
                key={index}
                selected={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                name={item.name}
              />
            );
          })}
          <GroupItem
            selected={selectedGroup}
            setSelectedGroup={setSelectedGroup}
            name="add"
            setServerModal={setServerModal}
          />
        </div>
      </div>
      <div className="leftDashboard">
        {pathName == "me" && (
          <>
            <div
              onClick={() => {
                navigate("/me/friends");
              }}
              className="friendsItem"
            >
              Friends
            </div>
            <div className="friendsItem">Chat messages</div>
          </>
        )}

        {pathName !== "me" && (
          <>
            <ServerInfo />
          </>
        )}
      </div>
      <div className="rightDashboard">
        <Outlet context={{ socket, username }} />
      </div>
    </div>
  );
}

export default Dashboard;
