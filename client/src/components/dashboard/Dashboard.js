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
  const [allServers, setAllServers] = useState([]);

  const [serverInfo, setServerInfo] = useState({});

  // to check if it equals the home page  /me/
  const pathName = window.location.pathname.slice(1, 3);
  let navigate = useNavigate();

  // validate User
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

  // get users servers/groups
  useEffect(() => {
    Axios.post("http://localhost:3001/getUserJoinedServers", {
      accessKey: localStorage.getItem("accessKey"),
    }).then((res) => {
      setAllServers(res.data.allServers);
      console.log(res.data.allServers);
    });
  }, []);

  const [joinServerInput, setJoinServerInput] = useState("");
  // Handle Join Server
  const handleJoinServer = () => {
    if (joinServerInput !== "" && joinServerInput !== null) {
    }
  };

  return (
    <div id="dashboard">
      <div className="groupsLeftDashboard">
        <GroupItem
          selected={selectedGroup}
          setSelectedGroup={setSelectedGroup}
          name="home"
        />
        <div className="joinedGroupsDashboard">
          {allServers.map((item, index) => {
            return (
              <GroupItem
                key={index}
                serverId={item._id}
                selected={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                name={item.name}
                serverName={item.serverName}
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
          // If on homepage
          <>
            <div className="friendsItem">Join Server With Server ID</div>
            <input
              value={joinServerInput}
              onChange={(e) => {
                if (e.nativeEvent.data !== " ") {
                  setJoinServerInput(e.target.value);
                }
              }}
              className="serverAddInput"
              onKeyPress={(e) => {
                if (e.code == "Enter") {
                  handleJoinServer();
                }
              }}
              placeholder="Enter Server ID"
            />
          </>
        )}

        {pathName !== "me" && (
          <>
            <ServerInfo serverInfo={serverInfo} setServerInfo={setServerInfo} />
          </>
        )}
      </div>
      <div className="rightDashboard">
        <Outlet context={{ socket, username, serverInfo, setServerInfo }} />
      </div>
    </div>
  );
}

export default Dashboard;
