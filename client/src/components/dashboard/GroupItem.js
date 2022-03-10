import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export const GroupItem = ({
  selected,
  name,
  setSelectedGroup,
  setServerModal,
  serverId,
  serverName,
}) => {
  const navigate = useNavigate();
  const add = true;

  // check if is home button or server
  const handleClick = (nameButton) => {
    if (name !== "add" && name !== "home") {
      setSelectedGroup(serverId);
    }

    if (name == "home") {
      setSelectedGroup(name);
    }

    if (name == "add") {
      setServerModal(true);
    }

    if (nameButton == "home") {
      navigate("/me/friends");
    } else if (name !== "add") {
      navigate(`/servers/${serverId}`);
    }
  };

  return (
    <div
      style={{
        borderLeft:
          selected == serverId || selected == name ? "4px solid white" : "",
      }}
      className="dashboard__homeButtonSelect"
    >
      <div
        onClick={() => {
          handleClick(name);
        }}
        className="dashboard__homeButton"
      >
        {name == "add" && <AddIcon />}
        {name == "home" && <HomeIcon />}
        {name !== "add" &&
          name !== "home" &&
          `${serverName[0] + serverName[1]}`}
      </div>
    </div>
  );
};
