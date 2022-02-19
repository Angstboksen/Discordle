import React from "react";
import { LetterBoxSize, LetterObject } from "../types";

interface LetterBoxProps {
  letter: LetterObject;
  size: LetterBoxSize;
}

const LetterBox: React.FC<LetterBoxProps> = ({ letter, size }) => {
  return (
    <div
      className={`letterbox ${
        size === LetterBoxSize.GAME ? "letterbox-normal" : "letterbox-small"
      }`}
      style={{ background: `${letter.color}` }}
    >
      <div className="letterbox-body">
        <span className="letterbox-letter">{letter.body}</span>
      </div>
    </div>
  );
};

export default LetterBox;
