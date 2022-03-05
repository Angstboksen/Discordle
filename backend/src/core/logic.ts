import axios from "axios";
import { Game, GameType, MongoTables } from "../../types";
import { fetchRandomMongo } from "./database/database";

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

export const checkVictory = (game: Game) => {
  for (const row of game.board) {
    if (row === game.solution) {
      return true;
    }
  }
  return false;
};

export const validGuess = async (guess: string) => {
  if (guess.length > 5) {
    return false;
  }
  try {
    await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`
    );
    return true
  } catch (error) {
    return false;
  }
};
