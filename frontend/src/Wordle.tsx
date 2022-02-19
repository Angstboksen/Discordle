import React, {
  ChangeEvent,
  ChangeEventHandler,
  createRef,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import LetterRow from "./LetterRow";
import {
  Guild,
  LetterBoxColor,
  LetterObject,
  Player,
  WordleDifficulty,
} from "./types";
import { createDefaultBoard, useEventListener } from "./utils";

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
  const [input, setInput] = useState<string>("");
  const [round, setRound] = useState<number>(0);

  const validateKey = (key: string) => {
    return key.length === 1 && key.match(/[a-z]/i);
  };

  const createBoardRow = (newInput: string) => {
    const letters: LetterObject[] = [];
    for (let i = 0; i < 5; i++) {
      letters.push({
        body: newInput[i] !== undefined ? newInput[i] : "",
        color: LetterBoxColor.DEFAULT,
      });
    }
    return letters;
  };

  const updateBoard = (newInput: string) => {
    overrideBoard(createBoardRow(newInput), round);
  };

  const overrideBoard = (letters: LetterObject[], row: number) => {
    let newBoard = [...board];
    newBoard[row] = letters;
    setBoard(newBoard);
  };

  const validateWord = () => {
    return true;
  };

  const compareWithSolution = () => {
    const solution = "great";
    const letters = [];
    for (let i = 0; i < solution.length; i++) {
      let color = LetterBoxColor.WRONG;
      if (input[i] === solution[i]) {
        color = LetterBoxColor.CORRECT;
      } else if (solution.includes(input[i])) {
        color = LetterBoxColor.INCORRECT_POSITION;
      }
      letters.push({ body: input[i], color });
    }
    return letters;
  };

  const keyHandler = (event: Event) => {
    const { key } = event as KeyboardEvent;
    if (key === "Enter") {
      const validWord = validateWord();
      if (validWord) {
        const letterObjects = compareWithSolution();
        overrideBoard(letterObjects, round)
        setRound(round + 1)
        setInput("")
      } else {
        // Display error, as word is not allowed
      }
    } else if (key === "Backspace") {
      const sliced = input.slice(0, -1);
      setInput(sliced);
      updateBoard(sliced);
    } else if (validateKey(key.toLowerCase())) {
      if (input.length < 5) {
        const letter = key.toLowerCase();
        setInput(input + letter);
        updateBoard(input + letter);
      }
    }
  };

  useEventListener("keyup", keyHandler);

  return (
    <div className="wordle">
      {board.map((letters: LetterObject[], key: number) => (
        <LetterRow key={key} letters={letters} />
      ))}
    </div>
  );
};

export default Wordle;
