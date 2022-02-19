import React from "react";
import { LetterBoxColor } from "../types";

interface LossScreenProps {
    word: string;
  }

const LossScreen: React.FC<LossScreenProps> = ({word}) => {
  return (
    <div className="message">
      <div className="flex column center">
        <span>The word was <span style={{ color: LetterBoxColor.CORRECT }}>{word}</span></span>
        <span>Unlucky! Better luck next time! 😐</span>
      </div>
    </div>
  );
};

export default LossScreen;