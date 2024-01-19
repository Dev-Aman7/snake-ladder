// src/components/Player.js
import React from "react";

const Player = ({ name, position }) => {
  return (
    <div className="player">
      <p>{name}</p>
      <p>Position: {position}</p>
    </div>
  );
};

export default Player;
