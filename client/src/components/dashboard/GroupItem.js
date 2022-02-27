import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export const GroupItem = ({ selected, name, setSelectedGroup }) => {
  const navigate = useNavigate();

  // check if is home button or server
  const handleClick = (nameButton) => {
    setSelectedGroup(name);
    if (nameButton == "home") {
      navigate("/me/friends");
    } else {
      navigate(`/servers/${nameButton}`);
    }
  };

  return (
    <div
      onClick={() => {
        handleClick(name);
      }}
      style={{ borderLeft: selected == name ? "4px solid white" : "" }}
      className="dashboard__homeButtonSelect"
    >
      <div className="dashboard__homeButton">
        <HomeIcon />
      </div>
    </div>
  );
};
