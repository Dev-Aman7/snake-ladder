// src/components/Board.js
import React, {
  useEffect,
  useCallback,
  useState,
  useRef,
  useMemo,
} from "react";
import Square from "./Square";
import Dice from "./Dice";
import "./Board.css";

const snakesAndLadders = {
  14: { type: "S", start: 14, end: 7 },
  25: { type: "L", start: 25, end: 40 },
  35: { type: "L", start: 35, end: 92 },
  13: { type: "S", start: 13, end: 3 },
  99: { type: "S", start: 99, end: 2 },
  // Add more snakes and ladders as needed
};

const Board = ({ numPlayers, resetGame }) => {
  console.log("board-rendered");
  const [playerPositions, setPlayerPositions] = useState(
    Array(numPlayers).fill(1)
  );
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [diceValue, setDiceValue] = useState(1);
  const squareRefs = useRef(
    Array.from({ length: 100 }).map(() => React.createRef())
  );

  useEffect(() => {
    // Handle logic when numPlayers changes
    // This may include resetting player positions or other game state
  }, [numPlayers]);

  const generateSnakesAndLadders = (
    currentPosition,
    previousPlayerPosition
  ) => {
    if (currentPosition > 100) {
      return previousPlayerPosition;
    }
    let updatedPosition = currentPosition;

    const snakeOrLadder = snakesAndLadders[currentPosition];

    if (snakeOrLadder) {
      // Check the type and update the position accordingly
      if (snakeOrLadder.type === "S") {
        updatedPosition = snakeOrLadder.end;
      } else if (snakeOrLadder.type === "L") {
        updatedPosition = snakeOrLadder.end;
      }
    }

    return updatedPosition;
  };

  const handleRollDice = () => {
    const newDiceValue = Math.floor(Math.random() * 6) + 1;
    setDiceValue(newDiceValue);

    // Update the current player's position based on the dice roll
    const updatedPlayerPositions = [...playerPositions];
    const previousPlayerPosition = updatedPlayerPositions[currentPlayer - 1];
    updatedPlayerPositions[currentPlayer - 1] += newDiceValue;

    // Check for snakes and ladders
    updatedPlayerPositions[currentPlayer - 1] = generateSnakesAndLadders(
      updatedPlayerPositions[currentPlayer - 1],
      previousPlayerPosition
    );
    const currentPlayerPosition = updatedPlayerPositions[currentPlayer - 1];

    // Remove the player token from the previous position
    if (previousPlayerPosition !== updatedPlayerPositions[currentPlayer - 1]) {
      const previousCell = squareRefs.current[previousPlayerPosition - 1];
      previousCell.current.removePlayer(`P${currentPlayer}`);
      // Update the Square component using ref for the current player's position

      squareRefs.current[currentPlayerPosition - 1].current.updateSquare(
        `P${currentPlayer}`
      );
    }

    // Switch to the next player
    if (currentPlayerPosition === 100) {
      alert(`Player ${currentPlayer} wins`);
      resetGame();
    }
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

  const renderTable = useMemo(() => {
    const rows = Array.from({ length: 10 }).map((_, rowIndex) => (
      <tr key={rowIndex}>
        {Array.from({ length: 10 }).map((_, colIndex) => {
          const isEvenRow = rowIndex % 2 === 0;
          const index = isEvenRow
            ? rowIndex * 10 + colIndex
            : (rowIndex + 1) * 10 - colIndex - 1;
          const cellNumber = index + 1; // Calculate cell number
          return (
            <td key={`${rowIndex}-${colIndex}`}>
              <Square
                ref={squareRefs.current[index]}
                value={cellNumber}
                currSnakeOrLadder={snakesAndLadders[cellNumber]}
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
  }, []);

  return (
    <div>
      {" "}
      {renderLegendBox()}
      <Dice diceValue={diceValue} onRoll={handleRollDice} />
      {renderTable}
    </div>
  );
};

export default Board;
