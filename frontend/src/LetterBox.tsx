import React from "react";
import { LetterObject } from "./types";

interface LetterBoxProps {
  letter: LetterObject;
}

const LetterBox: React.FC<LetterBoxProps> = ({ letter }) => {
  return (
    <div className="letterbox" style={{ background: `${letter.color}` }}>
      <div className="letterbox-body">
        <span className="letterbox-letter">{letter.body}</span>
      </div>
    </div>
  );
};

export default LetterBox;
