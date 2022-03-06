import React, { useState } from "react";
import Keyboard from "../game/Keyboard";
import LetterRow from "../game/LetterRow";
import {
  Guild,
  LetterBoxColor,
  LetterObject,
  Player,
  WordleDifficulty,
} from "../types";
import {
  calculateLetterObjectColor,
  createDefaultBoard,
  randomSolution,
  useEventListener,
  words,
} from "../utils";
import VictoryScreen from "../conditionals/VictoryScreen";
import IllegalWord from "../conditionals/IllegalWord";
import LossScreen from "../conditionals/LossScreen";
import ResetButton from "../conditionals/ResetButton";
import { finishGame, startNewGame, updateGame } from "../api/api";

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
  const [isLoss, setIsLoss] = useState<boolean>(false);
  const [isIllegalWord, setIsIllegalWord] = useState<boolean>(false);
  const [solution, setSolution] = useState<string>(randomSolution());

  const reset = async () => {
    setBoard(initialBoard);
    setInput("");
    setRound(0);
    setUsedLetters([]);
    setUsedLetterObjects(new Map());
    setIsWon(false);
    setIsLoss(false);
    setSolution(randomSolution());
    await finishGame(player.id)
    await startNewGame(player.id)
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

  const keyHandler = async (event: Event) => {
    const { key } = event as KeyboardEvent;
    if (!isWon && !isLoss) {
      if (key === "Enter") {
        const validWord = await updateGame(player.id, input);
        if (validWord !== undefined) { 
          overrideBoard(validWord.board, round);
          updateUsedLetterObjects(validWord.board)
          storeLetters(input);
          if(validWord.gameStatus !== "active") {
            finishGame(player.id)
            setIsWon(validWord.gameStatus === "won")
            setIsLoss(validWord.gameStatus === "loss")
          }
          setRound(round + 1);
          setInput("");
        } else {
          setIsIllegalWord(true);
          setTimeout(() => {
            setIsIllegalWord(false);

          }, 1000);
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
      {isWon && <VictoryScreen />}
      {isLoss && <LossScreen word={solution} />}
      {isIllegalWord && <IllegalWord word={input} />}
      <ResetButton onClick={reset} />
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
