import React from "react";
import LetterBox from "./LetterBox";
import { LetterBoxSize, LetterObject } from "./types";

interface LetterRowProps {
  letters: Array<LetterObject>;
}

const LetterRow: React.FC<LetterRowProps> = ({ letters }) => {
  return (
    <div className="letterrow">
      {letters.map((letter: LetterObject, key: number) => (
        <LetterBox key={key} letter={letter} size={LetterBoxSize.GAME} />
      ))}
    </div>
  );
};

export default LetterRow;
