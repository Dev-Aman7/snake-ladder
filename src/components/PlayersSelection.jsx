// src/components/PlayerSelection.js
import React, { useState } from "react";

const PlayerSelection = ({ onStartGame }) => {
  const [numPlayers, setNumPlayers] = useState(2);

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumPlayers(value);
  };

  const handleStartGame = () => {
    onStartGame(numPlayers);
  };

  return (
    <div>
      <h2>Snake and Ladder Game</h2>
      <label>Select Number of Players:</label>
      <input
        type="number"
        min="2"
        max="4"
        value={numPlayers}
        onChange={handleInputChange}
      />
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  );
};

export default PlayerSelection;
