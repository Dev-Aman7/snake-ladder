import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useState,
  memo,
} from "react";
import "./Square.css";

const Square = forwardRef(({ value, playerTokens, currSnakeOrLadder }, ref) => {
  console.count("req-sq");

  const [tokens, setTokens] = useState(playerTokens || []);

  useEffect(() => {
    setTokens(playerTokens || []);
  }, [playerTokens]);

  useImperativeHandle(ref, () => ({
    updateSquare(newPlayerTokens) {
      setTokens((prev) => [...prev, newPlayerTokens] || []);
    },
    removePlayer(playerToken) {
      const filtered = [...tokens].filter((token) => token !== playerToken);
      setTokens(filtered);
    },
  }));

  return (
    <div>
      <div className="square square-content">
        {currSnakeOrLadder && (
          <div>
            {currSnakeOrLadder.type}-{currSnakeOrLadder.end}
          </div>
        )}
        <div className="value">{value}</div>
        {tokens.map((token, index) => (
          <div key={index} className={`player-token ${token}`}>
            {token}
          </div>
        ))}
      </div>
    </div>
  );
});

export default memo(Square);
