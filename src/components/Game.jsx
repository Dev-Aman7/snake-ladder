// src/components/Game.js
import React, { useState } from "react";
import PlayerSelection from "./PlayersSelection";
import Board from "./Board";

const Game = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [numPlayers, setNumPlayers] = useState(2);

  const handleStartGame = (players) => {
    setNumPlayers(players);
    setGameStarted(true);
  };

  const resetGame = () => {
    setGameStarted(false);
    setNumPlayers(2);
  };

  return (
    <div className="Game">
      {!gameStarted ? (
        <PlayerSelection onStartGame={handleStartGame} />
      ) : (
        <div>
          <Board numPlayers={numPlayers} resetGame={resetGame} />
        </div>
      )}
    </div>
  );
};

export default Game;
