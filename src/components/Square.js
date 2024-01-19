// src/components/Square.js
import React from "react";

const Square = React.memo(({ value, playerTokens }) => {
  console.count("square-re-rendere");
  return (
    <div className="square">
      <div className="square-content">
        <div>{value}</div>
        {playerTokens &&
          playerTokens.map((token, index) => (
            <div key={index} className={`player-token p${index + 1}`}>
              {token}
            </div>
          ))}
      </div>
    </div>
  );
});

export default Square;
