import React, { useState } from "react";
import LetterRow from "./LetterRow";
import {
  Guild,
  LetterBoxColor,
  LetterObject,
  Player,
  WordleDifficulty,
} from "./types";
import { createDefaultBoard } from "./utils";

let letters = [
  { body: "H", color: LetterBoxColor.CORRECT },
  { body: "A", color: LetterBoxColor.INCORRECT_POSITION },
  { body: "U", color: LetterBoxColor.WRONG },
  { body: "K", color: LetterBoxColor.INCORRECT_POSITION },
  { body: "O", color: LetterBoxColor.CORRECT },
];

interface WordleProps {
  player: Player;
  difficulty: WordleDifficulty;
  discordGuild: Guild;
  initialBoard?: LetterObject[][];
}

const Wordle: React.FC<WordleProps> = ({
  player,
  difficulty,
  discordGuild,
  initialBoard = createDefaultBoard(difficulty),
}) => {
  const [board, setBoard] = useState<LetterObject[][]>(initialBoard);
  const [round, setRound] = useState<number>(0);
  // const [input, setInput] = useState<string>("");

  const updateBoard = () => {
    let newBoard: LetterObject[][] = Object.assign([], board);
    newBoard[round] = letters;
    setBoard(newBoard);
    setRound(round + 1);
    validateBoard();
  };

  const validateBoard = () => {
    return false;
  };

  return (
    <div className="wordle" onClick={updateBoard}>
      {board.map((letters: LetterObject[], key: number) => (
        <LetterRow key={key} letters={letters} />
      ))}
    </div>
  );
};

export default Wordle;
