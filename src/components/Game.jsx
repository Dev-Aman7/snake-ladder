// src/components/Game.js
import React, { useState } from "react";
import PlayerSelection from "./PlayersSelection";
import Board from "./Board";
import Dice from "./Dice";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [numPlayers, setNumPlayers] = useState(2);

  const handleStartGame = (players) => {
    setNumPlayers(players);
    setGameStarted(true);
  };

  return (
    <div className="Game">
      {!gameStarted ? (
        <PlayerSelection onStartGame={handleStartGame} />
      ) : (
        <div>
          <Board numPlayers={numPlayers} />
        </div>
      )}
    </div>
  );
};

export default Game;
