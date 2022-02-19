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
import Keyboard from "./Keyboard";
import LetterRow from "./LetterRow";
import {
  Guild,
  LetterBoxColor,
  LetterObject,
  Player,
  WordleDifficulty,
} from "./types";
import {
  calculateLetterObjectColor,
  createDefaultBoard,
  useEventListener,
} from "./utils";

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
  const [usedLetters, setUsedLetters] = useState<string[]>([]);
  const [usedLetterObjects, setUsedLetterObjects] = useState<
    Map<string, LetterObject>
  >(new Map());
  const [isWon, setIsWon] = useState<boolean>(false);
  const [solution, setSolution] = useState<string>("GREAT");

  const reset = () => {
    setBoard(initialBoard);
    setInput("");
    setRound(0);
    setUsedLetters([]);
    setUsedLetterObjects(new Map());
    setIsWon(false);
  };

  const validateKey = (key: string) => {
    return key.length === 1 && key.match(/[a-z]/i);
  };

  const createBoardRow = (newInput: string) => {
    const letters: LetterObject[] = [];
    for (let i = 0; i < 5; i++) {
      letters.push({
        body: newInput[i] !== undefined ? newInput[i] : "",
        color: LetterBoxColor.DEFAULT,
        priority: 0,
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
    return input.length === 5;
  };

  const storeLetters = (word: string) => {
    const temp = [...usedLetters];
    for (let letter of word) {
      if (!temp.includes(letter)) {
        temp.push(letter);
      }
    }
    setUsedLetters(temp);
  };

  const updateUsedLetterObjects = (letterObjects: LetterObject[]) => {
    const temp = new Map(usedLetterObjects);
    for (let letterObject of letterObjects) {
      const used = temp.get(letterObject.body);
      if (used === undefined || letterObject.priority > used.priority) {
        temp.set(letterObject.body, letterObject);
      }
    }

    setUsedLetterObjects(temp);
  };

  const compareWithSolution = () => {
    const letters = [];
    let corrects = 0;
    for (let i = 0; i < solution.length; i++) {
      const letterObject = calculateLetterObjectColor(
        input[i],
        solution,
        input
      );
      if (letterObject.color === LetterBoxColor.CORRECT) corrects++;

      letters.push(letterObject);
    }
    updateUsedLetterObjects(letters);
    if (corrects === 5) {
      setIsWon(true);
    }
    storeLetters(input);
    return letters;
  };

  const keyHandler = (event: Event) => {
    const { key } = event as KeyboardEvent;
    if (!isWon) {
      if (key === "Enter") {
        const validWord = validateWord();
        if (validWord) {
          const letterObjects = compareWithSolution();
          overrideBoard(letterObjects, round);
          setRound(round + 1);
          setInput("");
        } else {
          // Display error, as word is not allowed
        }
      } else if (key === "Backspace") {
        const sliced = input.slice(0, -1);
        setInput(sliced);
        updateBoard(sliced);
      } else if (validateKey(key.toUpperCase())) {
        if (input.length < 5) {
          const letter = key.toUpperCase();
          setInput(input + letter);
          updateBoard(input + letter);
        }
      }
    }
  };

  useEventListener("keyup", keyHandler);

  return (
    <div className="wordle">
      <div className="wordle-grid">
        {board.map((letters: LetterObject[], key: number) => (
          <LetterRow key={key} letters={letters} />
        ))}
      </div>
      <Keyboard usedLetterObjects={usedLetterObjects} />
    </div>
  );
};

export default Wordle;
