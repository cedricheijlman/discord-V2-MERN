import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

export const GroupItem = ({
  selected,
  name,
  setSelectedGroup,
  setServerModal,
}) => {
  const navigate = useNavigate();
  const add = true;

  // check if is home button or server
  const handleClick = (nameButton) => {
    if (name !== "add") {
      setSelectedGroup(name);
    }

    if (name == "add") {
      setServerModal(true);
    }

    if (nameButton == "home") {
      navigate("/me/friends");
    } else if (name !== "add") {
      navigate(`/servers/${nameButton}`);
    }
  };

  return (
    <div
      style={{ borderLeft: selected == name ? "4px solid white" : "" }}
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
      </div>
    </div>
  );
};
