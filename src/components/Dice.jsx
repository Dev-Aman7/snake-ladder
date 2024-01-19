// src/components/Dice.js
import React from "react";

const Dice = ({ diceValue, onRoll }) => {
  const handleRollClick = () => {
    const newDiceValue = Math.floor(Math.random() * 6) + 1;
    onRoll(newDiceValue);
  };

  return (
    <div>
      <p>Dice Value: {diceValue}</p>
      <button onClick={handleRollClick}>Roll Dice</button>
    </div>
  );
};

export default Dice;
