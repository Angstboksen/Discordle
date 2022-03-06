import axios from "axios";
import {
  Game,
  GameType,
  LetterBoxColor,
  LetterObject,
  MongoTables,
} from "../../types";
import { fetchRandomMongo, fetchWord } from "../core/database/database";

export const createNewGame = async (user: string, type: GameType) => {
  const solution = (await fetchRandomMongo(MongoTables.WORDS)).word;
  const game: Game = {
    user: user,
    type: type,
    solution: solution,
    board: [],
    isFinished: false,
    date: new Date(),
  };
  return game;
};

export const checkVictory = (game: any) => {
  for (const row of game.board) {
    if (row.toLowerCase() === game.solution) {
      return true;
    }
  }
  return false;
};

export const checkLoss = (game: any) => {
  return game.board.length >= 6
}

export const validGuess = async (guess: string) => {
  if (guess.length > 5) {
    return false;
  }
  return await fetchWord(guess) !== undefined
}

export const createBoardRow = (newInput: string) => {
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

export const compareWithSolution = (solution: string, input: string) => {
  const letters = [];
  let corrects = 0;
  for (let i = 0; i < solution.length; i++) {
    const letterObject = calculateLetterObjectColor(i, solution.toLowerCase(), input.toLowerCase());
    if (letterObject.color === LetterBoxColor.CORRECT) corrects++;

    letters.push(letterObject);
  }
  return letters;
};

export const calculateLetterObjectColor = (
  index: number,
  solution: string,
  input: string
) => {
  let color = LetterBoxColor.WRONG;
  let priority = 2;
  const letter = input[index];
  if (letter === solution[index]) {
    color = LetterBoxColor.CORRECT;
    priority = 3;
  } else if (solution.includes(letter)) {
    color = LetterBoxColor.INCORRECT_POSITION;
    priority = 1;
  }
  return { body: letter.toUpperCase(), color, priority };
};
