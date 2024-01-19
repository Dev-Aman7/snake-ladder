// src/components/Board.js
import React, { useEffect, useCallback, useState } from "react";
import Square from "./Square";
import Dice from "./Dice";
import "./Board.css";

const snakesAndLadders = {
  14: { type: "S", start: 14, end: 7 },
  25: { type: "L", start: 25, end: 40 },
  // Add more snakes and ladders as needed
};

const Board = ({ numPlayers }) => {
  console.log("board-rendered");
  const [playerPositions, setPlayerPositions] = useState(
    Array(numPlayers).fill(1)
  );
  const [currentPlayer, setCurrentPlayer] = useState(1); // Track the current player
  const [diceValue, setDiceValue] = useState(1);

  const generateSnakesAndLadders = (currentPosition) => {
    let updatedPosition = currentPosition;

    const snakeOrLadder = snakesAndLadders[currentPosition];

    if (snakeOrLadder) {
      // Check the type and update the position accordingly
      if (snakeOrLadder.type === "S") {
        updatedPosition -= snakeOrLadder.end;
      } else if (snakeOrLadder.type === "L") {
        updatedPosition += snakeOrLadder.end;
      }
    }

    return updatedPosition;
  };

  const handleRollDice = () => {
    const newDiceValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newDiceValue);

    // Update the current player's position based on the dice roll
    const updatedPlayerPositions = [...playerPositions];
    updatedPlayerPositions[currentPlayer - 1] += newDiceValue;

    // Check for snakes and ladders
    updatedPlayerPositions[currentPlayer - 1] = generateSnakesAndLadders(
      updatedPlayerPositions[currentPlayer - 1]
    );

    // Switch to the next player
    setCurrentPlayer((prevPlayer) => (prevPlayer % numPlayers) + 1);

    setPlayerPositions(updatedPlayerPositions);
  };

  const renderLegendBox = () => {
    return (
      <div className="legend-box">
        <p>Legend:</p>
        <p>S: Snake</p>
        <p>L: Ladder</p>
      </div>
    );
  };

  const renderTable = useCallback(() => {
    const rows = Array.from({ length: 10 }).map((_, rowIndex) => (
      <tr key={rowIndex}>
        {Array.from({ length: 10 }).map((_, colIndex) => {
          const isEvenRow = rowIndex % 2 === 0;
          const index = isEvenRow
            ? rowIndex * 10 + colIndex
            : (rowIndex + 1) * 10 - colIndex - 1;
          const cellNumber = index + 1; // Calculate cell number
          const snakeOrLadder = snakesAndLadders[cellNumber];
          const playerTokens = playerPositions.map((position, playerIndex) =>
            position === cellNumber ? `P${playerIndex + 1}` : null
          );

          return (
            <td key={index}>
              <Square
                value={
                  snakeOrLadder
                    ? `${cellNumber} (${snakeOrLadder.type}${snakeOrLadder.end})`
                    : cellNumber
                }
                playerTokens={playerTokens}
              />
            </td>
          );
        })}
      </tr>
    ));

    return (
      <div>
        <table className="board">
          <tbody>{rows.reverse()}</tbody>
        </table>
      </div>
    );
  }, [playerPositions]);

  return (
    <div>
      {" "}
      {renderLegendBox()}
      <Dice diceValue={diceValue} onRoll={handleRollDice} />
      {renderTable()}
    </div>
  );
};

export default Board;
