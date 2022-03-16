import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import "./dashboard.css";
import HomeIcon from "@mui/icons-material/Home";
import { GroupItem } from "./GroupItem";
import io from "socket.io-client";
import ServerInfo from "./servers/ServerInfo";
import LogoutIcon from "@mui/icons-material/Logout";
import RingLoader from "react-spinners/RingLoader";

const socket = io.connect("http://localhost:3001");

function Dashboard({ setServerModal }) {
  let navigate = useNavigate();
  const [beginLoading, setBeginLoading] = useState(false);

  useEffect(() => {
    setBeginLoading(true);
    setTimeout(() => {
      setBeginLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (window.location.pathname == "" || window.location.pathname == "/") {
      navigate("/me/friends");
    }
  }, []);

  const [selectedGroup, setSelectedGroup] = useState("home");
  const [username, setUsername] = useState("");
  const [allServers, setAllServers] = useState([]);
  const [joinServerMsg, setJoinServerMsg] = useState("");

  const [serverInfo, setServerInfo] = useState({});

  // to check if it equals the home page  /me/
  const pathName = window.location.pathname.slice(1, 3);

  const handleLogout = () => {
    localStorage.removeItem("accessKey");
    navigate("/login");
  };
  // validate User
  useEffect(() => {
    Axios.post(`${process.env.REACT_APP_HOST}validateUser`, {
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
    Axios.post(`${process.env.REACT_APP_HOST}getUserJoinedServers`, {
      accessKey: localStorage.getItem("accessKey"),
    }).then((res) => {
      setAllServers(res.data.allServers);
    });
  }, []);

  const [joinServerInput, setJoinServerInput] = useState("");
  // Handle Join Server
  const handleJoinServer = () => {
    if (joinServerInput !== "" && joinServerInput !== null) {
      Axios.post(`${process.env.REACT_APP_HOST}joinServer`, {
        accessKey: localStorage.getItem("accessKey"),
        serverId: joinServerInput,
      })
        .then((res) => {
          if (res.data.message == "Server already joined") {
            setJoinServerMsg("Already Joined Server!");
            setJoinServerInput("");
            setTimeout(() => {
              setJoinServerMsg("");
            }, 2000);
          }

          if (res.data.message == "Server doesn't exist") {
            setJoinServerMsg("Server doesn't exist!");
            setJoinServerInput("");
            setTimeout(() => {
              setJoinServerMsg("");
            }, 2000);
          }
        })
        .catch((err) => {
          setJoinServerMsg("That's not a server ID!");
          setJoinServerInput("");
          setTimeout(() => {
            setJoinServerMsg("");
          }, 2000);
        });
    }
  };

  return (
    <>
      {beginLoading && (
        <div className="loadingScreen">
          <RingLoader color={"lightgrey"} loading={beginLoading} size={100} />
        </div>
      )}
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
            <div
              onClick={() => {
                handleLogout();
              }}
              className="dashboard__homeButtonSelect"
            >
              <div
                title="Logout"
                style={{ backgroundColor: "darkred", color: "white" }}
                className="dashboard__homeButton"
              >
                <LogoutIcon />
              </div>
            </div>
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
              {joinServerMsg !== "" && (
                <h3
                  style={{
                    margin: "10px 10px",
                    color: "white",
                    fontStyle: "italic",
                    textAlign: "center",
                  }}
                >
                  {joinServerMsg}
                </h3>
              )}
            </>
          )}

          {pathName !== "me" && (
            <>
              <ServerInfo
                serverInfo={serverInfo}
                setServerInfo={setServerInfo}
              />
            </>
          )}
        </div>
        <div className="rightDashboard">
          <Outlet
            context={{
              socket,
              username,
              serverInfo,
              setServerInfo,
              setSelectedGroup,
            }}
          />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
